import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

type Locale = 'en' | 'el' | 'fr'

// ---------------------------------------------------------------------------
// Globals
// ---------------------------------------------------------------------------

export const getContactInfo = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'contact-info' }).catch(() => null)
  },
  ['contact-info'],
  { revalidate: 3600, tags: ['contact-info'] }
)

export const getBookingSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'booking-settings' }).catch(() => null)
  },
  ['booking-settings'],
  { revalidate: 3600, tags: ['booking-settings'] }
)

export const getSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'site-settings' }).catch(() => null)
  },
  ['site-settings'],
  { revalidate: 3600, tags: ['site-settings'] }
)

// ---------------------------------------------------------------------------
// Collections
// ---------------------------------------------------------------------------

export async function getRooms(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'rooms', locale, limit: 20, sort: 'order' })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getRoom(slug: string, locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'rooms', locale, where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => null)
  return result?.docs[0] ?? null
}

export async function getDining(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'dining', locale, limit: 20, sort: 'order' })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getFAQs(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'faqs', locale, limit: 100, sort: 'order' })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getOffers(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'offers', locale, limit: 20 })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getJournalPosts(locale: Locale = 'en', limit = 20) {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'journal', locale, limit, sort: '-publishedAt' })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getGalleryItems(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'gallery', locale, limit: 100, sort: 'order' })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getLocations(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'locations', locale, limit: 20 })
    .catch(() => null)
  return result?.docs ?? []
}

export async function getTestimonials(locale: Locale = 'en') {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'testimonials', locale, limit: 20, where: { featured: { equals: true } } })
    .catch(() => null)
  return result?.docs ?? []
}
