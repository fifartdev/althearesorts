// Lists visible text in TSX/TS files: JSX text, string attrs (alt/src/href/title/label), and string literals.
// Usage: node scripts/list-strings.mjs <file...>
import ts from 'typescript'
import fs from 'node:fs'

const ATTRS = new Set(['alt', 'src', 'href', 'title', 'triggerLabel', 'closeLabel', 'openLabel', 'downloadLabel', 'downloadFileName', 'placeholder'])
const SKIP = /^(use client|[a-z-]+\/[a-z-]+|@\/.*|\.\/.*|react|next\/.*)$/

for (const file of process.argv.slice(2)) {
  const src = fs.readFileSync(file, 'utf8')
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
  const out = []
  const line = (n) => sf.getLineAndCharacterOfPosition(n.getStart()).line + 1
  const visit = (n) => {
    if (ts.isJsxText(n)) {
      const t = n.text.replace(/\s+/g, ' ').trim()
      if (t) out.push([line(n), 'jsx', t])
    } else if (ts.isJsxAttribute(n)) {
      const name = n.name.getText()
      if (name === 'className' || name === 'aria-label' || name === 'aria-hidden') return
      if (n.initializer && ts.isStringLiteral(n.initializer) && ATTRS.has(name)) out.push([line(n), name, n.initializer.text])
    } else if ((ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && !ts.isImportDeclaration(n.parent) && !ts.isJsxAttribute(n.parent)) {
      const p = n.parent
      const key = ts.isPropertyAssignment(p) ? p.name.getText() : ''
      if (key === 'span' || key === 'bg' || key === 'className' || key === '@context' || key === '@type') return
      if (!SKIP.test(n.text) && n.text.trim()) out.push([line(n), key ? `.${key}` : 'str', n.text.replace(/\s+/g, ' ')])
    }
    ts.forEachChild(n, visit)
  }
  visit(sf)
  console.log(`### ${file} (${out.length})`)
  for (const [l, k, t] of out) console.log(`${l}\t${k}\t${t}`)
}
