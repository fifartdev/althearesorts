/**
 * Compares two snapshot directories (scripts/compare/snapshot.ts) page by page:
 *   - HTTP status
 *   - <head>: <html lang>, title, every meta name/property, canonical + hreflang links, JSON-LD (parsed)
 *   - <body>: markup (tags, classes, attributes) and text, with scripts removed
 * Images are compared by source: a local /images/x.jpg and its WordPress copy (scripts/media-map.json)
 * are the same image, and next/image width/quality parameters are ignored.
 *
 *   npx tsx scripts/compare/compare.ts <baseline-dir> <candidate-dir> [--verbose]
 */
import fs from 'node:fs'
import path from 'node:path'
import { JSDOM } from 'jsdom'

const [aDir, bDir] = process.argv.slice(2)
const VERBOSE = process.argv.includes('--verbose')
const ROOT = path.resolve(import.meta.dirname, '../..')
const mediaMap: Record<string, { id: number; url: string }> = fs.existsSync(path.join(ROOT, 'scripts/media-map.json'))
  ? JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/media-map.json'), 'utf8'))
  : {}
const byWpUrl = new Map(Object.entries(mediaMap).map(([key, v]) => [v.url, key]))

/** Canonical identity of an image URL (local path, unsplash id, or WordPress copy → its source). */
function imageKey(raw: string): string {
  let url = raw
  if (url.startsWith('/_next/image')) url = new URL(url, 'http://x').searchParams.get('url') ?? url
  try { url = decodeURIComponent(url) } catch { /* keep */ }
  if (byWpUrl.has(url)) return `img:${byWpUrl.get(url)}`
  const unsplash = /images\.unsplash\.com\/(photo-[0-9a-f-]+)/.exec(url)
  if (unsplash) return `img:unsplash:${unsplash[1]}`
  if (url.startsWith('/')) return `img:${url.split('?')[0]}`
  return `img:${url.split('?')[0]}`
}

const stable = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(stable).join(',')}]` : v && typeof v === 'object' ? `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${stable((v as any)[k])}`).join(',')}}` : JSON.stringify(v)

/** Image URLs inside a head line (og:image, JSON-LD photo/image) → source keys. */
function normalizeImages(line: string): string {
  return line.replace(/https?:\/\/[^"\s,]+?\.(?:jpe?g|png|webp)(?:\?[^"\s,]*)?|https:\/\/images\.unsplash\.com\/photo-[0-9a-f-]+(?:\?[^"\s,]*)?/gi, (url) => {
    const local = url.replace(/^https:\/\/(?:www\.)?althearesorts\.com(?=\/images\/|\/oldimages\/)/, '')
    return imageKey(local)
  })
}

function head(doc: Document): string[] {
  const out: string[] = [`lang=${doc.documentElement.getAttribute('lang')}`, `title=${doc.title}`]
  doc.querySelectorAll('meta[name], meta[property]').forEach((m) => out.push(`meta ${m.getAttribute('name') ?? m.getAttribute('property')}=${m.getAttribute('content')}`))
  doc.querySelectorAll('link[rel="canonical"], link[rel="alternate"]').forEach((l) => out.push(`link ${l.getAttribute('rel')} ${l.getAttribute('hreflang') ?? ''} ${l.getAttribute('href')}`))
  doc.querySelectorAll('script[type="application/ld+json"]').forEach((s) => {
    try { out.push(`ld+json ${stable(JSON.parse(s.textContent ?? ''))}`) } catch { out.push(`ld+json INVALID ${s.textContent}`) }
  })
  return out.sort()
}

