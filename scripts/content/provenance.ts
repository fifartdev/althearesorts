// Every visible, screen-reader and SEO string on every page must come from WordPress content.
// Usage: npx tsx scripts/content/provenance.ts <snapshot dir from scripts/compare/snapshot.ts> src/lib/wp/fallback/content.json
// Prints the strings that don't (exit code 1 if any).
import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'

const [snapDir, contentPath] = process.argv.slice(2)
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'))
const decode = (s: string) => new JSDOM(`<p>${s}</p>`).window.document.querySelector('p')!.textContent ?? ''
const norm = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase()
const parts: string[] = []
const walk = (v: unknown) => {
  if (typeof v === 'string') parts.push(norm(decode(v.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\[cta\]|\|/g, ' '))))
  else if (Array.isArray(v)) v.forEach(walk)
  else if (v && typeof v === 'object') Object.values(v).forEach(walk)
}
walk(content)
const corpus = parts.join('\n')
// Fields with placeholders ({year}, {email}, {room}, {n}…) match any value in their place.
const templates = parts
  .filter((p) => /\{\w+\}/.test(p))
  .flatMap((p) => p.split('\n'))
  .filter((p) => /\{\w+\}/.test(p))
  .map((p) => new RegExp('^' + p.trim().replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\\?\{\w+\\?\}/g, '.+?') + '$'))
// Defaults the code builds from WordPress fields when the matching SEO field is left empty.
const DEFAULTS = [
  /^(.+) (at|στην) althea resorts — /, // room meta description (room "SEO description" overrides it)
  /^(.+) althea$/, // first room keyword: "<room name> Althea" (room "SEO keywords" override it)
]
// Generated files and the framework's 404 page; robots.txt / llms.txt / sitemap.xml are built from WordPress data.
const GENERATED = new Set(['robots_txt', 'llms_txt', 'sitemap_xml', 'this-page-does-not-exist'])
const fromWp = (s: string) => {
  const n = norm(s)
  if (!n || /^[\d\s.,:;·•—–\-/|+%€$()#&*×'"’]+$/.test(n)) return true
  if (corpus.includes(n)) return true
  if (templates.some((t) => t.test(n)) || DEFAULTS.some((d) => d.test(n))) return true
  // Strings composed from several fields (e.g. "Title | Althea Resorts", "A — B. C").
  const pieces = n.split(/\s+[|—–·]\s+|\.\s+|,\s+/).map((p) => p.replace(/[.\s]+$/, '')).filter((p) => p.length > 2)
  return pieces.length > 1 && pieces.every((p) => corpus.includes(p))
}

const missing = new Map<string, Set<string>>()
const note = (kind: string, s: string, page: string) => {
  s = s.replace(/\s+/g, ' ').trim()
  if (!s || fromWp(s)) return
  const key = `${kind}: ${s.slice(0, 160)}`
  if (!missing.has(key)) missing.set(key, new Set())
  missing.get(key)!.add(page)
}
const jsonStrings = (v: unknown, out: string[] = [], key = ''): string[] => {
  if (typeof v === 'string' && !/^(@|https?:|\/|[A-Z][a-zA-Z]+$)/.test(v) && !['@type', '@context', '@id', 'unitCode', 'addressCountry'].includes(key)) out.push(v)
  else if (Array.isArray(v)) v.forEach((x) => jsonStrings(x, out, key))
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) jsonStrings(x, out, k)
  return out
}

const files = fs.readdirSync(snapDir).filter((f) => f.endsWith('.html'))
for (const f of files) {
  const page = f.replace(/\.html$/, '')
  if (GENERATED.has(page)) continue
  const doc = new JSDOM(fs.readFileSync(path.join(snapDir, f), 'utf8')).window.document
  for (const s of doc.querySelectorAll('script[type="application/ld+json"]')) for (const v of jsonStrings(JSON.parse(s.textContent!))) note('jsonld', v, page)
  doc.querySelectorAll('script,style,noscript,template').forEach((n: Element) => n.remove())
  note('title', doc.title, page)
  for (const m of doc.querySelectorAll('meta[name="description"],meta[name="keywords"],meta[property^="og:"],meta[name^="twitter:"]')) {
    const k = m.getAttribute('name') ?? m.getAttribute('property')!
    const v = m.getAttribute('content') ?? ''
    if (/url|image|type|card|locale|site_name/.test(k) && !/alt/.test(k)) continue
    if (k === 'keywords') v.split(/,\s*/).forEach((x: string) => note('meta keywords', x, page))
    else note(`meta ${k}`, v, page)
  }
  for (const el of doc.querySelectorAll('[alt],[aria-label],[title],[placeholder]'))
    for (const a of ['alt', 'aria-label', 'title', 'placeholder']) if (el.hasAttribute(a)) note(a, el.getAttribute(a)!, page)
  const tw = doc.createTreeWalker(doc.body, 4)
  for (let n = tw.nextNode(); n; n = tw.nextNode()) note('text', n.textContent ?? '', page)
}
const rows = [...missing].sort((a, b) => b[1].size - a[1].size)
for (const [k, pages] of rows) console.log(`${String(pages.size).padStart(2)}× ${k}   [${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ', …' : ''}]`)
console.log(`\n${rows.length} strings not from WordPress, across ${files.length - GENERATED.size} pages (generated: ${[...GENERATED].join(', ')})`)
if (rows.length) process.exitCode = 1
