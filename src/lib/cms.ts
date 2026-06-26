import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'

type Locale = 'en' | 'el'

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
// Collections — all wrapped in unstable_cache for on-demand revalidation
// ---------------------------------------------------------------------------

export const getRooms = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'rooms', locale, limit: 20, sort: 'order' })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['rooms'],
  { revalidate: false, tags: ['rooms'] }
)

export const getRoom = async (slug: string, locale: Locale = 'en') => {
  const payload = await getPayload({ config })
  const result = await payload
    .find({ collection: 'rooms', locale, where: { slug: { equals: slug } }, limit: 1 })
    .catch(() => null)
  return result?.docs[0] ?? null
}

export const getDining = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'dining', locale, limit: 20, sort: 'order' })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['dining'],
  { revalidate: false, tags: ['dining'] }
)

export const getFAQs = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'faqs', locale, limit: 100, sort: 'order' })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['faqs'],
  { revalidate: false, tags: ['faqs'] }
)

export const getOffers = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'offers', locale, limit: 20 })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['offers'],
  { revalidate: false, tags: ['offers'] }
)

export const getJournalPosts = unstable_cache(
  async (locale: Locale = 'en', limit = 20) => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'journal', locale, limit, sort: '-publishedAt' })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['journal'],
  { revalidate: false, tags: ['journal'] }
)

export const getGalleryItems = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'gallery', locale, limit: 100, sort: 'order' })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['gallery'],
  { revalidate: false, tags: ['gallery'] }
)

export const getLocations = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'locations', locale, limit: 20 })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['locations'],
  { revalidate: false, tags: ['locations'] }
)

export const getExperiences = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'experiences', locale, limit: 20, sort: 'order' })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['experiences'],
  { revalidate: false, tags: ['experiences'] }
)

export const getTestimonials = unstable_cache(
  async (locale: Locale = 'en') => {
    const payload = await getPayload({ config })
    const result = await payload
      .find({ collection: 'testimonials', locale, limit: 20, where: { featured: { equals: true } } })
      .catch(() => null)
    return result?.docs ?? []
  },
  ['testimonials'],
  { revalidate: false, tags: ['testimonials'] }
)