function body(doc: Document): string[] {
  const b = doc.body.cloneNode(true) as HTMLElement
  b.querySelectorAll('script, next-route-announcer, template, link[rel="preload"], link[rel="stylesheet"]').forEach((e) => e.remove())
  b.querySelectorAll('[hidden][id^="S:"], div[hidden]').forEach((e) => { if (!e.textContent?.trim()) e.remove() })
  b.querySelectorAll('*').forEach((el) => {
    for (const attr of ['src', 'srcset', 'href', 'data-src']) {
      const v = el.getAttribute(attr)
      if (!v) continue
      if (attr === 'srcset') el.setAttribute(attr, [...new Set(v.split(',').map((s) => imageKey(s.trim().split(/\s+/)[0])))].join(','))
      else if (el.tagName === 'IMG' || v.startsWith('/_next/image')) el.setAttribute(attr, imageKey(v))
    }
    // next/image sizes its responsive placeholder by intrinsic size; not meaningful across image hosts.
    if (el.tagName === 'IMG') { el.removeAttribute('width'); el.removeAttribute('height') }
    // Attribute order does not affect the page.
    const attrs = [...el.attributes].map((a) => [a.name, a.value] as const).sort(([x], [y]) => x.localeCompare(y))
    for (const [name] of attrs) el.removeAttribute(name)
    for (const [name, value] of attrs) el.setAttribute(name, value)
  })
  // One line per tag so differences are easy to read. "<!-- -->" are React's invisible separators
  // between adjacent text nodes in server HTML; they do not change the rendered text.
  return b.innerHTML.replace(/<!-- -->/g, '').replace(/\s+/g, ' ').replace(/></g, '>\n<').split('\n').map((l) => l.trim()).filter(Boolean)
}

function firstDiff(a: string[], b: string[]) {
  const n = Math.max(a.length, b.length)
  for (let i = 0; i < n; i++) if (a[i] !== b[i]) return { i, a: a.slice(Math.max(0, i - 2), i + 3), b: b.slice(Math.max(0, i - 2), i + 3) }
  return null
}

function setDiff(a: string[], b: string[]) {
  return { removed: a.filter((x) => !b.includes(x)), added: b.filter((x) => !a.includes(x)) }
}

const ia: Record<string, number> = JSON.parse(fs.readFileSync(path.join(aDir, '_index.json'), 'utf8'))
const ib: Record<string, number> = JSON.parse(fs.readFileSync(path.join(bDir, '_index.json'), 'utf8'))
let problems = 0
const imageHostChanges: string[] = []
const fileFor = (p: string) => (p === '/' ? 'index' : p.replace(/^\//, '').replace(/[/?.]/g, '_')) + '.html'

for (const p of [...new Set([...Object.keys(ia), ...Object.keys(ib)])].sort()) {
  const issues: string[] = []
  if (ia[p] !== ib[p]) issues.push(`status ${ia[p]} → ${ib[p]}`)
  const ra = fs.existsSync(path.join(aDir, fileFor(p))) ? fs.readFileSync(path.join(aDir, fileFor(p)), 'utf8') : ''
  const rb = fs.existsSync(path.join(bDir, fileFor(p))) ? fs.readFileSync(path.join(bDir, fileFor(p)), 'utf8') : ''
  if (!/<html/i.test(ra)) {
    // The sitemap stamps every URL with the build date.
    const strip = (x: string) => x.replace(/<lastmod>[^<]*<\/lastmod>/g, '').trim()
    if (strip(ra) !== strip(rb)) issues.push('content differs')
  } else {
    const da = new JSDOM(ra).window.document, db = new JSDOM(rb).window.document
    const ha = head(da), hb = head(db)
    const h = setDiff(ha, hb)
    const hn = setDiff(ha.map(normalizeImages), hb.map(normalizeImages))
    for (const x of hn.removed) issues.push(`head − ${x.slice(0, 300)}`)
    for (const x of hn.added) issues.push(`head + ${x.slice(0, 300)}`)
    // Same image file now served from WordPress: reported, but not a content difference.
    const moved = h.removed.length - hn.removed.length
    if (moved > 0) imageHostChanges.push(`${p}: ${moved} head image URL(s) now point to the WordPress copy of the same file`)
    const d = firstDiff(body(da), body(db))
    if (d) issues.push(`body differs at line ${d.i}:\n      baseline:  ${d.a.join('\n                 ')}\n      candidate: ${d.b.join('\n                 ')}`)
  }
  if (issues.length) {
    problems++
    console.log(`✗ ${p}\n    ${issues.slice(0, VERBOSE ? 50 : 6).join('\n    ')}`)
  } else if (VERBOSE) console.log(`✓ ${p}`)
}
if (imageHostChanges.length) console.log(`\nSame image, new host (expected after migration):\n  ${imageHostChanges.join('\n  ')}`)
console.log(`\n${Object.keys(ia).length} URLs compared, ${problems} with differences`)
process.exitCode = problems ? 1 : 0
