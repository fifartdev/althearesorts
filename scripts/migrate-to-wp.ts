/**
 * Imports the site's content into WordPress (the Althea CMS plugin must be installed).
 *
 *   npx tsx scripts/migrate-to-wp.ts --dry-run   # read-only: shows what would happen
 *   npx tsx scripts/migrate-to-wp.ts             # writes
 *   options: --only=media,terms,items,pages,settings   --force (update even if unchanged)
 *
 * Source: src/lib/wp/fallback/content.json (built by scripts/content/build-content.ts).
 * Credentials: WP_API_URL, WP_USERNAME, WP_APP_PASSWORD from .env.local (HTTPS only).
 *
 * Idempotent — safe to re-run:
 *   - Media is matched by source (local path / Unsplash photo id / URL) and content hash via
 *     _althea_source(_hash) meta, so files are never uploaded twice. Existing media is never modified.
 *   - Entries are matched by slug. Each stores _althea_payload_hash; an entry is only updated when the
 *     content generated from the repo changed (or with --force), so edits made in WordPress survive
 *     re-runs of unchanged content.
 *   - scripts/media-map.json records local path → WordPress media id/url.
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'
import { CONTENT_PATH, fieldLocales, loadSchema, validate, type Field } from './content/validate'

const ROOT = path.resolve(import.meta.dirname, '..')
const MEDIA_MAP_PATH = path.join(ROOT, 'scripts/media-map.json')
dotenv.config({ path: path.join(ROOT, '.env.local'), quiet: true } as any)

const args = process.argv.slice(2)
const DRY = args.includes('--dry-run')
const FORCE = args.includes('--force')
const ONLY = (args.find((a) => a.startsWith('--only='))?.slice(7).split(',') ?? ['media', 'terms', 'items', 'pages', 'settings']) as string[]

const API = (process.env.WP_API_URL ?? '').replace(/\/$/, '')
const AUTH = 'Basic ' + Buffer.from(`${process.env.WP_USERNAME ?? ''}:${process.env.WP_APP_PASSWORD ?? ''}`).toString('base64')
if (!API.startsWith('https://')) throw new Error('WP_API_URL must be an https:// URL')
if (!process.env.WP_USERNAME || !process.env.WP_APP_PASSWORD) throw new Error('WP_USERNAME / WP_APP_PASSWORD missing in .env.local')

const schema = loadSchema()
const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'))

/* ---------------------------------------------------------------------------------------------
 * Report
 * ------------------------------------------------------------------------------------------- */

type Outcome = 'created' | 'updated' | 'skipped' | 'failed'
const report: Record<string, Record<Outcome, number>> = {}
const failures: string[] = []
function record(group: string, outcome: Outcome, detail?: string) {
  report[group] ??= { created: 0, updated: 0, skipped: 0, failed: 0 }
  report[group][outcome]++
  if (outcome === 'failed') failures.push(`${group}: ${detail}`)
}

/* ---------------------------------------------------------------------------------------------
 * HTTP
 * ------------------------------------------------------------------------------------------- */

async function wp<T = any>(method: string, route: string, body?: unknown, attempt = 1): Promise<T> {
  const init: RequestInit = { method, headers: { Authorization: AUTH } }
  if (body instanceof FormData) init.body = body
  else if (body !== undefined) {
    init.body = JSON.stringify(body)
    ;(init.headers as Record<string, string>)['Content-Type'] = 'application/json'
  }
  const res = await fetch(`${API}${route}`, init)
  const text = await res.text()
  if (!res.ok) {
    if (attempt < 3 && (res.status >= 500 || res.status === 429)) {
      await new Promise((r) => setTimeout(r, 1500 * attempt))
      return wp(method, route, body, attempt + 1)
    }
    throw new Error(`${method} ${route} → HTTP ${res.status}: ${text.slice(0, 300)}`)
  }
  return (text ? JSON.parse(text) : null) as T
}

