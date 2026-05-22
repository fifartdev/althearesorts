import type { Metadata } from 'next'
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from './constants'

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

  return {
    title: fullTitle,
    description: metaDesc,
    keywords: keywords?.join(', '),
    authors: [{ name: SITE_NAME }],
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    alternates: {
      canonical: canonical || SITE_URL,
      languages: {
        'en': `${SITE_URL}/en`,
        'el': `${SITE_URL}/el`,
        'fr': `${SITE_URL}/fr`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: fullTitle,
      description: metaDesc,
      url: canonical || SITE_URL,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
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
  description: 'A luxury boutique resort on the hillside of Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens.',
  url: SITE_URL,
  telephone: '+302114184108',
  email: 'reservations@althearesorts.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ano Loutro',
    addressLocality: 'Xylokastro',
    addressRegion: 'Corinthia',
    addressCountry: 'GR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 38.0567,
    longitude: 22.6345,
  },
  starRating: {
    '@type': 'Rating',
    ratingValue: '5',
  },
  numberOfRooms: 41,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Private Pool', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Spa', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Rooftop Restaurant', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Private Beach', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Conference Room', value: true },
  ],
  priceRange: '€€€€',
  image: `${SITE_URL}/og-default.jpg`,
  sameAs: [
    'https://instagram.com/althearesorts',
    'https://facebook.com/althearesorts',
  ],
}
