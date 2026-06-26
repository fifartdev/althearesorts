import type { Metadata } from 'next'

export const SITE_URL = 'https://althearesorts.com'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  canonical?: string
  keywords?: string[]
  locale?: string
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex,
  canonical,
  keywords,
  locale,
}: SEOProps = {}): Metadata {
  const siteName = 'Althea Resorts'
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Redefining Hospitality With Timeless Elegance`
  const metaDesc = description ?? ''
  const ogImage = image || `${SITE_URL}/og-default.jpg`
  const canonicalUrl = canonical || SITE_URL

  const canonicalPath = canonicalUrl.replace(SITE_URL, '') || '/'
  const isGreekPage = canonicalPath.startsWith('/el')
  const ogLocale = locale ?? (isGreekPage ? 'el_GR' : 'en_GB')

  const hreflangAlternates: Record<string, string> = {}
  if (isGreekPage) {
    const enPath = canonicalPath === '/el' ? '' : canonicalPath.replace(/^\/el/, '')
    hreflangAlternates['en'] = `${SITE_URL}${enPath}`
    hreflangAlternates['el'] = canonicalUrl
    hreflangAlternates['x-default'] = `${SITE_URL}${enPath}`
  } else {
    const elPath = canonicalPath === '/' || canonicalPath === '' ? '/el' : `/el${canonicalPath}`
    hreflangAlternates['en'] = canonicalUrl
    hreflangAlternates['el'] = `${SITE_URL}${elPath}`
    hreflangAlternates['x-default'] = canonicalUrl
  }

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    ...(metaDesc ? { description: metaDesc } : {}),
    ...(keywords?.length ? { keywords: keywords.join(', ') } : {}),
    authors: [{ name: siteName }],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      type: 'website',
      siteName,
      title: fullTitle,
      ...(metaDesc ? { description: metaDesc } : {}),
      url: canonicalUrl,
      images: [{ url: ogImage, width: 1200, height: 630, alt: fullTitle }],
      locale: ogLocale,
      countryName: 'Greece',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      ...(metaDesc ? { description: metaDesc } : {}),
      images: [ogImage],
    },
  }
}

// ---------------------------------------------------------------------------
// BreadcrumbList schema helper
// ---------------------------------------------------------------------------
export interface BreadcrumbItem { name: string; href: string }

export function buildBreadcrumb(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.href}`,
    })),
  }
}

// ---------------------------------------------------------------------------
// Dynamic schema builders — driven by Payload globals
// ---------------------------------------------------------------------------

/**
 * Builds the LodgingBusiness JSON-LD schema from Payload geo-settings and
 * site-settings globals. Falls back to minimal safe values if CMS is empty.
 */
export function buildHotelSchema(geo: any, site: any): object {
  const name = geo?.legalName || geo?.brandName || 'Althea Resorts'
  const alternateName = geo?.alternateName || undefined
  const description = geo?.description || undefined
  const telephone = geo?.telephone || undefined
  const email = geo?.email || undefined
  const checkinTime = geo?.checkinTime || '15:00'
  const checkoutTime = geo?.checkoutTime || '11:00'
  const starRating = geo?.starRating ?? 5
  const numberOfRooms = geo?.numberOfRooms ?? 41
  const priceRange = geo?.priceRange || '€€€€'
  const currenciesAccepted = geo?.currenciesAccepted || 'EUR'
  const paymentAccepted = geo?.paymentAccepted || 'Cash, Credit Card, Debit Card'

  const address = {
    '@type': 'PostalAddress',
    streetAddress: geo?.streetAddress || undefined,
    addressLocality: geo?.addressLocality || undefined,
    addressRegion: geo?.addressRegion || undefined,
    postalCode: geo?.postalCode || undefined,
    addressCountry: geo?.addressCountry || 'GR',
  }

  const lat = geo?.coordinates?.latitude
  const lng = geo?.coordinates?.longitude
  const geo_ = lat && lng ? {
    '@type': 'GeoCoordinates',
    latitude: lat,
    longitude: lng,
  } : undefined

  const sameAs: string[] = []
  if (geo?.instagram) sameAs.push(geo.instagram)
  if (geo?.facebook) sameAs.push(geo.facebook)
  if (geo?.linkedin) sameAs.push(geo.linkedin)
  if (geo?.tripadvisor) sameAs.push(geo.tripadvisor)
  if (geo?.bookingcom) sameAs.push(geo.bookingcom)
  if (geo?.googleBusinessProfile) sameAs.push(geo.googleBusinessProfile)

  const availableLanguage = (geo?.availableLanguages ?? []).map((l: any) => ({
    '@type': 'Language',
    name: l.language,
  }))

  const amenityFeature = (geo?.amenityFeatures ?? []).map((f: any) => ({
    '@type': 'LocationFeatureSpecification',
    name: f.name,
    value: f.value !== false,
  }))

  const containsPlace = (geo?.nestedPlaces ?? []).map((p: any) => {
    const entry: Record<string, unknown> = {
      '@type': p.schemaType || 'Restaurant',
      name: p.name,
    }
    if (p.id) entry['@id'] = p.id
    if (p.description) entry.description = p.description
    if (p.servesCuisine) entry.servesCuisine = p.servesCuisine.split(',').map((s: string) => s.trim())
    if (p.priceRange) entry.priceRange = p.priceRange
    if (p.url) entry.url = p.url
    return entry
  })

  const heroImageUrl = typeof site?.defaultOGImage === 'object'
    ? site?.defaultOGImage?.url
    : site?.defaultOGImage

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${SITE_URL}/#hotel`,
    name,
    url: geo?.url || SITE_URL,
    address,
    starRating: { '@type': 'Rating', ratingValue: String(starRating) },
    numberOfRooms,
    checkinTime,
    checkoutTime,
    currenciesAccepted,
    paymentAccepted,
    priceRange,
  }
  if (alternateName) schema.alternateName = alternateName
  if (description) schema.description = description
  if (telephone) schema.telephone = telephone
  if (email) schema.email = email
  if (geo_) schema.geo = geo_
  if (lat && lng) schema.hasMap = `https://www.google.com/maps?q=${lat},${lng}`
  if (availableLanguage.length) schema.availableLanguage = availableLanguage
  if (amenityFeature.length) schema.amenityFeature = amenityFeature
  if (containsPlace.length) schema.containsPlace = containsPlace
  if (sameAs.length) schema.sameAs = sameAs
  if (heroImageUrl) schema.image = heroImageUrl

  return schema
}

/**
 * Builds the Organization JSON-LD schema from Payload globals.
 */
export function buildOrganizationSchema(geo: any, site: any): object {
  const name = geo?.legalName || 'Althea Resorts'
  const telephone = geo?.telephone || undefined
  const url = geo?.url || SITE_URL

  const logoUrl = typeof site?.logo === 'object'
    ? site?.logo?.url
    : site?.logo

  const sameAs: string[] = []
  if (geo?.instagram) sameAs.push(geo.instagram)
  if (geo?.facebook) sameAs.push(geo.facebook)
  if (geo?.linkedin) sameAs.push(geo.linkedin)
  if (geo?.tripadvisor) sameAs.push(geo.tripadvisor)

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name,
    url,
  }
  if (logoUrl) schema.logo = logoUrl
  if (telephone) {
    schema.contactPoint = {
      '@type': 'ContactPoint',
      telephone,
      contactType: 'reservations',
    }
  }
  if (sameAs.length) schema.sameAs = sameAs

  return schema
}