const sha1 = (data: string | Buffer) => crypto.createHash('sha1').update(data).digest('hex')
/** Stable JSON (sorted keys) so hashes don't depend on key order. */
const stable = (v: unknown): string =>
  Array.isArray(v) ? `[${v.map(stable).join(',')}]` : v && typeof v === 'object' ? `{${Object.keys(v as object).sort().map((k) => `${JSON.stringify(k)}:${stable((v as any)[k])}`).join(',')}}` : JSON.stringify(v)

async function pool<T>(items: T[], size: number, fn: (item: T) => Promise<void>) {
  let i = 0
  await Promise.all(Array.from({ length: Math.min(size, items.length) }, async () => {
    while (i < items.length) await fn(items[i++])
  }))
}

/* ---------------------------------------------------------------------------------------------
 * Media
 * ------------------------------------------------------------------------------------------- */

type MediaRef = { key: string; url: string; alt: string }

/** Identity of an image source: decoded local path, Unsplash photo id, or URL without query. */
function mediaKey(url: string): string {
  if (url.startsWith('/')) return decodeURIComponent(url)
  const unsplash = /images\.unsplash\.com\/(photo-[0-9a-f-]+)/.exec(url)
  if (unsplash) return `unsplash:${unsplash[1]}`
  return url.split('?')[0]
}

/** Collects every image in the content with an alt text from where it is first used. */
function collectMedia(): Map<string, MediaRef> {
  const refs = new Map<string, MediaRef>()
  const add = (img: { url: string } | null | undefined, alt: string | undefined) => {
    if (!img?.url) return
    const key = mediaKey(img.url)
    if (!refs.has(key)) refs.set(key, { key, url: img.url, alt: alt ?? '' })
    else if (!refs.get(key)!.alt && alt) refs.get(key)!.alt = alt
  }
  const en = (v: any) => (v && typeof v === 'object' ? v.en ?? '' : v ?? '')

  const walkSection = (obj: any) => {
    for (const [k, v] of Object.entries<any>(obj)) {
      if (Array.isArray(v)) v.forEach((item) => item && typeof item === 'object' && walkSection(item))
      else if (v && typeof v === 'object' && 'url' in v) add(v, en(obj[`${k}_alt`]) || en(obj.label) || en(obj.title))
      else if (v && typeof v === 'object' && 'en' in v && v.en && typeof v.en === 'object' && 'url' in v.en) {
        add(v.en, en(obj[`${k}_alt`]))
        add(v.el, obj[`${k}_alt`]?.el)
      }
    }
  }
  for (const page of Object.values<any>(content.pages)) for (const s of Object.values<any>(page.sections)) walkSection(s)

  for (const [type, items] of Object.entries<any[]>(content.items)) {
    for (const item of items) {
      const f = item.fields
      add(item.image, en(f.image_alt) || en(f.caption) || en(f.name) || item.title)
      if (type === 'althea_room') f.gallery.forEach((g: any, i: number) => add(g, `${item.title} — photo ${i + 1}`))
      if (f.image2) add(f.image2, f.image2_alt)
    }
  }
  return refs
}

