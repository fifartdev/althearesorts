import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getItems, getPosts } from '@/lib/wp/api'

type SitemapEntry = MetadataRoute.Sitemap[number]

function pair(enPath: string, elPath: string, changeFreq: SitemapEntry['changeFrequency'], priority: number): SitemapEntry[] {
  const alternates = {
    languages: {
      en: `${SITE_URL}${enPath}`,
      el: `${SITE_URL}${elPath}`,
    },
  }
  return [
    { url: `${SITE_URL}${enPath}`, lastModified: new Date(), changeFrequency: changeFreq, priority, alternates },
    { url: `${SITE_URL}${elPath}`, lastModified: new Date(), changeFrequency: changeFreq, priority: priority - 0.05, alternates },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    ...pair('', '/el', 'weekly', 1),
    ...pair('/accommodation', '/el/accommodation', 'weekly', 0.9),
    ...pair('/experiences', '/el/experiences', 'monthly', 0.8),
    ...pair('/spa', '/el/spa', 'monthly', 0.8),
    ...pair('/gastronomy', '/el/gastronomy', 'monthly', 0.8),
    ...pair('/gallery', '/el/gallery', 'monthly', 0.7),
    ...pair('/about', '/el/about', 'monthly', 0.7),
    ...pair('/location', '/el/location', 'monthly', 0.7),
    ...pair('/offers', '/el/offers', 'weekly', 0.8),
    ...pair('/contact', '/el/contact', 'monthly', 0.6),
    ...pair('/journal', '/el/journal', 'weekly', 0.7),
    ...pair('/faq', '/el/faq', 'monthly', 0.6),
    { url: `${SITE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.3 },
  ]

  const rooms = await getItems('althea_room')
  const roomEntries: MetadataRoute.Sitemap = rooms.flatMap((room) =>
    pair(`/accommodation/${room.slug}`, `/el/accommodation/${room.slug}`, 'monthly', 0.8)
  )

  // Blog posts: EN/EL pairs share a translation key; single-language posts list only themselves.
  const [enPosts, elPosts] = await Promise.all([getPosts('en'), getPosts('el')])
  const postUrl = (locale: 'en' | 'el', slug: string) => `${SITE_URL}${locale === 'el' ? '/el' : ''}/journal/${slug}`
  const postEntries: MetadataRoute.Sitemap = []
  for (const post of enPosts) {
    const el = elPosts.find((p) => p.fields.translation_key === post.fields.translation_key)
    if (el) postEntries.push(...pair(`/journal/${post.fields.route_slug}`, `/el/journal/${el.fields.route_slug}`, 'monthly', 0.6))
    else postEntries.push({ url: postUrl('en', post.fields.route_slug), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 })
  }
  for (const post of elPosts) {
    if (!enPosts.some((p) => p.fields.translation_key === post.fields.translation_key)) {
      postEntries.push({ url: postUrl('el', post.fields.route_slug), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.55 })
    }
  }

  return [...staticEntries, ...roomEntries, ...postEntries]
}
