import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { ROOMS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${SITE_URL}/accommodation`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/experiences`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/spa`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/gastronomy`, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${SITE_URL}/gallery`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/location`, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${SITE_URL}/offers`, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${SITE_URL}/journal`, changeFrequency: 'weekly' as const, priority: 0.7 },
    { url: `${SITE_URL}/faq`, changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const roomPages = ROOMS.map((room) => ({
    url: `${SITE_URL}/accommodation/${room.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const greekPages = [
    { url: `${SITE_URL}/el`, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${SITE_URL}/el/accommodation`, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${SITE_URL}/el/experiences`, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${SITE_URL}/el/spa`, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${SITE_URL}/el/gastronomy`, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${SITE_URL}/el/gallery`, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${SITE_URL}/el/about`, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${SITE_URL}/el/location`, changeFrequency: 'monthly' as const, priority: 0.65 },
    { url: `${SITE_URL}/el/offers`, changeFrequency: 'weekly' as const, priority: 0.75 },
    { url: `${SITE_URL}/el/contact`, changeFrequency: 'monthly' as const, priority: 0.55 },
    { url: `${SITE_URL}/el/journal`, changeFrequency: 'weekly' as const, priority: 0.65 },
    { url: `${SITE_URL}/el/faq`, changeFrequency: 'monthly' as const, priority: 0.55 },
  ]

  const greekRoomPages = ROOMS.map((room) => ({
    url: `${SITE_URL}/el/accommodation/${room.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...roomPages, ...greekPages, ...greekRoomPages]
}