async function loadSource(ref: MediaRef): Promise<{ data: Buffer; filename: string; type: string }> {
  if (ref.url.startsWith('/')) {
    const file = path.join(ROOT, 'public', ref.key)
    const ext = path.extname(file).toLowerCase()
    return { data: fs.readFileSync(file), filename: path.basename(file).replace(/\s+/g, '-'), type: ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg' }
  }
  // Unsplash: one high-resolution rendition per photo (the site uses up to w=2000).
  const download = ref.key.startsWith('unsplash:') ? `https://images.unsplash.com/${ref.key.slice(9)}?fm=jpg&w=2400&q=85` : ref.url
  const res = await fetch(download)
  if (!res.ok) throw new Error(`download ${download} → HTTP ${res.status}`)
  const type = res.headers.get('content-type')?.split(';')[0] ?? 'image/jpeg'
  const name = ref.key.startsWith('unsplash:') ? `unsplash-${ref.key.slice(9)}.jpg` : path.basename(new URL(ref.url).pathname)
  return { data: Buffer.from(await res.arrayBuffer()), filename: name, type }
}

type MediaEntry = { id: number; url: string; hash: string }
const mediaIds = new Map<string, MediaEntry>() // key → uploaded media (or placeholder in dry run)

async function migrateMedia() {
  const refs = [...collectMedia().values()]
  const index: Array<{ id: number; source: string; hash: string; url: string }> = await wp('GET', '/althea/v1/media-index')
  const bySource = new Map(index.map((m) => [m.source, m]))
  const byHash = new Map(index.map((m) => [m.hash, m]))
  console.log(`Media: ${refs.length} unique images (${index.length} already tagged in WordPress)`)

  let n = 0
  await pool(refs, 3, async (ref) => {
    const label = ref.key
    try {
      const src = await loadSource(ref)
      const hash = sha1(src.data)
      const existing = bySource.get(ref.key) ?? byHash.get(hash)
      if (existing && existing.hash === hash) {
        mediaIds.set(ref.key, { id: existing.id, url: existing.url, hash })
        record('media', 'skipped')
        return
      }
      if (DRY) {
        mediaIds.set(ref.key, { id: -1, url: '', hash })
        record('media', existing ? 'updated' : 'created')
        return
      }
      const form = new FormData()
      form.append('file', new Blob([src.data], { type: src.type }), src.filename)
      form.append('alt_text', ref.alt)
      form.append('title', path.parse(src.filename).name)
      form.append('meta[_althea_source]', ref.key)
      form.append('meta[_althea_source_hash]', hash)
      const created = await wp('POST', '/wp/v2/media', form)
      // Older WordPress versions ignore meta on multipart uploads: make sure it is stored.
      if (created.meta?._althea_source_hash !== hash) {
        await wp('POST', `/wp/v2/media/${created.id}`, { meta: { _althea_source: ref.key, _althea_source_hash: hash } })
      }
      mediaIds.set(ref.key, { id: created.id, url: created.source_url, hash })
      record('media', existing ? 'updated' : 'created')
      if (++n % 10 === 0) console.log(`  uploaded ${n}…`)
    } catch (e) {
      record('media', 'failed', `${label}: ${(e as Error).message}`)
    }
  })

  if (!DRY) {
    const map = Object.fromEntries([...mediaIds.entries()].sort().map(([k, v]) => [k, { id: v.id, url: v.url }]))
    fs.writeFileSync(MEDIA_MAP_PATH, JSON.stringify(map, null, 2) + '\n')
  }
}

/** Media id for an image value (0 = none). Dry run uses -1 for images that would be uploaded. */
function mediaId(img: { url: string } | null | undefined): number {
  if (!img?.url) return 0
  const m = mediaIds.get(mediaKey(img.url))
  if (!m) throw new Error(`image not migrated: ${img.url}`)
  return m.id
}

/* ---------------------------------------------------------------------------------------------
 * Converting content values to WordPress storage
 * ------------------------------------------------------------------------------------------- */

function storageValue(type: string, value: any): any {
  switch (type) {
    case 'image':
      return mediaId(value)
    case 'images':
      return (value as any[]).map(mediaId)
    case 'bool':
      return Boolean(value)
    case 'number':
      return Number(value)
    default:
      return value ?? ''
  }
}

/** Post meta for an item: { key_en: …, key_el: …, key: … }. */
function itemMeta(fields: Field[], values: any): Record<string, unknown> {
  const meta: Record<string, unknown> = {}
  for (const f of fields) {
    for (const locale of fieldLocales(f, schema.locales)) {
      const v = locale === null ? values[f.key] : values[f.key]?.[locale]
      meta[locale === null ? f.key : `${f.key}_${locale}`] = storageValue(f.type, v)
    }
  }
  return meta
}

/** althea_content for a site page: { section: { "key.locale" | "group.i.sub.locale": string } }. */
function pageContent(slug: string, page: any): Record<string, Record<string, string>> {
  const template = schema.pages[slug]
  const sections = [...template.sections, ...(template.seo === false ? [] : [{ key: 'seo', fields: schema.pageSeo }])]
  const leaf = (type: string, v: any) => {
    const s = storageValue(type, v)
    return Array.isArray(s) ? s.join(',') : typeof s === 'boolean' ? (s ? '1' : '') : String(s === 0 && (type === 'image' || type === 'number') ? '' : s)
  }
  const out: Record<string, Record<string, string>> = {}
  for (const section of sections) {
    const values = page.sections[section.key]
    const flat: Record<string, string> = {}
    const put = (f: Field, value: any, prefix: string) => {
      for (const locale of fieldLocales(f, schema.locales, template.locales)) {
        flat[locale === null ? `${prefix}${f.key}` : `${prefix}${f.key}.${locale}`] = leaf(f.type, locale === null ? value : value?.[locale])
      }
    }
    for (const f of section.fields as Field[]) {
      if (f.type === 'group') values[f.key].forEach((item: any, i: number) => f.fields!.forEach((sub) => put(sub, item[sub.key], `${f.key}.${i}.`)))
      else put(f, values[f.key], '')
    }
    out[section.key] = flat
  }
  return out
}

/* ---------------------------------------------------------------------------------------------
 * Upsert helpers
 * ------------------------------------------------------------------------------------------- */

async function upsertPost(group: string, restBase: string, slug: string, payload: Record<string, any>) {
  const hash = sha1(stable(payload))
  try {
    const found: any[] = await wp('GET', `/wp/v2/${restBase}?slug=${encodeURIComponent(slug)}&status=publish,draft,pending,private,future&context=edit&_fields=id,meta`)
    const existing = found[0]
    if (existing && existing.meta?._althea_payload_hash === hash && !FORCE) return record(group, 'skipped')
    if (DRY) return record(group, existing ? 'updated' : 'created')
    const body = { ...payload, slug, meta: { ...(payload.meta ?? {}), _althea_payload_hash: hash } }
    if (existing) {
      await wp('POST', `/wp/v2/${restBase}/${existing.id}`, body)
      record(group, 'updated')
    } else {
      await wp('POST', `/wp/v2/${restBase}`, { ...body, status: 'publish' })
      record(group, 'created')
    }
  } catch (e) {
    record(group, 'failed', `${slug}: ${(e as Error).message}`)
  }
}

const termIds = new Map<string, number>() // taxonomy:slug → id

async function migrateTerms() {
  for (const [taxonomy, terms] of Object.entries<any[]>(content.terms)) {
    const base = schema.taxonomies[taxonomy].restBase
    const existing: any[] = await wp('GET', `/wp/v2/${base}?per_page=100&context=edit&_fields=id,slug,name,meta`)
    for (const term of terms) {
      const group = `terms ${taxonomy}`
      const meta = { name_el: term.name_el, sort_order: term.sort_order }
      const found = existing.find((t) => t.slug === term.slug)
      try {
        if (found) {
          termIds.set(`${taxonomy}:${term.slug}`, found.id)
          const same = found.name === term.name && found.meta?.name_el === meta.name_el && Number(found.meta?.sort_order) === meta.sort_order
          if (same && !FORCE) { record(group, 'skipped'); continue }
          if (!DRY) await wp('POST', `/wp/v2/${base}/${found.id}`, { name: term.name, meta })
          record(group, 'updated')
        } else {
          if (DRY) { termIds.set(`${taxonomy}:${term.slug}`, -1); record(group, 'created'); continue }
          const created = await wp('POST', `/wp/v2/${base}`, { name: term.name, slug: term.slug, meta })
          termIds.set(`${taxonomy}:${term.slug}`, created.id)
          record(group, 'created')
        }
      } catch (e) {
        record(group, 'failed', `${term.slug}: ${(e as Error).message}`)
      }
    }
  }
}

async function migrateItems() {
  for (const [type, items] of Object.entries<any[]>(content.items)) {
    const def = schema.postTypes[type]
    console.log(`${def.label}: ${items.length}`)
    await pool(items, 4, async (item) => {
      try {
        const payload: Record<string, any> = {
          title: item.title,
          excerpt: item.excerpt ?? '',
          menu_order: item.menuOrder ?? 0,
          meta: itemMeta(def.fields, item.fields),
        }
        if (def.supports?.includes('thumbnail')) payload.featured_media = mediaId(item.image)
        for (const tax of def.taxonomies ?? []) {
          const base = schema.taxonomies[tax].restBase
          payload[base] = (item.terms?.[tax] ?? []).map((s: string) => termIds.get(`${tax}:${s}`) ?? -1)
        }
        await upsertPost(type, def.restBase, item.slug, payload)
      } catch (e) {
        record(type, 'failed', `${item.slug}: ${(e as Error).message}`)
      }
    })
  }
}

async function migratePages() {
  for (const [slug, page] of Object.entries<any>(content.pages)) {
    try {
      await upsertPost('althea_page', 'althea-pages', slug, { title: schema.pages[slug].label, meta: { althea_content: pageContent(slug, page) } })
    } catch (e) {
      record('althea_page', 'failed', `${slug}: ${(e as Error).message}`)
    }
  }
}

async function migrateSettings() {
  const fields = schema.settings.groups.flatMap((g: any) => g.fields) as Field[]
  const desired = itemMeta(fields, content.settings) as Record<string, string>
  try {
    const current = (await wp('GET', '/wp/v2/settings')).althea_settings ?? {}
    const same = Object.entries(desired).every(([k, v]) => current[k] === v)
    if (same && !FORCE) return record('settings', 'skipped')
    if (!DRY) await wp('POST', '/wp/v2/settings', { althea_settings: desired })
    record('settings', Object.values(current).some(Boolean) ? 'updated' : 'created')
  } catch (e) {
    record('settings', 'failed', (e as Error).message)
  }
}

/* ---------------------------------------------------------------------------------------------
 * Main
 * ------------------------------------------------------------------------------------------- */

async function main() {
  console.log(`${DRY ? 'DRY RUN (no changes) — ' : ''}WordPress: ${new URL(API).host}`)

  const errors = validate(content, schema)
  if (errors.length) throw new Error(`content.json does not match schema.json:\n${errors.slice(0, 20).join('\n')}`)

  const remote = await wp('GET', '/althea/v1/schema')
  if (stable(remote.schema) !== stable(schema)) {
    throw new Error('The schema.json on WordPress differs from the repo. Deploy the plugin first: wordpress/deploy-ftp.sh althea-cms/schema.json')
  }
  const me = await wp('GET', '/wp/v2/users/me?context=edit&_fields=capabilities')
  for (const cap of ['upload_files', 'edit_posts', 'manage_options', 'manage_categories']) {
    if (!me.capabilities?.[cap]) throw new Error(`WordPress user lacks capability ${cap}`)
  }

  // Items and pages reference media ids and term ids, so those always run first.
  if (ONLY.some((o) => ['media', 'items', 'pages', 'settings'].includes(o))) await migrateMedia()
  if (ONLY.some((o) => ['terms', 'items'].includes(o))) await migrateTerms()
  if (ONLY.includes('items')) await migrateItems()
  if (ONLY.includes('pages')) await migratePages()
  if (ONLY.includes('settings')) await migrateSettings()

  const rows = Object.entries(report)
  const w = Math.max(...rows.map(([g]) => g.length), 10)
  console.log(`\n${DRY ? 'Dry-run summary (nothing was written)' : 'Migration report'}`)
  console.log(`${'group'.padEnd(w)}  created  updated  skipped  failed`)
  for (const [g, r] of rows) console.log(`${g.padEnd(w)}  ${String(r.created).padStart(7)}  ${String(r.updated).padStart(7)}  ${String(r.skipped).padStart(7)}  ${String(r.failed).padStart(6)}`)
  const total = rows.reduce((a, [, r]) => ({ created: a.created + r.created, updated: a.updated + r.updated, skipped: a.skipped + r.skipped, failed: a.failed + r.failed }), { created: 0, updated: 0, skipped: 0, failed: 0 })
  console.log(`${'TOTAL'.padEnd(w)}  ${String(total.created).padStart(7)}  ${String(total.updated).padStart(7)}  ${String(total.skipped).padStart(7)}  ${String(total.failed).padStart(6)}`)
  if (failures.length) {
    console.log('\nFailures:\n' + failures.map((f) => `  - ${f}`).join('\n'))
    process.exitCode = 1
  }
}

main().catch((e) => {
  console.error(`\nAborted: ${(e as Error).message}`)
  process.exit(1)
})
