import React from 'react'
import Link from 'next/link'

/**
 * Renders the inline HTML stored in CMS html/paragraph/block fields (a, strong, em, b, i, br) as
 * React elements — no dangerouslySetInnerHTML. Each tag can be given the class it had in the
 * original markup, e.g. <Rich html={heading} classes={{ em: 'italic font-light' }} />.
 * Internal links ("/…") render with next/link; other links as <a>.
 */

type Tag = 'a' | 'strong' | 'em' | 'b' | 'i'
export type RichClasses = Partial<Record<Tag, string>>

type Node = string | { tag: Tag | 'br'; href?: string; target?: string; rel?: string; children: Node[] }

const NAMED: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', mdash: '—', ndash: '–', hellip: '…' }

export function decodeEntities(value: string): string {
  return value.replace(/&(#x[0-9a-f]+|#[0-9]+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === '#') return String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
    return NAMED[e.toLowerCase()] ?? m
  })
}

const TOKEN = /<(\/?)(a|strong|em|b|i|br)\b([^>]*)>/gi

export function parseInline(html: string): Node[] {
  const root: Node[] = []
  const stack: Array<{ tag: Tag; href?: string; target?: string; rel?: string; children: Node[] }> = []
  const push = (n: Node) => (stack.length ? stack[stack.length - 1].children : root).push(n)
  let last = 0
  for (const m of html.matchAll(TOKEN)) {
    if (m.index! > last) push(decodeEntities(html.slice(last, m.index)))
    last = m.index! + m[0].length
    const closing = m[1] === '/'
    const tag = m[2].toLowerCase() as Tag | 'br'
    if (tag === 'br') {
      if (!closing) push({ tag: 'br', children: [] })
    } else if (!closing) {
      const attr = (name: string) => {
        const v = new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i').exec(m[3])?.[1]
        return v === undefined ? undefined : decodeEntities(v)
      }
      const el = tag === 'a'
        ? { tag, href: attr('href') ?? '', target: attr('target'), rel: attr('rel'), children: [] as Node[] }
        : { tag, children: [] as Node[] }
      push(el)
      stack.push(el)
    } else {
      const i = stack.map((s) => s.tag).lastIndexOf(tag)
      if (i !== -1) stack.length = i
    }
  }
  if (last < html.length) push(decodeEntities(html.slice(last)))
  return root
}

function render(nodes: Node[], classes: RichClasses, keyPrefix = ''): React.ReactNode[] {
  return nodes.map((n, i) => {
    const key = `${keyPrefix}${i}`
    if (typeof n === 'string') return n
    if (n.tag === 'br') return <br key={key} />
    const children = render(n.children, classes, `${key}.`)
    const className = classes[n.tag]
    if (n.tag === 'a') {
      const href = n.href ?? ''
      return href.startsWith('/') ? (
        <Link key={key} href={href} className={className}>{children}</Link>
      ) : (
        <a key={key} href={href} target={n.target} rel={n.rel} className={className}>{children}</a>
      )
    }
    const El = n.tag
    return <El key={key} className={className}>{children}</El>
  })
}

export function Rich({ html, classes = {} }: { html: string | null | undefined; classes?: RichClasses }) {
  if (!html) return null
  return <>{render(parseInline(html), classes)}</>
}

/** Plain text of an inline-HTML string (for alt text, aria labels, metadata). */
export function plainText(html: string | null | undefined): string {
  return html ? decodeEntities(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '')) : ''
}

/**
 * A CMS "paragraphs" field rendered as <p> elements. className may depend on the position, to keep
 * the original spacing (typically every paragraph but the last has a bottom margin).
 */
export function Paragraphs({
  html,
  className,
  classes,
}: {
  html: string | null | undefined
  className?: string | ((index: number, count: number) => string | undefined)
  classes?: RichClasses
}) {
  const items = (html ?? '').replace(/\r\n?/g, '\n').split(/\n[ \t]*\n\s*/).map((p) => p.trim()).filter(Boolean)
  return (
    <>
      {items.map((p, i) => (
        <p key={i} className={typeof className === 'function' ? className(i, items.length) : className}>
          <Rich html={p} classes={classes} />
        </p>
      ))}
    </>
  )
}

/** "mb-x on all but the last" helper for <Paragraphs className>. */
export const spaced = (base: string, between: string, last = '') => (i: number, n: number) =>
  [base, i < n - 1 ? between : last].filter(Boolean).join(' ')
