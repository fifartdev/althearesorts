import React from 'react'
import { generateMetadata as genMeta } from '@/lib/seo'
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
  keywords: [
    'luxury hotel Corinthia Greece',
    'boutique resort Xylokastro',
    'Althea Resorts',
    'spa resort near Athens',
    'hotel Corinthian Gulf',
    'luxury hotel Greece',
  ],
})

export default async function HomePage() {
  const [roomDocs, journalDocs] = await Promise.all([getRooms('en'), getJournalPosts('en', 3)])

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
        readTime: p.readingTime ? `${p.readingTime} min read` : '',
        href: `/journal/${p.slug}`,
        image: (typeof p.heroImage === 'object' ? p.heroImage?.url : p.heroImage) || p.imageUrl || '',
        imageAlt: p.title ?? '',
      })).filter((p: any) => p.image)
    : undefined

  return (
    <>
      <main id="main-content">
        {/* 1. Cinematic hero */}
        <Hero />

        {/* 2. Brand introduction */}
        <BrandIntro />

        {/* 3. Rooms showcase */}
        <RoomsShowcase rooms={cmsRooms} />

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
        <JournalPreview posts={cmsPosts} />

        {/* 10. Direct booking reasons */}
        <DirectBookingReasons />

        {/* 11. Final booking CTA */}
        <FinalBookingCTA />
      </main>
    </>
  )
}
