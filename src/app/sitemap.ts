import type { MetadataRoute } from 'next'
import { SITE_URL, ROOMS } from '@/lib/constants'

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

export default function sitemap(): MetadataRoute.Sitemap {
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

  const roomEntries: MetadataRoute.Sitemap = ROOMS.flatMap((room) =>
    pair(`/accommodation/${room.slug}`, `/el/accommodation/${room.slug}`, 'monthly', 0.8)
  )

  return [...staticEntries, ...roomEntries]
}
