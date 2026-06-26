import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/seo'
import { getGalleryItems } from '@/lib/cms'
import { GalleryClient } from './GalleryClient'

export const metadata = genMeta({
  title: 'Γκαλερί',
  description: 'Φωτογραφική γκαλερί της Althea Resorts — δωμάτια και σουίτες, Ocean Spa, πισίνα, γαστρονομία, θέες στον Κορινθιακό Κόλπο. Πολυτελές boutique ξενοδοχείο στο Ξυλόκαστρο, Κορινθία.',
  keywords: ['Althea Resorts γκαλερί', 'φωτογραφίες ξενοδοχείο Κορινθία', 'πολυτελές resort Ελλάδα φωτογραφίες', 'θέα Κορινθιακός Κόλπος'],
  canonical: `${SITE_URL}/el/gallery`,
})

export default async function GreekGalleryPage() {
  const docs = await getGalleryItems('el')
  const cmsItems = docs.map((item: any) => ({
    src: item.imageUrl || (typeof item.image === 'object' ? item.image?.url : null) || '',
    caption: item.caption || '',
    category: item.category || 'Όλες',
    wide: item.wide ?? false,
  })).filter((item: any) => item.src)
  return <GalleryClient cmsItems={cmsItems.length > 0 ? cmsItems : undefined} />
}
