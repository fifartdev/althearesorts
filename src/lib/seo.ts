import type { Metadata } from 'next'
import { SITE_NAME, SITE_TAGLINE, SITE_URL, COORDINATES } from './constants'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
  canonical?: string
  keywords?: string[]
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex,
  canonical,
  keywords,
}: SEOProps = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — ${SITE_TAGLINE}`
  const defaultDesc = `Althea Resorts — A luxury boutique hotel on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites with views of the Corinthian Gulf.`
  const metaDesc = description || defaultDesc
  const ogImage = image || `${SITE_URL}/og-default.jpg`
  const canonicalUrl = canonical || SITE_URL

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
      locale: 'en_GB',
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

export const hotelSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Althea Resorts',
  alternateName: 'Althea Exclusive Resorts & Spa',
  description: 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. 41 rooms and suites, Ocean Spa, rooftop restaurant Narrativa, and private beach access.',
  url: SITE_URL,
  telephone: '+302114184108',
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
  hasMap: `https://www.google.com/maps?q=${COORDINATES.lat},${COORDINATES.lng}`,
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
    { '@type': 'LocationFeatureSpecification', name: 'Private Beach Access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Room', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Fitness Centre', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Yoga Room', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking', value: true },
  ],
  priceRange: '€€€€',
  image: `${SITE_URL}/og-default.jpg`,
  sameAs: [
    'https://instagram.com/althearesorts',
    'https://facebook.com/althearesorts',
  ],
  containsPlace: [
    {
      '@type': 'Restaurant',
      name: 'Narrativa',
      description: 'Rooftop restaurant with panoramic views of the Corinthian Gulf. Mediterranean cuisine told through a Greek lens.',
      servesCuisine: ['Greek', 'Mediterranean'],
      priceRange: '€€€€',
      url: `${SITE_URL}/gastronomy#narrativa`,
    },
    {
      '@type': 'HealthAndBeautyBusiness',
      name: 'Ocean Spa',
      description: 'Full-service spa with sauna, hammam, ice bath, dedicated pool, yoga room, gym, and three treatment cabins. Treatments use Oceanis certified Greek cosmetics.',
      url: `${SITE_URL}/spa`,
    },
  ],
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Althea Resorts',
  url: SITE_URL,
  logo: `${SITE_URL}/logos/althea_logo_white-f.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+302114184108',
    contactType: 'reservations',
    availableLanguage: ['English', 'Greek', 'French'],
  },
  sameAs: [
    'https://instagram.com/althearesorts',
    'https://facebook.com/althearesorts',
  ],
}
