import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import { BOOKING_URL, PHONE, EMAIL, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Offers & Special Rates',
  description: '10% off for all direct bookings at Althea Resorts. Opening offer valid until June 30, 2026. Book direct via our website, phone, or email for the best rate guaranteed.',
  keywords: ['Althea Resorts offers', 'hotel discount Corinthia', 'direct booking discount Greece', 'opening offer hotel'],
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
        {/* Large decorative "10%" */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-editorial text-[18vw] font-light text-white/[0.06] leading-none select-none pointer-events-none" aria-hidden="true">
          10%
        </div>
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Offers</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              A Reason to Book Now<br />
              <em className="italic font-light text-white/70">and Book Direct</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Opening Offer */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 bg-[#ad8b27] text-white px-4 py-2 mb-8">
                  <span className="text-xs uppercase tracking-[0.2em]">Opening Offer</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-md text-[#102027] mb-6">
                  10% Off for Direct Bookings
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  To mark the opening of Althea Resorts, we are offering a ten percent
                  discount on all direct reservations made through our website or by
                  contacting us directly.
                </p>
                <p className="text-body-refined mb-5">
                  This offer is available for bookings made until the end of June 2026 and
                  applies across all room categories — from the Standard Double to the
                  Althea Loft Suite with Outdoor Jacuzzi.
                </p>
                <p className="text-body-refined mb-5">
                  Booking direct also means you speak to us directly. Questions about your
                  stay, requests before arrival, specific arrangements — all handled by the
                  people who actually know the property, without a third party in between.
                </p>
                <p className="text-body-refined mb-10">
                  This is how we prefer to welcome our first guests. With a real offer
                  and a direct conversation.
                </p>
              </ScrollReveal>

              {/* Conditions */}
              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-[#102027] mb-5">Offer Conditions</h3>
                <div className="flex flex-col gap-3 mb-10">
                  {[
                    'Valid for all room categories',
                    'Direct bookings only via althearesorts.com or by phone and email',
                    'Bookings made until 30 June 2026',
                    'Cannot be combined with other promotions',
                  ].map((cond) => (
                    <div key={cond} className="flex items-start gap-3 text-sm font-light text-[#6b6b6b]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0 mt-1.5" />
                      {cond}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h3 className="text-label-upper text-[#102027] mb-5">How to Book</h3>
                <div className="flex flex-col sm:flex-row gap-4">
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
                    Book Online
                  </a>
                  <a
                    href={`tel:${PHONE.replace(/\s/g, '')}`}
                    className="h-11 px-7 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-transparent text-[#102027] border border-[#102027]
                               hover:bg-[#102027] hover:text-white
                               transition-all duration-500"
                  >
                    {PHONE}
                  </a>
                </div>
                <p className="mt-4 text-sm font-light text-[#6b6b6b]">
                  Or write to us at{' '}
                  <a href={`mailto:${EMAIL}`} className="text-[#ad8b27] hover:underline">
                    {EMAIL}
                  </a>
                </p>
              </ScrollReveal>
            </div>

            {/* Offer card */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={150}>
                <div className="bg-[#102027] p-10 text-center sticky top-32">
                  <span className="text-label-upper text-[#ad8b27] block mb-4">Opening Offer</span>
                  <div className="font-editorial text-8xl font-light text-white leading-none mb-4">
                    10%
                  </div>
                  <p className="text-sm font-light text-white/60 mb-8">
                    Off your entire stay when you book direct
                  </p>
                  <p className="text-xs font-light text-white/40 uppercase tracking-wider mb-8">
                    Valid until 30 June 2026
                  </p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-7 inline-flex items-center justify-center w-full
                               text-xs uppercase tracking-[0.2em]
                               bg-[#ad8b27] text-white border border-[#ad8b27]
                               hover:bg-transparent hover:text-[#ad8b27]
                               transition-all duration-500"
                  >
                    Claim This Offer
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <DirectBookingReasons />
    </main>
  )
}
