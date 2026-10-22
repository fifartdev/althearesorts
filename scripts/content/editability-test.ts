/**
 * End-to-end proof that the site is fully driven by WordPress: for every kind of content (settings,
 * page texts, screen-reader labels, SEO/GEO fields, structured data, robots.txt, llms.txt, images,
 * and every content type) it changes / creates / deletes the content in WordPress and checks that a
 * deployed site shows the change within seconds (webhook → /api/revalidate). Everything is restored
 * and every test item deleted afterwards, also on failure.
 *
 * It briefly changes WordPress content, so it refuses to run against production (the public site
 * or the production WordPress, cms.althearesorts.com). Run it against a test WordPress and site:
 *   npx tsx scripts/content/editability-test.ts https://althea-cms-preview.vercel.app --yes
 * Needs WP_API_URL, WP_USERNAME, WP_APP_PASSWORD (and VERCEL_BYPASS for a protected preview) in .env.local.
 */
import fs from 'node:fs'
import path from 'node:path'

const [siteArg, ...flags] = process.argv.slice(2)
if (!siteArg || !flags.includes('--yes')) {
  console.error('Usage: npx tsx scripts/content/editability-test.ts <site url> --yes   (temporarily edits live WordPress content)')
  process.exit(1)
}
const SITE = siteArg.replace(/\/$/, '')
const env = Object.fromEntries(
  fs
    .readFileSync(path.join(process.cwd(), '.env.local'), 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim().replace(/^"|"$/g, '')]),
)
const API = env.WP_API_URL.replace(/\/$/, '')
const PRODUCTION = ['cms.althearesorts.com', 'www.althearesorts.com', 'althearesorts.com']
if (PRODUCTION.includes(new URL(API).host) || PRODUCTION.includes(new URL(SITE).host)) {
  console.error(`Refusing to run: ${new URL(API).host} / ${new URL(SITE).host} is production. Point WP_API_URL and the site at a test WordPress.`)
  process.exit(1)
}
const AUTH = 'Basic ' + Buffer.from(`${env.WP_USERNAME}:${env.WP_APP_PASSWORD}`).toString('base64')
const BYPASS: Record<string, string> = env.VERCEL_BYPASS ? { 'x-vercel-protection-bypass': env.VERCEL_BYPASS } : {}
const TIMEOUT = 30_000

/* --------------------------------------------------------------------------------------------- */

