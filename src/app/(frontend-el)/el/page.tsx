import React from 'react'
import { generateMetadata as genMeta, SITE_URL } from '@/lib/seo'
import { getRooms, getJournalPosts, getSiteSettings, getBookingSettings, getExperiences, getDining } from '@/lib/cms'

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
  const [roomDocs, journalDocs, siteSettings, bookingSettings, experienceDocs, diningDocs] = await Promise.all([
    getRooms('el'),
    getJournalPosts('el', 3),
    getSiteSettings(),
    getBookingSettings(),
    getExperiences('el'),
    getDining('el'),
  ])

  const s = siteSettings as any
  const b = bookingSettings as any

  const heroImageRaw = s?.heroImage
  const heroImage: string | undefined =
    typeof heroImageRaw === 'object' ? heroImageRaw?.url : heroImageRaw || undefined

  const heroStats = [
    s?.heroStat1Value && s?.heroStat1Label ? { value: s.heroStat1Value, label: s.heroStat1Label } : null,
    s?.heroStat2Value && s?.heroStat2Label ? { value: s.heroStat2Value, label: s.heroStat2Label } : null,
    s?.heroStat3Value && s?.heroStat3Label ? { value: s.heroStat3Value, label: s.heroStat3Label } : null,
  ].filter(Boolean) as { value: string; label: string }[]

  const bookingUrl: string | undefined = b?.bookingEngineUrl || undefined

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

  const cmsExperiences = experienceDocs.length > 0
    ? experienceDocs.slice(0, 3).map((e: any) => ({
        label: e.category ?? '',
        title: e.title ?? '',
        desc: e.shortDescription ?? '',
        href: `/el/experiences#${e.slug ?? e.category ?? ''}`,
        image: (typeof e.heroImage === 'object' ? e.heroImage?.url : e.heroImage) || '',
        imageAlt: e.title ?? '',
      })).filter((e: any) => e.image)
    : undefined

  const gastronomyVenues = diningDocs.length > 0
    ? diningDocs.map((d: any) => d.name ?? d.title ?? '').filter(Boolean)
    : undefined

  const gastronomyImage = diningDocs.length > 0
    ? ((typeof diningDocs[0]?.heroImage === 'object' ? diningDocs[0].heroImage?.url : diningDocs[0]?.heroImage) || diningDocs[0]?.imageUrl || undefined)
    : undefined

  const directReasons = b?.reasons?.length > 0
    ? (b.reasons as any[]).map((r: any) => ({ title: r.title ?? '', body: r.body ?? '' })).filter((r: any) => r.title)
    : undefined

  const brandIntroImage1Raw = s?.brandIntroImage1
  const brandIntroImage1: string | undefined = typeof brandIntroImage1Raw === 'object' ? brandIntroImage1Raw?.url : brandIntroImage1Raw || undefined
  const brandIntroImage2Raw = s?.brandIntroImage2
  const brandIntroImage2: string | undefined = typeof brandIntroImage2Raw === 'object' ? brandIntroImage2Raw?.url : brandIntroImage2Raw || undefined

  const gastronomyImageResolved: string | undefined = (() => {
    const raw = s?.gastronomyImage
    return typeof raw === 'object' ? raw?.url : raw || gastronomyImage || undefined
  })()

  return (
    <main id="main-content">
      <Hero
        locale="el"
        heroImage={heroImage}
        headline1={s?.heroHeadline1 || undefined}
        headline2={s?.heroHeadline2 || undefined}
        tagline={s?.heroTagline || undefined}
        locationLabel={s?.heroLocationLabel || undefined}
        scrollLabel={s?.heroScrollLabel || undefined}
        cta1Label={s?.heroCta1Label || undefined}
        cta1Url={bookingUrl}
        cta2Label={s?.heroCta2Label || undefined}
        cta2Href={s?.heroCta2Label ? '/el/accommodation' : undefined}
        stats={heroStats}
      />
      <BrandIntro
        locale="el"
        label={s?.brandIntroLabel || undefined}
        headline1={s?.brandIntroHeadline1 || undefined}
        headline2={s?.brandIntroHeadline2 || undefined}
        body1={s?.brandIntroBody1 || undefined}
        body2={s?.brandIntroBody2 || undefined}
        linkLabel={s?.brandIntroLinkLabel || undefined}
        cardLabel={s?.brandIntroCardLabel || undefined}
        cardLine1={s?.brandIntroCardLine1 || undefined}
        cardLine2={s?.brandIntroCardLine2 || undefined}
        cardSub={s?.brandIntroCardSub || undefined}
        image1={brandIntroImage1}
        image2={brandIntroImage2}
      />
      <RoomsShowcase locale="el" rooms={cmsRooms} />
      <ExperiencesHighlight
        locale="el"
        label={s?.expHighlightLabel || undefined}
        headline1={s?.expHighlightHeadline1 || undefined}
        headline2={s?.expHighlightHeadline2 || undefined}
        subtext={s?.expHighlightSubtext || undefined}
        discoverLabel={s?.expHighlightDiscoverLabel || undefined}
        experiences={cmsExperiences}
      />
      <GastronomySection
        locale="el"
        label={s?.gastronomyLabel || undefined}
        headline1={s?.gastronomyHeadline1 || undefined}
        headline2={s?.gastronomyHeadline2 || undefined}
        cardQuote={s?.gastronomyCardQuote || undefined}
        cardLabel={undefined}
        body1={s?.gastronomyBody1 || undefined}
        body2={s?.gastronomyBody2 || undefined}
        venues={gastronomyVenues}
        cta={s?.gastronomyCtaLabel || undefined}
        image={gastronomyImageResolved}
      />
      <GalleryPreview
        locale="el"
        label={s?.galleryLabel || undefined}
        headline={s?.galleryHeadline || undefined}
        ctaLabel={s?.galleryCtaLabel || undefined}
      />
      <TestimonialsSection locale="el" />
      <LocationSection locale="el" />
      <JournalPreview
        locale="el"
        label={s?.journalLabel || undefined}
        headline1={s?.journalHeadline1 || undefined}
        headline2={s?.journalHeadline2 || undefined}
        ctaLabel={s?.journalCtaLabel || undefined}
        posts={cmsPosts}
      />
      <DirectBookingReasons
        label={b?.directBookingLabel || undefined}
        headline1={b?.directBookingHeadline1 || undefined}
        headline2={b?.directBookingHeadline2 || undefined}
        intro={b?.directBookingIntro || undefined}
        ctaLabel={b?.directBookingCtaLabel || undefined}
        reasons={directReasons}
        bookingUrl={bookingUrl}
      />
      <FinalBookingCTA locale="el" />
    </main>
  )
}
