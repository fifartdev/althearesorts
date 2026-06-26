import type { Metadata } from 'next'
import { SITE_NAME, SITE_TAGLINE, SITE_URL, COORDINATES, PHONE, SOCIAL, GOOGLE_MAPS_CID_URL } from './constants'

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
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`
  const defaultDesc = `Luxury boutique hotel in Ano Loutro, Corinthia, 60 minutes from Athens. Elegant rooms, Ocean Spa & Corinthian Gulf views.`
  const metaDesc = description || defaultDesc
  const ogImage = image || `${SITE_URL}/og-default.jpg`
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
    authors: [{ name: SITE_NAME }],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates,
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
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

export const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': 'https://althearesorts.com/#hotel',
  name: 'Althea Resorts',
  alternateName: 'Althea Exclusive Resorts & Spa',
  description: 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites, Ocean Spa, and rooftop restaurant AITHER.',
  url: SITE_URL,
  telephone: PHONE,
  email: 'reservations@althearesorts.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ano Loutro',
    addressLocality: 'Xylokastro',
    addressRegion: 'Corinthia',
    postalCode: '20400',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: COORDINATES.lat,
    longitude: COORDINATES.lng,
  },
  hasMap: GOOGLE_MAPS_CID_URL,
  starRating: {
    '@type': 'Rating',
    ratingValue: '5',
  },
  numberOfRooms: 41,
  checkinTime: '15:00',
  checkoutTime: '11:00',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card, Debit Card',
  availableLanguage: [
    { '@type': 'Language', name: 'English' },
    { '@type': 'Language', name: 'Greek' },
    { '@type': 'Language', name: 'French' },
  ],
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Ocean Spa', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Sauna', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Hammam', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Swimming Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Rooftop Restaurant', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Pool Bar', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Room', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Fitness Centre', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Yoga Room', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
  ],
  priceRange: '€€€€',
  image: `${SITE_URL}/og-default.jpg`,
  sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin],
  containsPlace: [
    {
      '@type': 'Restaurant',
      '@id': 'https://althearesorts.com/gastronomy#aither',
      name: 'AITHER',
      description: 'Rooftop restaurant with panoramic views of the Corinthian Gulf. Mediterranean cuisine told through a Greek lens.',
      servesCuisine: ['Greek', 'Mediterranean'],
      priceRange: '€€€€',
      url: `${SITE_URL}/gastronomy#aither`,
    },
    {
      '@type': 'HealthAndBeautyBusiness',
      '@id': 'https://althearesorts.com/spa#ocean-spa',
      name: 'Ocean Spa',
      description: 'Full-service spa with sauna, hammam, ice bath, dedicated pool, yoga room, gym, and three treatment cabins. Treatments use Oceanis certified Greek cosmetics.',
      url: `${SITE_URL}/spa`,
    },
  ],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://althearesorts.com/#organization',
  name: 'Althea Resorts',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/althea_logo_white-f.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: PHONE,
    contactType: 'reservations',
    availableLanguage: ['English', 'Greek', 'French'],
  },
  sameAs: [SOCIAL.instagram, SOCIAL.facebook, SOCIAL.linkedin],
}
