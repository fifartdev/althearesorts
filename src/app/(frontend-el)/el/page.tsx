import React from 'react'
import { pageMetadata } from '@/lib/wp/metadata'

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

export async function generateMetadata() {
  return pageMetadata('home', 'el', '/el')
}

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
