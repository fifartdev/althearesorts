import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { BOOKING_URL, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Experiences',
  description: 'The Ocean Spa, pool, activities, weddings, and corporate events at Althea Resorts, Corinthia. Ancient wellness traditions meet contemporary therapies using Oceanis cosmetics.',
  keywords: ['Ocean Spa Althea', 'spa Corinthia Greece', 'Oceanis cosmetics hotel', 'wedding venue Corinthia', 'corporate events Greece'],
  canonical: `${SITE_URL}/experiences`,
})

export default function ExperiencesPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Experiences"
      >
        <Image
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/1.jpg"
          alt="Althea Resorts — experiences and wellness"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Experiences</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              This Is What You<br />
              <em className="italic font-light text-white/70">Come Back For</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
                alt="Hiking and activities in Corinthia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Activities</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">Move at Your Own Pace</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The landscape around Althea is not a backdrop. It is part of what you
                  came for. Hiking trails wind through the Corinthian hills with views that
                  stop you mid-step. Cycling routes follow the coastline at whatever speed
                  you choose. Yoga sessions open to the air and the Gulf, the kind where
                  you actually forget to check the time.
                </p>
                <p className="text-body-refined">
                  The activities at Althea are designed for guests who want to feel the
                  place they are in, not just photograph it from a distance.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Spa Teaser */}
      <section className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80"
                alt="Ocean Spa — Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel light className="mb-6">Spa & Wellness</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-6">The Ocean Spa</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-10">
                  Sauna, hammam, ice bath, dedicated pool, yoga room, fully equipped gym,
                  and three treatment cabins. Treatments built around Oceanis — a Greek
                  brand drawn from the same sea and land that surrounds the property.
                  The Ocean Spa deserves its own story.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <a
                  href="/spa"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 hover:text-[#ad8b27] hover:border-[#ad8b27] transition-colors duration-300"
                >
                  Discover the Ocean Spa
                  <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                    <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pool */}
      <section id="pool" className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80"
                alt="Main pool at Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Swimming Pool</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">The Center of the Day</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The main pool at Althea is where the afternoon organizes itself without
                  any help from you. Clean water, natural materials, sun loungers placed
                  exactly where the light falls right, and the pool bar close enough that
                  you never have to go far for anything.
                </p>
                <p className="text-body-refined">
                  Bring a book. Leave it closed. Both are fine.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Facilities */}
      <section id="conference" className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Conference & Corporate</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Meetings That Leave a Mark
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The best corporate gatherings happen when the environment does some of
                  the work. At Althea, the conference room sits within a property that
                  reminds people why the decisions they are making together matter.
                  The Corinthian hillside, the light over the Gulf, the space to think
                  without interruption — these are not amenities. They are conditions.
                </p>
                <p className="text-body-refined mb-10">
                  Teams leave Althea with decisions made and energy restored.
                  That combination is rarer than it should be.
                </p>
              </ScrollReveal>

              {/* Configurations */}
              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-[#102027] mb-5">Room Configurations</h3>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {[
                    { layout: 'Theatre',   capacity: '100 guests' },
                    { layout: 'Classroom', capacity: '60 guests' },
                    { layout: 'U-Shape',   capacity: '40 guests' },
                    { layout: 'Boardroom', capacity: '30 guests' },
                  ].map((c) => (
                    <div key={c.layout} className="border border-[#e8e4dd] p-4">
                      <span className="text-xs uppercase tracking-[0.18em] text-[#ad8b27] block mb-1">{c.layout}</span>
                      <span className="font-editorial text-2xl font-light text-[#102027]">{c.capacity}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Equipment */}
              <ScrollReveal delay={300}>
                <h3 className="text-label-upper text-[#102027] mb-5">Equipment & Services</h3>
                <div className="flex flex-col gap-2 mb-10">
                  {[
                    'High-definition projector & screens',
                    'Wireless microphones & PA system',
                    'High-speed dedicated Wi-Fi',
                    'Flip charts, whiteboards & stationery',
                    'Catering & coffee breaks on request',
                    'Breakout spaces & terrace access',
                    'AV technical support',
                    'Accommodation packages for delegates',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-light text-[#6b6b6b]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <a
                  href={`mailto:reservations@althearesorts.com?subject=Corporate Event Enquiry`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Enquire About Corporate Events
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=900&q=80"
                alt="Conference facilities — Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section id="weddings" className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"
                alt="Wedding venue — Althea Resorts Corinthia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Weddings</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  A Wedding in Corinthia
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  There are wedding venues, and then there are places where a wedding
                  actually belongs. Althea is the second kind. The hills of Corinthia,
                  the light over the Gulf at that particular hour of the evening, the air
                  that carries something warm and unhurried — no decorator can manufacture
                  any of it.
                </p>
                <p className="text-body-refined mb-10">
                  Every detail is handled by the people who know this property. From the
                  first site visit to the last toast, you are working with a team that
                  cares how it goes — not just that it happens.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <a
                  href={`mailto:reservations@althearesorts.com?subject=Wedding Enquiry`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Enquire About Weddings
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
  )
}
