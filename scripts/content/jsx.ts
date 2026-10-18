/**
 * Reads hardcoded content out of the existing TSX/TS source with the TypeScript parser, producing
 * exactly the strings React renders today. Used once, by scripts/content/build-content.ts, to move
 * content into WordPress. Anything it cannot represent throws, so nothing is silently dropped.
 */
import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const ROOT = path.resolve(import.meta.dirname, '../..')

const ENTITIES: Record<string, string> = {
  amp: '&', apos: "'", quot: '"', lt: '<', gt: '>', nbsp: ' ',
  laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '—', ndash: '–', hellip: '…',
}

export function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
    const v = ENTITIES[e.toLowerCase()]
    if (v === undefined) throw new Error(`Unknown entity ${m}`)
    return v
  })
}

export const escapeHtml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** React/Babel JSX text whitespace rules (cleanJSXElementLiteralChild). */
function cleanJsxText(raw: string): string {
  const lines = raw.split(/\r\n|\n|\r/)
  let last = 0
  lines.forEach((l, i) => { if (/[^ \t]/.test(l)) last = i })
  let out = ''
  lines.forEach((line, i) => {
    let t = line.replace(/\t/g, ' ')
    if (i !== 0) t = t.replace(/^[ ]+/, '')
    if (i !== lines.length - 1) t = t.replace(/[ ]+$/, '')
    if (t) {
      if (i !== last) t += ' '
      out += t
    }
  })
  return decodeEntities(out)
}

const INLINE = new Set(['em', 'strong', 'b', 'i'])

type Scope = Record<string, unknown>

/** Evaluates a pure expression (literals, arrays, objects, templates, spreads of scope values). */
export function evalExpr(node: ts.Node, sf: ts.SourceFile, scope: Scope = {}): any {
  const text = node.getText(sf)
  const js = ts.transpileModule(`__v = (${text});`, { compilerOptions: { target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.Preserve } }).outputText
  const fn = new Function(...Object.keys(scope), `let __v; ${js}; return __v;`)
  return fn(...Object.values(scope))
}

