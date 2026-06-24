import React from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'

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
  keywords: [
    'luxury hotel Corinthia Greece',
    'boutique resort Xylokastro',
    'Althea Resorts',
    'spa resort near Athens',
    'hotel Corinthian Gulf',
    'luxury hotel Greece',
  ],
})

export default function HomePage() {
  return (
    <>
      <main id="main-content">
        {/* 1. Cinematic hero */}
        <Hero />

        {/* 2. Brand introduction */}
        <BrandIntro />

        {/* 3. Rooms showcase */}
        <RoomsShowcase />

        {/* 4. Experience highlights */}
        <ExperiencesHighlight />

        {/* 5. Gastronomy */}
        <GastronomySection />

        {/* 6. Gallery preview */}
        <GalleryPreview />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. Location storytelling */}
        <LocationSection />

        {/* 9. Journal preview */}
        <JournalPreview />

        {/* 10. Direct booking reasons */}
        <DirectBookingReasons />

        {/* 11. Final booking CTA */}
        <FinalBookingCTA />
      </main>
    </>
  )
}
