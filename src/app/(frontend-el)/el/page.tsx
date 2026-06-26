import React from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getRooms, getJournalPosts } from '@/lib/cms'

import { Hero } from '@/components/sections/Hero'
import { BrandIntro } from '@/components/sections/BrandIntro'
import { RoomsShowcase } from '@/components/sections/RoomsShowcase'
import { ExperiencesHighlight } from '@/components/sections/ExperiencesHighlight'
import { GastronomySection } from '@/components/sections/GastronomySection'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { JournalPreview } from '@/components/sections/JournalPreview'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'

export const metadata = genMeta({
  title: 'Πολυτελές Boutique Resort στην Κορινθία',
  description: 'Althea Resorts — Πολυτελές boutique resort στον λόφο του Άνω Λουτρού, κοντά στο Ξυλόκαστρο, Κορινθία. 60 λεπτά από Αθήνα. 41 δωμάτια και σουίτες με θέα στον Κορινθιακό Κόλπο.',
  keywords: ['πολυτελές ξενοδοχείο Κορινθία', 'resort Ξυλόκαστρο', 'Althea Resorts Ελλάδα', 'boutique hotel Κορινθία'],
  canonical: `${SITE_URL}/el`,
})

export default async function GreekHomePage() {
  const [roomDocs, journalDocs] = await Promise.all([getRooms('el'), getJournalPosts('el', 3)])

  const cmsRooms = roomDocs.length > 0
    ? roomDocs.slice(3, 6).map((r: any) => ({
        slug: r.slug ?? '',
        title: r.title ?? '',
        size: r.size ?? '',
        shortDesc: r.shortDescription ?? '',
        view: r.viewType ?? '',
        image: (typeof r.heroImage === 'object' ? r.heroImage?.url : r.heroImage) || r.imageUrl || '',
      })).filter((r: any) => r.image)
    : undefined

  const cmsPosts = journalDocs.length > 0
    ? journalDocs.map((p: any) => ({
        category: p.category ?? '',
        title: p.title ?? '',
        excerpt: p.excerpt ?? '',
        readTime: p.readingTime ? `${p.readingTime} λεπτά ανάγνωση` : '',
        href: `/el/journal/${p.slug}`,
        image: (typeof p.heroImage === 'object' ? p.heroImage?.url : p.heroImage) || p.imageUrl || '',
        imageAlt: p.title ?? '',
      })).filter((p: any) => p.image)
    : undefined

  return (
    <main id="main-content">
      <Hero locale="el" />
      <BrandIntro locale="el" />
      <RoomsShowcase locale="el" rooms={cmsRooms} />
      <ExperiencesHighlight locale="el" />
      <GastronomySection locale="el" />
      <GalleryPreview locale="el" />
      <TestimonialsSection locale="el" />
      <LocationSection locale="el" />
      <JournalPreview locale="el" posts={cmsPosts} />
      <DirectBookingReasons locale="el" />
      <FinalBookingCTA locale="el" />
    </main>
  )
}