export class Source {
  readonly sf: ts.SourceFile
  constructor(readonly file: string, readonly scope: Scope = {}) {
    const full = path.join(ROOT, file)
    this.sf = ts.createSourceFile(full, fs.readFileSync(full, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  }

  /** Value of a top-level `const name = …`. */
  const(name: string, scope: Scope = {}): any {
    for (const stmt of this.sf.statements) {
      if (!ts.isVariableStatement(stmt)) continue
      for (const d of stmt.declarationList.declarations) {
        if (ts.isIdentifier(d.name) && d.name.text === name && d.initializer) return evalExpr(d.initializer, this.sf, { ...this.scope, ...scope })
      }
    }
    throw new Error(`${this.file}: const ${name} not found`)
  }

  /** Top-level JSX <section> elements of the default-exported component, in document order. */
  sections(): Section[] {
    const out: Section[] = []
    const visit = (n: ts.Node) => {
      if ((ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) && tagName(n) === 'section') {
        out.push(new Section(this, n))
        return
      }
      ts.forEachChild(n, visit)
    }
    visit(this.defaultExport())
    return out
  }

  /** All elements in the default export (or the whole file) with the given tag, in order. */
  elements(tag: string, root: ts.Node = this.sf): Array<ts.JsxElement | ts.JsxSelfClosingElement> {
    const out: Array<ts.JsxElement | ts.JsxSelfClosingElement> = []
    const visit = (n: ts.Node) => {
      if ((ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) && tagName(n) === tag) out.push(n)
      ts.forEachChild(n, visit)
    }
    visit(root)
    return out
  }

  /** Cleaned JSX text that starts on the given (1-based) line. */
  textAt(lineNo: number): string {
    let found: string | null = null
    const visit = (n: ts.Node) => {
      if (found === null && ts.isJsxText(n) && n.text.trim() && line(this, n) <= lineNo && lineNo <= this.sf.getLineAndCharacterOfPosition(n.end).line + 1) {
        const t = cleanJsxText(n.text).trim()
        if (t) found = t
      }
      ts.forEachChild(n, visit)
    }
    visit(this.sf)
    if (found === null) throw new Error(`${this.file}:${lineNo} no JSX text`)
    return found
  }

  /** Arguments of `export const metadata = genMeta({...})`. */
  metadata(): Record<string, any> {
    for (const stmt of this.sf.statements) {
      if (!ts.isVariableStatement(stmt)) continue
      for (const d of stmt.declarationList.declarations) {
        if (ts.isIdentifier(d.name) && d.name.text === 'metadata' && d.initializer && ts.isCallExpression(d.initializer)) {
          return evalExpr(d.initializer.arguments[0], this.sf, this.scope)
        }
      }
    }
    throw new Error(`${this.file}: no metadata export`)
  }

  defaultExport(): ts.Node {
    for (const stmt of this.sf.statements) {
      if (ts.isFunctionDeclaration(stmt) && stmt.modifiers?.some((m) => m.kind === ts.SyntaxKind.DefaultKeyword)) return stmt
    }
    return this.sf
  }

  /** Inline HTML of an element's children. */
  html(el: ts.Node, resolve: Scope = {}): string {
    return childrenHtml(el, this, resolve).trim()
  }

  /** Plain text of an element's children (no markup allowed except <br>, rendered as "\n"). */
  text(el: ts.Node, resolve: Scope = {}): string {
    const html = this.html(el, resolve)
    if (/<(?!br>)/.test(html)) throw new Error(`${this.file}: expected plain text, got markup: ${html}`)
    return decodeEntities(html.replace(/<br>/g, '\n'))
  }

  attr(el: ts.Node, name: string, resolve: Scope = {}): any {
    const attrs = ts.isJsxElement(el) ? el.openingElement.attributes : (el as ts.JsxSelfClosingElement).attributes
    for (const a of attrs.properties) {
      if (!ts.isJsxAttribute(a) || a.name.getText(this.sf) !== name) continue
      if (!a.initializer) return true
      if (ts.isStringLiteral(a.initializer)) return a.initializer.text
      if (ts.isJsxExpression(a.initializer) && a.initializer.expression) return evalExpr(a.initializer.expression, this.sf, { ...this.scope, ...resolve })
    }
    return undefined
  }

  /** Array literals that are mapped over in JSX ({[...].map(...)}), evaluated, in order. */
  mappedArrays(root: ts.Node): any[] {
    const out: any[] = []
    const visit = (n: ts.Node) => {
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && n.expression.name.text === 'map' && ts.isArrayLiteralExpression(n.expression.expression)) {
        out.push(evalExpr(n.expression.expression, this.sf, this.scope))
      }
      ts.forEachChild(n, visit)
    }
    visit(root)
    return out
  }
}

function tagName(n: ts.JsxElement | ts.JsxSelfClosingElement): string {
  return (ts.isJsxElement(n) ? n.openingElement.tagName : n.tagName).getText()
}

function childrenHtml(el: ts.Node, src: Source, resolve: Scope): string {
  if (!ts.isJsxElement(el)) return ''
  let out = ''
  for (const child of el.children) {
    if (ts.isJsxText(child)) {
      out += escapeHtml(cleanJsxText(child.text))
    } else if (ts.isJsxExpression(child)) {
      if (!child.expression) continue
      const e = child.expression
      if (ts.isStringLiteral(e) || ts.isNoSubstitutionTemplateLiteral(e)) out += escapeHtml(e.text)
      else if (ts.isIdentifier(e) && e.text in resolve) out += escapeHtml(String(resolve[e.text]))
      else if (ts.isPropertyAccessExpression(e) && e.getText(src.sf) in resolve) out += escapeHtml(String(resolve[e.getText(src.sf)]))
      else throw new Error(`${src.file}:${line(src, e)} unsupported JSX expression {${e.getText(src.sf)}}`)
    } else if (ts.isJsxSelfClosingElement(child)) {
      const tag = tagName(child)
      if (tag === 'br') out += '<br>'
      else throw new Error(`${src.file}:${line(src, child)} unsupported inline <${tag} />`)
    } else if (ts.isJsxElement(child)) {
      const tag = tagName(child)
      if (tag === 'svg') continue // decorative arrow icons
      const inner = childrenHtml(child, src, resolve)
      if (INLINE.has(tag)) out += `<${tag}>${inner}</${tag}>`
      else if (tag === 'a' || tag === 'Link') out += `<a href="${escapeHtml(String(src.attr(child, 'href', resolve)))}">${inner}</a>`
      else throw new Error(`${src.file}:${line(src, child)} unsupported inline <${tag}>`)
    }
  }
  return out
}

const line = (src: Source, n: ts.Node) => src.sf.getLineAndCharacterOfPosition(n.getStart(src.sf)).line + 1

/** Raw material of one <section>: labels, headings, paragraphs, images and mapped arrays, in order. */
export class Section {
  constructor(readonly src: Source, readonly node: ts.Node) {}
  private all(tag: string) { return this.src.elements(tag, this.node) }
  get labels() { return this.all('SectionLabel').map((e) => this.src.text(e)) }
  headings(resolve: Scope = {}) { return [...this.all('h1'), ...this.all('h2')].sort((a, b) => a.pos - b.pos).map((e) => this.src.html(e, resolve)) }
  h3(resolve: Scope = {}) { return this.all('h3').map((e) => this.src.html(e, resolve)) }
  ps(resolve: Scope = {}) { return this.all('p').map((e) => this.src.html(e, resolve)) }
  /** Like ps(), but a paragraph that cannot be extracted (data-driven) becomes null. */
  psSafe(resolve: Scope = {}) {
    return this.all('p').map((e) => { try { return this.src.html(e, resolve) } catch { return null } })
  }
  /** Class name of each <p>, aligned with ps(). */
  get pClasses() { return this.all('p').map((e) => String(this.src.attr(e, 'className') ?? '')) }
  spans(resolve: Scope = {}) { return this.all('span').filter((e) => ts.isJsxElement(e) && this.src.html(e, resolve)).map((e) => this.src.html(e, resolve)) }
  get images() { return this.all('Image').map((e) => ({ src: this.src.attr(e, 'src'), alt: this.src.attr(e, 'alt') })) }
  get arrays() { return this.src.mappedArrays(this.node) }
  links(resolve: Scope = {}) {
    return [...this.all('a'), ...this.all('Link')].sort((a, b) => a.pos - b.pos).map((e) => ({ href: this.src.attr(e, 'href', resolve), html: this.src.html(e, resolve) }))
  }
  /** <p>/<h2>/<h3> in document order with class names (data-driven ones get html null). */
  flow(resolve: Scope = {}) {
    return [...this.all('p'), ...this.all('h2'), ...this.all('h3')]
      .sort((a, b) => a.pos - b.pos)
      .map((e) => {
        let html: string | null = null
        try { html = this.src.html(e, resolve) } catch { /* data-driven */ }
        return { tag: tagName(e), html, cls: String(this.src.attr(e, 'className') ?? '') }
      })
  }
  /** Text of elements that only contain text (e.g. a decorative watermark div). */
  divTexts(resolve: Scope = {}) {
    return this.all('div').filter((e) => ts.isJsxElement(e) && e.children.every((c) => ts.isJsxText(c))).map((e) => this.src.text(e, resolve)).filter(Boolean)
  }
}
