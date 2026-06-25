import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getGalleryItems } from '@/lib/cms'
import { GalleryClient } from './GalleryClient'

export const metadata = genMeta({
  title: 'Gallery',
  description: 'Photo gallery of Althea Resorts — rooms and suites, Ocean Spa, pool, dining, views of the Corinthian Gulf. Luxury boutique hotel in Xylokastro, Corinthia, Greece.',
  keywords: ['Althea Resorts gallery', 'hotel photos Corinthia', 'luxury resort Greece photos', 'Corinthian Gulf views'],
  canonical: `${SITE_URL}/gallery`,
})

export default async function GalleryPage() {
  const docs = await getGalleryItems('en')
  const cmsItems = docs.map((item: any) => ({
    src: item.imageUrl || (typeof item.image === 'object' ? item.image?.url : null) || '',
    caption: item.caption || '',
    category: item.category || 'All',
    wide: item.wide ?? false,
  })).filter((item: any) => item.src)

  return <GalleryClient cmsItems={cmsItems.length > 0 ? cmsItems : undefined} />
}
