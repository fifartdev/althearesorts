/**
 * Refreshes the offline fallback (src/lib/wp/fallback/content.json) from WordPress, so a WordPress
 * outage serves the latest edited content. Images that were migrated from /public (see
 * scripts/media-map.json) point back to their local file, so they still load during an outage;
 * images added later in WordPress keep their WordPress URL.
 *
 *   npx tsx scripts/content/pull-fallback.ts            # write content.json
 *   npx tsx scripts/content/pull-fallback.ts --check    # only report whether it is up to date
 *
 * Run it before deploying when content changed (the build itself always reads live WordPress).
 */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { CONTENT_PATH, loadSchema, validate } from './validate'

const ROOT = path.resolve(import.meta.dirname, '../..')
dotenv.config({ path: path.join(ROOT, '.env.local'), quiet: true } as any)
const API = (process.env.WP_API_URL ?? '').replace(/\/$/, '')
const CHECK = process.argv.includes('--check')
const schema = loadSchema()
const current = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'))
const mediaMap: Record<string, { id: number; url: string }> = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/media-map.json'), 'utf8'))

/** Original URL strings used in the content before migration, by source key (keeps %20 etc.). */
const originalUrl = new Map<string, string>()
const keyOf = (url: string) => {
  if (url.startsWith('/')) return decodeURIComponent(url)
  const u = /images\.unsplash\.com\/(photo-[0-9a-f-]+)/.exec(url)
  return u ? `unsplash:${u[1]}` : url.split('?')[0]
}
;(function collect(o: unknown, ctx: string[] = []) {
  if (Array.isArray(o)) o.forEach((x) => collect(x, ctx))
  else if (o && typeof o === 'object') {
    const r = o as Record<string, unknown>
    if (Object.keys(r).length === 1 && typeof r.url === 'string') {
      const k = keyOf(r.url)
      if (!originalUrl.has(k)) originalUrl.set(k, r.url)
    } else Object.values(r).forEach((x) => collect(x, ctx))
  }
})(current)
const byWpId = new Map(Object.entries(mediaMap).map(([key, v]) => [v.id, key]))

/**
 * API image → fallback image. Where the current snapshot has the same image at the same place, its
 * exact URL is kept (e.g. an Unsplash width variant); otherwise the original local/remote URL from
 * before the migration, or the WordPress URL for images added in WordPress.
 */
function toFallback(v: unknown, cur?: any): unknown {
  if (Array.isArray(v)) return v.map((x, i) => toFallback(x, Array.isArray(cur) ? cur[i] : undefined))
  if (v && typeof v === 'object') {
    const r = v as Record<string, unknown>
    if (typeof r.id === 'number' && typeof r.url === 'string' && 'mime' in r) {
      const key = byWpId.get(r.id)
      if (key && typeof cur?.url === 'string' && keyOf(cur.url) === key) return { url: cur.url }
      return { url: (key && originalUrl.get(key)) || r.url }
    }
    return Object.fromEntries(Object.entries(r).map(([k, x]) => [k, toFallback(x, cur?.[k])]))
  }
  return v
}

async function get(route: string) {
  const res = await fetch(`${API}/althea/v1${route}`)
  if (!res.ok) throw new Error(`GET ${route} → HTTP ${res.status}`)
  return res.json()
}

async function main() {
  const next: any = {
    generated: 'Offline fallback, refreshed from WordPress by scripts/content/pull-fallback.ts — do not edit by hand',
    settings: await get('/settings'),
    pages: {},
    items: {},
    terms: {},
  }
  for (const slug of Object.keys(schema.pages)) next.pages[slug] = { sections: toFallback((await get(`/pages/${slug}`)).sections, current.pages?.[slug]?.sections) }
  for (const type of Object.keys(schema.postTypes)) {
    if (type === 'althea_page') continue
    const items: any[] = await get(`/items/${type}`)
    // Keep the snapshot's existing item order (minimal diffs); new items go last.
    const position = new Map<string, number>((current.items?.[type] ?? []).map((x: any, n: number) => [x.slug, n]))
    items.sort((a, b) => (position.get(a.slug) ?? Infinity) - (position.get(b.slug) ?? Infinity) || a.menuOrder - b.menuOrder)
    const currentBySlug = new Map((current.items?.[type] ?? []).map((x: any) => [x.slug, x]))
    next.items[type] = items.map((i) => {
      const cur: any = currentBySlug.get(i.slug)
      const taxonomies: string[] = schema.postTypes[type].taxonomies ?? []
      return {
        slug: i.slug,
        title: i.title,
        excerpt: i.excerpt,
        menuOrder: i.menuOrder,
        image: toFallback(i.image, cur?.image) ?? null,
        fields: toFallback(i.fields, cur?.fields),
        ...(taxonomies.length ? { terms: Object.fromEntries(taxonomies.map((t) => [t, i.terms[t].map((x: any) => x.slug)])) } : {}),
      }
    })
  }
  for (const tax of Object.keys(schema.taxonomies)) next.terms[tax] = (await get(`/terms/${tax}`)).map(({ id, ...t }: any) => t)

  const errors = validate(next, schema)
  if (errors.length) throw new Error(`WordPress content does not match schema.json:\n${errors.slice(0, 20).join('\n')}`)

  const same = JSON.stringify({ ...next, generated: '' }) === JSON.stringify({ ...current, generated: '' })
  if (CHECK) {
    console.log(same ? 'content.json is up to date with WordPress' : 'content.json differs from WordPress — run without --check to refresh it')
    process.exitCode = same ? 0 : 1
    return
  }
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(next, null, 2) + '\n')
  console.log(same ? 'content.json was already up to date (rewritten)' : 'content.json refreshed from WordPress')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