async function wp<T = any>(method: string, route: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API}${route}`, {
    method,
    headers: { Authorization: AUTH, ...(body ? { 'Content-Type': 'application/json' } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`${method} ${route} → ${res.status} ${(await res.text()).slice(0, 200)}`)
  return res.json() as Promise<T>
}

async function page(p: string): Promise<{ status: number; html: string }> {
  const res = await fetch(`${SITE}${p}${p.includes('?') ? '&' : '?'}_t=${Date.now()}`, { headers: BYPASS, cache: 'no-store' })
  return { status: res.status, html: await res.text() }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Polls a page until cond() holds; returns the seconds it took, or throws after TIMEOUT. */
async function until(p: string, cond: (r: { status: number; html: string }) => boolean, what: string) {
  const t0 = Date.now()
  for (;;) {
    if (cond(await page(p))) return (Date.now() - t0) / 1000
    if (Date.now() - t0 > TIMEOUT) throw new Error(`${p}: ${what} not seen within ${TIMEOUT / 1000}s`)
    await sleep(1000)
  }
}
const shows = (m: string) => (r: { html: string }) => r.html.includes(m)
const hides = (m: string) => (r: { html: string }) => !r.html.includes(m)

const results: Array<{ area: string; check: string; ok: boolean; detail: string }> = []
let n = 0
const marker = () => `ZqTest${Date.now().toString(36)}${n++}`

async function check(area: string, name: string, fn: () => Promise<string>) {
  try {
    const detail = await fn()
    results.push({ area, check: name, ok: true, detail })
    console.log(`PASS  ${area} — ${name} (${detail})`)
  } catch (e) {
    results.push({ area, check: name, ok: false, detail: (e as Error).message })
    console.log(`FAIL  ${area} — ${name}: ${(e as Error).message}`)
  }
}

/* -------------------------------- content accessors (with restore) -------------------------------- */

/** Changes one leaf of a site page (althea_content[section][leaf]), checks, then restores it. */
async function withPageLeaf(slug: string, section: string, leaf: string, value: (old: string) => string, test: () => Promise<string>) {
  const [p] = await wp<any[]>('GET', `/wp/v2/althea-pages?slug=${slug}&context=edit&_fields=id,meta`)
  const original = p.meta.althea_content
  const changed = structuredClone(original)
  changed[section] ??= {}
  changed[section][leaf] = value(original?.[section]?.[leaf] ?? '')
  await wp('POST', `/wp/v2/althea-pages/${p.id}`, { meta: { althea_content: changed } })
  try {
    return await test()
  } finally {
    await wp('POST', `/wp/v2/althea-pages/${p.id}`, { meta: { althea_content: original } })
  }
}

async function withSetting(key: string, value: (old: string) => string, test: () => Promise<string>) {
  const original = (await wp('GET', '/wp/v2/settings')).althea_settings
  await wp('POST', '/wp/v2/settings', { althea_settings: { ...original, [key]: value(original[key]) } })
  try {
    return await test()
  } finally {
    await wp('POST', '/wp/v2/settings', { althea_settings: original })
  }
}

async function withItem(base: string, slug: string, change: (item: any) => Record<string, unknown>, test: () => Promise<string>) {
  const [item] = await wp<any[]>('GET', `/wp/v2/${base}?slug=${slug}&context=edit&status=any`)
  if (!item) throw new Error(`${base}/${slug} not found`)
  const patch = change(item)
  const restore: Record<string, unknown> = {}
  for (const k of Object.keys(patch)) {
    if (k === 'meta') restore.meta = Object.fromEntries(Object.keys(patch.meta as object).map((m) => [m, item.meta[m]]))
    else if (k === 'title') restore.title = item.title.raw
    else restore[k] = item[k]
  }
  await wp('POST', `/wp/v2/${base}/${item.id}`, patch)
  try {
    return await test()
  } finally {
    await wp('POST', `/wp/v2/${base}/${item.id}`, restore)
  }
}

/** Creates a published item, runs the test (which may delete it), and always deletes it at the end. */
async function withNewItem(base: string, body: Record<string, unknown>, test: (id: number) => Promise<string>) {
  const created = await wp('POST', `/wp/v2/${base}`, { status: 'publish', ...body })
  try {
    return await test(created.id)
  } finally {
    await wp('DELETE', `/wp/v2/${base}/${created.id}?force=true`).catch(() => {})
  }
}

/** Create → appears on every path; update → change appears; delete → disappears from every path. */
async function crud(base: string, paths: string[], body: (m: string) => Record<string, unknown>, update: (m: string) => Record<string, unknown>) {
  const m1 = marker()
  const m2 = marker()
  return withNewItem(base, body(m1), async (id) => {
    let t = 0
    for (const p of paths) t = Math.max(t, await until(p, shows(m1), 'new item'))
    await wp('POST', `/wp/v2/${base}/${id}`, update(m2))
    for (const p of paths) t = Math.max(t, await until(p, shows(m2), 'updated item'))
    await wp('DELETE', `/wp/v2/${base}/${id}?force=true`)
    for (const p of paths) t = Math.max(t, await until(p, hides(m2), 'deletion'))
    return `created, updated and deleted; slowest ${t.toFixed(1)}s`
  })
}

/* --------------------------------------------------------------------------------------------- */

async function main() {
  console.log(`Site: ${SITE}\nWordPress: ${new URL(API).host}\n`)
  const media = await wp<any[]>('GET', '/wp/v2/media?per_page=2&_fields=id,source_url')
  const altImage = media[0]

  // Settings
  await check('Settings', 'phone (footer + LodgingBusiness telephone)', async () => {
    const m = `+30 2743 0${Date.now() % 100000}`
    return withSetting('phone', () => m, async () => `${await until('/about', (r) => r.html.includes(m) && r.html.includes(`"telephone":"${m}"`), 'phone')}s`)
  })
  await check('Settings', 'site name (title suffix, og:site_name)', async () => {
    const m = marker()
    return withSetting('site_name', () => m, async () => `${await until('/offers', (r) => r.html.includes(`| ${m}</title>`) && r.html.includes(`og:site_name" content="${m}"`), 'site name')}s`)
  })
  await check('Settings', 'main menu (Greek)', async () => {
    const m = marker()
    return withSetting('nav_el', (old) => `${old}\n${m} | /el/faq`, async () => `${await until('/el', shows(m), 'menu item')}s`)
  })
  await check('Settings', 'booking engine URL', async () => {
    const m = marker()
    return withSetting('booking_url', () => `https://althearesort.reserve-online.net/?t=${m}`, async () => `${await until('/', shows(m), 'booking url')}s`)
  })
  await check('Settings', 'coordinates (GEO in structured data)', async () => {
    return withSetting('lat', () => '37.9999', async () => `${await until('/location', shows('"latitude":37.9999'), 'latitude')}s`)
  })

  // Page texts (both languages), shared texts, labels
  await check('Page text', 'homepage hero tagline (EN)', async () => {
    const m = marker()
    return withPageLeaf('home', 'hero', 'tagline.en', () => m, async () => `${await until('/', shows(m), 'tagline')}s`)
  })
  await check('Page text', 'homepage hero tagline (EL)', async () => {
    const m = marker()
    return withPageLeaf('home', 'hero', 'tagline.el', () => m, async () => `${await until('/el', shows(m), 'tagline')}s`)
  })
  await check('Page text', 'footer copyright (all pages)', async () => {
    const m = marker()
    return withPageLeaf('shared', 'footer', 'copyright.en', () => `© {year} ${m}`, async () => `${await until('/spa', shows(m), 'copyright')}s`)
  })
  await check('Page text', 'contact form button', async () => {
    const m = marker()
    return withPageLeaf('contact', 'form', 'submit.en', () => m, async () => `${await until('/contact', shows(m), 'button')}s`)
  })
  await check('Page text', 'legal page (Terms)', async () => {
    const m = marker()
    return withPageLeaf('terms', 'main', 'title.en', () => m, async () => `${await until('/terms', shows(m), 'title')}s`)
  })
  await check('Accessibility', 'skip link', async () => {
    const m = marker()
    return withPageLeaf('a11y', 'layout', 'skip_link.en', () => m, async () => `${await until('/gallery', shows(m), 'skip link')}s`)
  })
  await check('Accessibility', 'section label (Greek)', async () => {
    const m = marker()
    return withPageLeaf('a11y', 'pages', 'faq.el', () => m, async () => `${await until('/el/faq', shows(`aria-label="${m}"`), 'aria-label')}s`)
  })
  await check('Images', 'page image (Offers hero)', async () => {
    return withPageLeaf('offers', 'hero', 'image', () => String(altImage.id), async () => {
      const file = path.basename(altImage.source_url).replace(/\.[a-z]+$/i, '')
      return `${await until('/offers', shows(file), 'new image')}s`
    })
  })

  // SEO per page
  await check('SEO', 'page title (About, EN)', async () => {
    const m = marker()
    return withPageLeaf('about', 'seo', 'title.en', () => m, async () => `${await until('/about', shows(`<title>${m} | `), 'title')}s`)
  })
  await check('SEO', 'meta description (About, EL)', async () => {
    const m = marker()
    return withPageLeaf('about', 'seo', 'description.el', () => m, async () => `${await until('/el/about', shows(`name="description" content="${m}"`), 'description')}s`)
  })
  await check('SEO', 'keywords (Spa)', async () => {
    const m = marker()
    return withPageLeaf('spa', 'seo', 'keywords.en', () => m, async () => `${await until('/spa', shows(`name="keywords" content="${m}"`), 'keywords')}s`)
  })
  await check('SEO', 'share image (Location, og:image)', async () => {
    const file = path.basename(altImage.source_url)
    return withPageLeaf('location', 'seo', 'image', () => String(altImage.id), async () => `${await until('/location', (r) => new RegExp(`og:image" content="[^"]*${file.replace(/\./g, '\\.')}`).test(r.html), 'og:image')}s`)
  })
  await check('SEO', 'room SEO title override', async () => {
    const m = marker()
    return withItem('althea-rooms', 'superior-sea-view', () => ({ meta: { seo_title_en: m } }), async () => `${await until('/accommodation/superior-sea-view', shows(`<title>${m} | `), 'title')}s`)
  })
  await check('Page text', 'room description (EL)', async () => {
    const m = marker()
    return withItem('althea-rooms', 'deluxe-double-mv-pv', () => ({ meta: { short_desc_el: m } }), async () => `${await until('/el/accommodation/deluxe-double-mv-pv', shows(m), 'description')}s`)
  })
  await check('SEO', 'blog post SEO description', async () => {
    const m = marker()
    return withItem('althea-posts', 'en-ancient-corinth', () => ({ meta: { seo_description: m } }), async () => `${await until('/journal/ancient-corinth', shows(`name="description" content="${m}"`), 'description')}s`)
  })

  // GEO / structured data / crawler files
  await check('GEO', 'hotel description (LodgingBusiness, every page)', async () => {
    const m = marker()
    return withPageLeaf('seo_geo', 'hotel', 'description', () => m, async () => `${await until('/faq', shows(`"description":"${m}"`), 'JSON-LD')}s`)
  })
  await check('GEO', 'amenities (LodgingBusiness)', async () => {
    const m = marker()
    return withPageLeaf('seo_geo', 'hotel', 'amenities', (old) => `${old}\n${m}`, async () => `${await until('/', shows(`"name":"${m}"`), 'amenity')}s`)
  })
  await check('GEO', 'AITHER Restaurant schema (Gastronomy)', async () => {
    const m = marker()
    return withPageLeaf('seo_geo', 'restaurant', 'page_description', () => m, async () => `${await until('/gastronomy', shows(`"description":"${m}"`), 'Restaurant JSON-LD')}s`)
  })
  await check('GEO', 'spa treatments (Spa schema)', async () => {
    const m = marker()
    return withPageLeaf('seo_geo', 'spa', 'treatments', (old) => `${old}\n${m}`, async () => `${await until('/spa', shows(`"name":"${m}"`), 'treatment')}s`)
  })
  await check('GEO', 'room bed type (HotelRoom schema)', async () => {
    const m = marker()
    return withItem('althea-rooms', 'standard-double', () => ({ meta: { schema_bed: m } }), async () => `${await until('/accommodation/standard-double', shows(`"typeOfBed":"${m}"`), 'bed type')}s`)
  })
  await check('GEO', 'FAQ answer (FAQPage schema, EL)', async () => {
    const [faq] = await wp<any[]>('GET', '/wp/v2/althea-faqs?per_page=1&context=edit')
    const m = marker()
    return withItem('althea-faqs', faq.slug, () => ({ meta: { answer_el: m } }), async () => `${await until('/el/faq', shows(`"text":"${m}"`), 'FAQPage')}s`)
  })
  await check('GEO', 'robots.txt (block an AI crawler)', async () => {
    const m = marker()
    return withPageLeaf('seo_geo', 'robots', 'block_bots', (old) => `${old}\n${m}`, async () => `${await until('/robots.txt', shows(`User-Agent: ${m}\nDisallow: /`), 'robots rule')}s`)
  })
  await check('GEO', 'llms.txt (AI summary)', async () => {
    const m = marker()
    return withPageLeaf('seo_geo', 'llms', 'content', (old) => `${old}\n\n${m}`, async () => `${await until('/llms.txt', shows(m), 'llms.txt')}s`)
  })
  await check('SEO', 'default share image (og:image fallback)', async () => {
    const file = path.basename(altImage.source_url)
    return withPageLeaf('seo_geo', 'defaults', 'share_image', () => String(altImage.id), async () => `${await until('/offers', (r) => new RegExp(`og:image" content="[^"]*${file.replace(/\./g, '\\.')}`).test(r.html), 'default og:image')}s`)
  })

  // Content types: create → update → delete
  await check('Rooms', 'new room: page, list, sitemap, llms.txt; then deleted (404)', async () => {
    const m1 = marker()
    const slug = `zq-test-room-${Date.now().toString(36)}`
    return withNewItem('althea-rooms', { title: m1, slug, menu_order: 99, meta: { size: '30 m²', tagline_en: m1, view_en: 'Sea', short_desc_en: m1, features_en: 'WiFi', schema_bed: 'King', schema_occupancy_min: '1', schema_occupancy_max: '2' } }, async (id) => {
      const t = Math.max(
        await until(`/accommodation/${slug}`, (r) => r.status === 200 && r.html.includes(m1), 'room page'),
        await until('/accommodation', shows(m1), 'room list'),
        await until('/sitemap.xml', shows(`/accommodation/${slug}`), 'sitemap entry'),
        await until('/llms.txt', shows(`/accommodation/${slug}`), 'llms.txt entry'),
      )
      await wp('DELETE', `/wp/v2/althea-rooms/${id}?force=true`)
      const t2 = Math.max(
        await until(`/accommodation/${slug}`, (r) => r.status === 404, '404 after delete'),
        await until('/sitemap.xml', hides(`/accommodation/${slug}`), 'sitemap removal'),
      )
      return `appeared in ${t.toFixed(1)}s, removed in ${t2.toFixed(1)}s`
    })
  })
  await check('Blog', 'new post: list, article, sitemap; then deleted (404)', async () => {
    const m = marker()
    const route = `zq-test-${Date.now().toString(36)}`
    return withNewItem('althea-posts', { title: m, slug: `en-${route}`, excerpt: m, featured_media: altImage.id, meta: { locale: 'en', route_slug: route, category: 'Test', read_time: '1 min read', display_date: 'Today', body: `## ${m}\n\nText` } }, async (id) => {
      const t = Math.max(
        await until('/journal', shows(m), 'list'),
        await until(`/journal/${route}`, (r) => r.status === 200 && r.html.includes(m), 'article'),
        await until('/sitemap.xml', shows(`/journal/${route}`), 'sitemap'),
      )
      await wp('DELETE', `/wp/v2/althea-posts/${id}?force=true`)
      const t2 = await until(`/journal/${route}`, (r) => r.status === 404, '404 after delete')
      return `appeared in ${t.toFixed(1)}s, removed in ${t2.toFixed(1)}s`
    })
  })
  const faqCat = (await wp<any[]>('GET', '/wp/v2/althea-faq-cats?per_page=1'))[0].id
  await check('FAQ', 'question (EN page + FAQPage schema)', () =>
    crud('althea-faqs', ['/faq'], (m) => ({ title: m, 'althea-faq-cats': [faqCat], meta: { question_en: m, answer_en: m } }), (m) => ({ meta: { question_en: m, answer_en: m } })))
  await check('FAQ', 'category (new term with its question)', async () => {
    const m = marker()
    const term = await wp('POST', '/wp/v2/althea-faq-cats', { name: m, meta: { name_el: m, sort_order: 99 } })
    try {
      return await withNewItem('althea-faqs', { title: m, 'althea-faq-cats': [term.id], meta: { question_en: 'Q', answer_en: 'A' } }, async () => `${await until('/faq', shows(m), 'category')}s`)
    } finally {
      await wp('DELETE', `/wp/v2/althea-faq-cats/${term.id}?force=true`).catch(() => {})
    }
  })
  const galleryCat = (await wp<any[]>('GET', '/wp/v2/althea-gallery-cats?per_page=1'))[0].id
  await check('Gallery', 'photo', () =>
    crud('althea-gallery', ['/gallery'], (m) => ({ title: m, featured_media: altImage.id, 'althea-gallery-cats': [galleryCat], meta: { caption_en: m } }), (m) => ({ meta: { caption_en: m } })))
  await check('Testimonials', 'guest review (homepage)', () =>
    crud('althea-testimonials', ['/'], (m) => ({ title: m, menu_order: 0, meta: { quote_en: m, name_en: 'Test', origin_en: 'GR', stay_en: '2026' } }), (m) => ({ meta: { quote_en: m } })))
  await check('Gastronomy', 'venue', () =>
    crud('althea-venues', ['/gastronomy'], (m) => ({ title: m, featured_media: altImage.id, meta: { label_en: 'Test', title_en: m, desc_en: m } }), (m) => ({ meta: { title_en: m } })))
  await check('Spa', 'facility', () =>
    crud('althea-spa-items', ['/spa'], (m) => ({ title: m, featured_media: altImage.id, meta: { kind: 'facility', name_en: m, desc_en: m } }), (m) => ({ meta: { name_en: m } })))
  await check('Location', 'sightseeing', () =>
    crud('althea-sights', ['/location'], (m) => ({ title: m, featured_media: altImage.id, meta: { name_en: m, distance_en: '1 km', desc_en: m, category_en: 'Test' } }), (m) => ({ meta: { name_en: m } })))
  await check('Offers', 'offer', () =>
    crud('althea-offers', ['/offers'], (m) => ({ title: m, featured_media: altImage.id, meta: { active: true, eyebrow_en: m, heading_en: m, body_en: m, cta_label_en: 'Book' } }), (m) => ({ meta: { heading_en: m } })))
  await check('Offers', 'reason to book direct', () =>
    crud('althea-reasons', ['/offers'], (m) => ({ title: m, meta: { title_en: m, body_en: m } }), (m) => ({ meta: { title_en: m } })))

  // Report
  const failed = results.filter((r) => !r.ok)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  fs.writeFileSync(path.join(process.cwd(), 'scripts/content/editability-report.json'), JSON.stringify({ site: SITE, date: new Date().toISOString(), results }, null, 2) + '\n')
  if (failed.length) process.exitCode = 1
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
