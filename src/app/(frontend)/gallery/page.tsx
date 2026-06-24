import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { GalleryClient } from './GalleryClient'

export const metadata = genMeta({
  title: 'Gallery',
  description: 'Photo gallery of Althea Resorts — rooms and suites, Ocean Spa, pool, dining, views of the Corinthian Gulf. Luxury boutique hotel in Xylokastro, Corinthia, Greece.',
  keywords: ['Althea Resorts gallery', 'hotel photos Corinthia', 'luxury resort Greece photos', 'Corinthian Gulf views'],
  canonical: `${SITE_URL}/gallery`,
})

export default function GalleryPage() {
  return <GalleryClient />
}
