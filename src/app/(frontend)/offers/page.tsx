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
  title: 'Offers & Special Rates',
  description: 'No active offers at this time. Book directly with Althea Resorts for the best available rate — no intermediaries, no platform fees.',
  keywords: ['Althea Resorts offers', 'hotel special rates Corinthia', 'direct booking Greece', 'best rate hotel'],
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
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/althea-exclusive-resorts-spa-9.png"
          alt="Althea Resorts — special offers"
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

      {/* No Active Offers */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              There are no active offers at this time. Please check back soon — we
              occasionally release exclusive promotions and seasonal rates for guests
              who book directly with us.
            </p>
            <p className="font-editorial text-xl font-light italic text-[#102027] mb-10">
              Booking direct always gives you the best available rate.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 px-7 inline-flex items-center justify-center
                           text-xs uppercase tracking-[0.2em]
                           bg-[#102027] text-white border border-[#102027]
                           hover:bg-transparent hover:text-[#102027]
                           transition-all duration-500"
              >
                Book Now
              </a>
              <Link
                href="/contact"
                className="h-11 px-7 inline-flex items-center justify-center
                           text-xs uppercase tracking-[0.2em]
                           bg-transparent text-[#102027] border border-[#102027]
                           hover:bg-[#102027] hover:text-white
                           transition-all duration-500"
              >
                Contact Us
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DirectBookingReasons />
    </main>
  )
}
