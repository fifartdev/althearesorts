import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { GalleryClient } from './GalleryClient'

export const metadata = genMeta({
  title: 'Γκαλερί',
  description: 'Φωτογραφική γκαλερί της Althea Resorts — δωμάτια και σουίτες, Ocean Spa, πισίνα, γαστρονομία, θέες στον Κορινθιακό Κόλπο. Πολυτελές boutique ξενοδοχείο στο Ξυλόκαστρο, Κορινθία.',
  keywords: ['Althea Resorts γκαλερί', 'φωτογραφίες ξενοδοχείο Κορινθία', 'πολυτελές resort Ελλάδα φωτογραφίες', 'θέα Κορινθιακός Κόλπος'],
  canonical: `${SITE_URL}/el/gallery`,
})

export default function GreekGalleryPage() {
  return <GalleryClient />
}
