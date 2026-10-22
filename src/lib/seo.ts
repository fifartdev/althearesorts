import type { Metadata } from 'next'
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from './constants'
import type { SeoGeoPage, Settings } from './wp/schema-types'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  canonical?: string
  keywords?: string[]
  locale?: string
  /** Site-wide defaults from the CMS settings (name, tagline, default description). */
  site?: { name?: string; tagline?: string; description?: string; shareImage?: string }
  /** Explicit hreflang alternates, for pages that exist in one language only (default: EN/EL pair). */
  languages?: Record<string, string>
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex,
  canonical,
  keywords,
  locale,
  site,
  languages,
}: SEOProps = {}): Metadata {
  const siteName = site?.name || SITE_NAME
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — ${site?.tagline || SITE_TAGLINE}`
  const defaultDesc = site?.description || `Luxury boutique hotel in Ano Loutro, Corinthia, 60 minutes from Athens. Elegant rooms, Ocean Spa & Corinthian Gulf views.`
  const metaDesc = description || defaultDesc
  const ogImage = image || (site?.shareImage ? absoluteUrl(site.shareImage) : `${SITE_URL}/og-default.jpg`)
  const canonicalUrl = canonical || SITE_URL

  // Auto-derive locale from canonical path if not explicitly provided
  const canonicalPath = canonicalUrl.replace(SITE_URL, '') || '/'
  const isGreekPage = canonicalPath.startsWith('/el')
  const ogLocale = locale ?? (isGreekPage ? 'el_GR' : 'en_GB')

  // Auto-derive hreflang alternates from canonical URL
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
    description: metaDesc,
    keywords: keywords?.join(', '),
    authors: [{ name: siteName }],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    alternates: {
      canonical: canonicalUrl,
      languages: languages ?? hreflangAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: siteName,
      title: fullTitle,
      description: metaDesc,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: ogLocale,
      countryName: 'Greece',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: metaDesc,
      images: [ogImage],
    },
  }
}

// Helper to build BreadcrumbList schema
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

/** Absolute URL for structured data (images in the repo are site-relative). */
export const absoluteUrl = (url: string) => (url.startsWith('/') ? `${SITE_URL}${url}` : url)

const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean)

/** LodgingBusiness JSON-LD (every page), from the CMS settings and the "SEO & GEO" page. */
export const buildHotelSchema = (settings: Settings, geo: SeoGeoPage) => {
  const { hotel, restaurant, spa } = geo
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': 'https://www.althearesorts.com/#hotel',
    name: hotel.name,
    alternateName: hotel.alternate_name,
    description: hotel.description,
    url: SITE_URL,
    telephone: settings.phone,
    email: settings.email_reservations,
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.street,
      addressLocality: hotel.locality,
      addressRegion: hotel.region,
      postalCode: hotel.postal_code,
      addressCountry: hotel.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: Number(settings.lat),
      longitude: Number(settings.lng),
    },
    hasMap: settings.google_maps_url,
    starRating: {
      '@type': 'Rating',
      ratingValue: hotel.star_rating,
    },
    numberOfRooms: Number(hotel.rooms),
    checkinTime: hotel.checkin,
    checkoutTime: hotel.checkout,
    currenciesAccepted: hotel.currencies,
    paymentAccepted: hotel.payment,
    availableLanguage: lines(hotel.languages).map((name) => ({ '@type': 'Language', name })),
    amenityFeature: lines(hotel.amenities).map((name) => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    priceRange: hotel.price_range,
    image: absoluteUrl(hotel.image?.url ?? `${SITE_URL}/og-default.jpg`),
    sameAs: [settings.instagram_url, settings.facebook_url, settings.linkedin_url],
    containsPlace: [
      {
        '@type': 'Restaurant',
        '@id': 'https://www.althearesorts.com/gastronomy#aither',
        name: restaurant.name,
        description: restaurant.description,
        servesCuisine: lines(restaurant.cuisines),
        priceRange: restaurant.price_range,
        url: `${SITE_URL}/gastronomy#aither`,
      },
      {
        '@type': 'HealthAndBeautyBusiness',
        '@id': 'https://www.althearesorts.com/spa#ocean-spa',
        name: spa.name,
        description: spa.description,
        url: `${SITE_URL}/spa`,
      },
    ],
  }
}

/** Organization JSON-LD (every page). */
export const buildOrganizationSchema = (settings: Settings, geo: SeoGeoPage) => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://www.althearesorts.com/#organization',
  name: geo.hotel.name,
  url: SITE_URL,
  logo: absoluteUrl(geo.hotel.logo?.url ?? '/logos/althea_logo_white-f.png'),
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: settings.phone,
    contactType: geo.hotel.contact_type,
    availableLanguage: lines(geo.hotel.languages),
  },
  sameAs: [settings.instagram_url, settings.facebook_url, settings.linkedin_url],
})

/** Restaurant JSON-LD for the Gastronomy page. */
export const buildRestaurantSchema = ({ restaurant }: SeoGeoPage) => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://www.althearesorts.com/gastronomy#aither',
  name: restaurant.name,
  description: restaurant.page_description,
  url: 'https://www.althearesorts.com/gastronomy',
  servesCuisine: lines(restaurant.page_cuisines),
  priceRange: restaurant.page_price_range,
  containedInPlace: {
    '@id': 'https://www.althearesorts.com/#hotel',
  },
})

/** HealthAndBeautyBusiness JSON-LD for the Spa page. */
export const buildSpaSchema = ({ spa }: SeoGeoPage) => ({
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  '@id': 'https://www.althearesorts.com/spa#ocean-spa',
  name: spa.page_name,
  description: spa.page_description,
  url: 'https://www.althearesorts.com/spa',
  containedInPlace: {
    '@id': 'https://www.althearesorts.com/#hotel',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: spa.catalog_name,
    itemListElement: lines(spa.treatments).map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  },
})
