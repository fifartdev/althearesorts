/**
 * Reads everything back from WordPress through the public althea/v1 API and compares it with
 * src/lib/wp/fallback/content.json (images compared via scripts/media-map.json).
 * Proves the migration stored exactly what the site renders today.
 *
 *   npx tsx scripts/content/verify-wp.ts
 */
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { CONTENT_PATH, loadSchema } from './validate'

const ROOT = path.resolve(import.meta.dirname, '../..')
dotenv.config({ path: path.join(ROOT, '.env.local'), quiet: true } as any)
const API = (process.env.WP_API_URL ?? '').replace(/\/$/, '')
const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'))
const mediaMap: Record<string, { id: number; url: string }> = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/media-map.json'), 'utf8'))
const schema = loadSchema()

const mediaKey = (url: string) => {
  if (url.startsWith('/')) return decodeURIComponent(url)
  const u = /images\.unsplash\.com\/(photo-[0-9a-f-]+)/.exec(url)
  return u ? `unsplash:${u[1]}` : url.split('?')[0]
}

/** Replaces { url } (expected) and { id, url, … } (actual) images with comparable "media:<id>" strings. */
function normalize(v: any, side: 'expected' | 'actual'): any {
  if (Array.isArray(v)) return v.map((x) => normalize(x, side))
  if (v && typeof v === 'object') {
    if (side === 'expected' && Object.keys(v).length === 1 && typeof v.url === 'string') return `media:${mediaMap[mediaKey(v.url)]?.id ?? `UNMAPPED ${v.url}`}`
    if (side === 'actual' && typeof v.id === 'number' && 'url' in v && 'mime' in v) return `media:${v.id}`
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, normalize(x, side)]))
  }
  return v
}

const diffs: string[] = []
function compare(expected: any, actual: any, where: string) {
  if (Array.isArray(expected) || Array.isArray(actual)) {
    if (!Array.isArray(expected) || !Array.isArray(actual) || expected.length !== actual.length) {
      diffs.push(`${where}: length ${Array.isArray(expected) ? expected.length : '-'} ≠ ${Array.isArray(actual) ? actual.length : '-'}`)
      return
    }
    expected.forEach((e, i) => compare(e, actual[i], `${where}[${i}]`))
    return
  }
  if (expected && typeof expected === 'object') {
    for (const k of new Set([...Object.keys(expected), ...Object.keys(actual ?? {})])) compare(expected[k], actual?.[k], `${where}.${k}`)
    return
  }
  if (expected !== actual) diffs.push(`${where}:\n    expected ${JSON.stringify(expected)?.slice(0, 200)}\n    actual   ${JSON.stringify(actual)?.slice(0, 200)}`)
}

async function get(route: string) {
  const res = await fetch(`${API}${route}`)
  if (!res.ok) throw new Error(`GET ${route} → ${res.status}`)
  return res.json()
}

async function main() {
  compare(normalize(content.settings, 'expected'), await get('/althea/v1/settings'), 'settings')

  for (const slug of Object.keys(content.pages)) {
    const page = await get(`/althea/v1/pages/${slug}`)
    compare(normalize(content.pages[slug].sections, 'expected'), normalize(page.sections, 'actual'), `pages.${slug}`)
  }

  for (const [type, items] of Object.entries<any[]>(content.items)) {
    const actual: any[] = await get(`/althea/v1/items/${type}`)
    const bySlug = new Map(actual.map((a) => [a.slug, a]))
    if (actual.length !== items.length) diffs.push(`items.${type}: ${items.length} expected, ${actual.length} in WordPress`)
    for (const item of items) {
      const a = bySlug.get(item.slug)
      if (!a) {
        diffs.push(`items.${type}.${item.slug}: missing`)
        continue
      }
      const where = `items.${type}.${item.slug}`
      compare(item.title, a.title, `${where}.title`)
      compare(item.excerpt ?? '', a.excerpt, `${where}.excerpt`)
      compare(item.menuOrder, a.menuOrder, `${where}.menuOrder`)
      if (schema.postTypes[type].supports.includes('thumbnail')) compare(normalize(item.image, 'expected') ?? null, normalize(a.image, 'actual'), `${where}.image`)
      compare(normalize(item.fields, 'expected'), normalize(a.fields, 'actual'), `${where}.fields`)
      for (const tax of schema.postTypes[type].taxonomies ?? []) compare(item.terms[tax], a.terms[tax].map((t: any) => t.slug), `${where}.terms.${tax}`)
    }
  }

  for (const [tax, terms] of Object.entries<any[]>(content.terms)) {
    const actual: any[] = await get(`/althea/v1/terms/${tax}`)
    compare(terms.map((t) => ({ ...t, name: t.name })), actual.map(({ id, ...t }) => ({ ...t, name: t.name.replace(/&amp;/g, '&') })), `terms.${tax}`)
  }

  if (diffs.length) {
    console.log(`${diffs.length} difference(s):\n` + diffs.join('\n'))
    process.exit(1)
  }
  console.log('WordPress content matches content.json exactly (settings, 16 pages, all items, terms, media references).')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
