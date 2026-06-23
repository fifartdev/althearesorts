import React from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'

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

export default function GreekHomePage() {
  return (
    <main id="main-content">
      <Hero locale="el" />
      <BrandIntro locale="el" />
      <RoomsShowcase locale="el" />
      <ExperiencesHighlight locale="el" />
      <GastronomySection locale="el" />
      <GalleryPreview locale="el" />
      <TestimonialsSection locale="el" />
      <LocationSection locale="el" />
      <JournalPreview locale="el" />
      <DirectBookingReasons locale="el" />
      <FinalBookingCTA locale="el" />
    </main>
  )
}
