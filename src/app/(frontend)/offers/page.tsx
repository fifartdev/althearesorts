import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import Link from 'next/link'
import { BOOKING_URL, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Stay 3, Pay 2 — Special Offer',
  description: 'Book three nights at Althea Resorts & Spa and pay for only two. A simple way to spend more time by the Corinthian Gulf, available exclusively through direct booking.',
  keywords: ['Althea Resorts offers', 'Stay 3 Pay 2 hotel offer', 'luxury resort near Athens', 'direct booking hotel Corinthia', 'free night hotel offer Greece'],
  canonical: `${SITE_URL}/offers`,
})

export default function OffersPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Offers"
      >
        <Image
          src="/images/new-images/althea-front.jpg"
          alt="Althea Resorts — hotel entrance"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Offers</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Special Offers<br />
              <em className="italic font-light text-white/70">at Althea Resorts</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* August Offer */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-5">Active Offer</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={80}>
                <span className="inline-block text-[10px] uppercase tracking-[0.2em] bg-[#ad8b27] text-white px-3 py-1.5 mb-5">
                  Book Direct &amp; Save
                </span>
              </ScrollReveal>
              <ScrollReveal delay={120}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Stay 3, Pay 2<br />
                  <em className="italic font-light text-[#102027]/60">Three Nights, Two Nights&apos; Price</em>
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={160}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-8">
                  Book three nights at Althea Resorts &amp; Spa and pay for only two. No codes, no fine print — just extra time by the Corinthian Gulf, reserved directly with us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://althearesort.reserve-online.net/?checkin=2026-10-02&rooms=1&nights=3&adults=2&offerid=59803"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-8 inline-flex items-center justify-center gap-3
                               text-xs uppercase tracking-[0.2em]
                               bg-[#ad8b27] text-white border border-[#ad8b27]
                               hover:bg-transparent hover:text-[#ad8b27]
                               transition-all duration-500"
                  >
                    Book This Offer
                    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                      <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                    </svg>
                  </a>
                  <Link
                    href="/journal/stay-3-pay-2"
                    className="h-11 px-7 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-transparent text-[#102027] border border-[#102027]
                               hover:bg-[#102027] hover:text-white
                               transition-all duration-500"
                  >
                    Read More
                  </Link>
                </div>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="/images/new-images/New-Hero.jpg"
                alt="Althea Resorts pool and resort exterior — luxury hotel near Athens, Corinthia, Greece"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <DirectBookingReasons />
    </main>
  )
}
