import 'server-only'

/**
 * Typed read access to the WordPress CMS (Althea CMS plugin, althea/v1). All WordPress access in
 * the site goes through this module, on the server only.
 *
 * Caching: every request is tagged ('wp' plus a specific tag) and cached by Next.js. WordPress calls
 * /api/revalidate when content is saved, which expires the matching tags immediately, so changes
 * appear on the next request. REVALIDATE_SAFETY_NET is only a backstop for missed webhooks.
 *
 * Fallback: if WordPress is unreachable or errors, the content snapshot in fallback/content.json
 * (the content migrated to WordPress) is served instead, so builds and pages never fail on a
 * WordPress outage.
 */
import fallback from './fallback/content.json'
import type { Item, ItemType, Media, Pages, PageSlug, Settings, Taxonomy, Term } from './schema-types'

export const WP_TAGS = {
  all: 'wp',
  settings: 'wp:settings',
  page: (slug: string) => `wp:page:${slug}`,
  items: (type: string) => `wp:${type}`,
} as const

const REVALIDATE_SAFETY_NET = 3600 // seconds
const TIMEOUT_MS = 10_000

function apiBase(): string | null {
  const url = process.env.WP_API_URL?.replace(/\/$/, '')
  return url && url.startsWith('https://') ? url : null
}

const warned = new Set<string>()

// Be gentle with WordPress during builds, when ~60 pages render in parallel: identical concurrent
// requests share one fetch, at most MAX_CONCURRENT requests run at once per process, and 429/5xx
// responses are retried with backoff (honouring Retry-After).
const MAX_CONCURRENT = 4
const MAX_ATTEMPTS = 4
let active = 0
const queue: Array<() => void> = []
const inflight = new Map<string, Promise<unknown>>()

async function withSlot<T>(fn: () => Promise<T>): Promise<T> {
  if (active >= MAX_CONCURRENT) await new Promise<void>((resolve) => queue.push(resolve))
  active++
  try {
    return await fn()
  } finally {
    active--
    queue.shift()?.()
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchJson<T>(url: string, tags: string[]): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    const res = await withSlot(() =>
      fetch(url, {
        next: { tags: [WP_TAGS.all, ...tags], revalidate: REVALIDATE_SAFETY_NET },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }),
    )
    if (res.ok) return (await res.json()) as T
    const retryable = res.status === 429 || res.status >= 500
    if (!retryable || attempt >= MAX_ATTEMPTS) throw new Error(`HTTP ${res.status}`)
    const retryAfter = Number(res.headers.get('retry-after'))
    await sleep(Number.isFinite(retryAfter) && retryAfter > 0 ? Math.min(retryAfter, 10) * 1000 : 500 * 2 ** attempt)
  }
}

async function wpGet<T>(route: string, tags: string[]): Promise<T | null> {
  const base = apiBase()
  if (!base) return null
  const url = `${base}/althea/v1${route}`
  try {
    let pending = inflight.get(url) as Promise<T> | undefined
    if (!pending) {
      pending = fetchJson<T>(url, tags).finally(() => inflight.delete(url))
      inflight.set(url, pending)
    }
    return await pending
  } catch (error) {
    if (!warned.has(route)) {
      warned.add(route)
      console.error(`[wp] ${route} failed, serving fallback content:`, (error as Error).message)
    }
    return null
  }
}

/* ---------------------------------------------------------------------------------------------
 * Fallback (content.json stores images as { url } and item terms as slugs)
 * ------------------------------------------------------------------------------------------- */

const fb = fallback as unknown as {
  settings: Settings
  pages: { [K in PageSlug]: { sections: Pages[K] } }
  items: { [T in ItemType]: Array<Omit<Item<T>, 'terms'> & { terms?: Record<string, string[]> }> }
  terms: Record<Taxonomy, Term[]>
}

function fallbackItems<T extends ItemType>(type: T): Item<T>[] {
  return fb.items[type].map((item) => ({
    ...item,
    terms: Object.fromEntries(
      Object.entries(item.terms ?? {}).map(([tax, slugs]) => [tax, slugs.map((s) => fb.terms[tax as Taxonomy].find((t) => t.slug === s)!)]),
    ),
  })) as unknown as Item<T>[]
}

/* ---------------------------------------------------------------------------------------------
 * API
 * ------------------------------------------------------------------------------------------- */

export async function getSettings(): Promise<Settings> {
  return (await wpGet<Settings>('/settings', [WP_TAGS.settings])) ?? fb.settings
}

export async function getPage<K extends PageSlug>(slug: K): Promise<Pages[K]> {
  const page = await wpGet<{ sections: Pages[K] }>(`/pages/${slug}`, [WP_TAGS.page(slug)])
  return page?.sections ?? fb.pages[slug].sections
}

export async function getItems<T extends ItemType>(type: T): Promise<Item<T>[]> {
  return (await wpGet<Item<T>[]>(`/items/${type}`, [WP_TAGS.items(type)])) ?? fallbackItems(type)
}

export async function getTerms(taxonomy: Taxonomy, itemType: ItemType): Promise<Term[]> {
  return (await wpGet<Term[]>(`/terms/${taxonomy}`, [WP_TAGS.items(itemType)])) ?? fb.terms[taxonomy]
}

/** URL of an image field, or '' when empty. */
export const src = (media: Media | null | undefined) => media?.url ?? ''

/** Blog posts of one language, in their editorial order (menu order). */
export async function getPosts(locale: 'en' | 'el') {
  return (await getItems('althea_post')).filter((p) => p.fields.locale === locale)
}

/** A translated field in the given language, falling back to English when the translation is empty. */
export const tr = (field: { en: string; el?: string }, locale: 'en' | 'el') => (locale === 'el' && field.el) || field.en
