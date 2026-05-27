import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { ROOMS, BOOKING_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Rooms & Suites',
  description: '41 rooms and suites across six categories at Althea Resorts, Corinthia. From Standard Doubles to the signature Loft Suite with Outdoor Jacuzzi.',
  keywords: ['Althea Resorts rooms', 'luxury suites Corinthia', 'private pool suite Greece', 'loft suite jacuzzi Greece'],
})

export default function AccommodationPage() {
  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Accommodation hero"
      >
        <Image
          src="/images/superior%20sea%20view.jpg"
          alt="Althea Resorts — Superior Sea View room"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Accommodation</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              Rooms Designed<br />
              <em className="italic font-light text-white/70">Around the View</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Intro text ── */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Every room at Althea begins with the same question: what does this guest
              need to feel completely at ease? The answer changes depending on the view
              outside the window, the size of the terrace, the depth of the pool.
              What doesn't change is the quality of what's inside. Natural materials,
              considered design, amenities by Oceanis, and the kind of stillness that
              only comes when a place has been built with genuine care.
            </p>
            <p className="text-body-refined text-lg leading-relaxed">
              From the hillside of Ano Loutro, the Corinthian Gulf sits at the edge of
              every view. The sea is always there. The rest is up to you!
            </p>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12 pt-10 border-t border-[#e8e4dd]">
              {[
                { value: '41', label: 'Rooms & Suites' },
                { value: '6', label: 'Categories' },
                { value: '22–45 m²', label: 'Room Sizes' },
                { value: '5★', label: 'Standard' },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center gap-1">
                  <span className="font-editorial text-3xl font-light text-[#102027]">{s.value}</span>
                  <span className="text-label-upper text-[#6b6b6b]">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Room sections ── */}
      {ROOMS.map((room, i) => {
        const isEven = i % 2 === 0
        const isFeatured = room.featured === true

        return (
          <section
            key={room.slug}
            id={room.slug}
            className={`${isFeatured ? 'bg-[#102027]' : i % 2 === 0 ? 'bg-white' : 'bg-[#f2f8fb]'} overflow-hidden`}
            aria-label={room.title}
          >
            <div className="container-luxury py-0">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:[direction:rtl]'}`}>

                {/* Image */}
                <ScrollReveal variant="image" className="aspect-[4/3] lg:aspect-auto lg:min-h-[600px] relative overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  {isFeatured && (
                    <div className="absolute top-6 left-6 bg-[#ad8b27] px-4 py-1.5">
                      <span className="text-label-upper text-white">Signature Suite</span>
                    </div>
                  )}
                </ScrollReveal>

                {/* Content */}
                <div className={`flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20 [direction:ltr] ${isFeatured ? 'bg-[#102027]' : ''}`}>
                  <ScrollReveal>
                    <span className="text-label-upper text-[#ad8b27] mb-6 block">{room.view}</span>
                  </ScrollReveal>
                  <ScrollReveal delay={80}>
                    <h2 className={`text-display-sm mb-3 ${isFeatured ? 'text-white' : 'text-[#102027]'}`}>
                      {room.title}
                    </h2>
                  </ScrollReveal>
                  {'tagline' in room && room.tagline && (
                    <ScrollReveal delay={100}>
                      <p className={`font-editorial text-lg font-light italic mb-4 ${isFeatured ? 'text-white/70' : 'text-[#6b6b6b]'}`}>
                        {room.tagline}
                      </p>
                    </ScrollReveal>
                  )}
                  <ScrollReveal delay={120}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`text-sm font-light ${isFeatured ? 'text-white/50' : 'text-[#6b6b6b]'}`}>
                        {room.size}
                      </span>
                      <span className={`w-px h-4 ${isFeatured ? 'bg-white/20' : 'bg-[#e8e4dd]'}`} />
                      <span className={`text-sm font-light ${isFeatured ? 'text-white/50' : 'text-[#6b6b6b]'}`}>
                        King or twin configuration
                      </span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={150}>
                    <GoldLine className="mb-6" />
                  </ScrollReveal>
                  <ScrollReveal delay={180}>
                    <p className={`text-sm font-light leading-relaxed mb-8 ${isFeatured ? 'text-white/60' : 'text-[#6b6b6b]'}`}>
                      {room.shortDesc}
                    </p>
                  </ScrollReveal>

                  {/* Features */}
                  <ScrollReveal delay={210}>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
                      {room.features.slice(0, 6).map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-[#ad8b27] shrink-0" aria-hidden="true" />
                          <span className={`text-xs font-light ${isFeatured ? 'text-white/50' : 'text-[#6b6b6b]'}`}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>

                  {/* CTAs */}
                  <ScrollReveal delay={250}>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-7 inline-flex items-center
                                   text-xs uppercase tracking-[0.2em]
                                   bg-[#ad8b27] text-white border border-[#ad8b27]
                                   hover:bg-transparent hover:text-[#ad8b27]
                                   transition-all duration-500"
                      >
                        Reserve
                      </a>
                      <a
                        href={`/accommodation/${room.slug}`}
                        className={`h-11 px-7 inline-flex items-center
                                   text-xs uppercase tracking-[0.2em]
                                   bg-transparent border transition-all duration-500
                                   ${isFeatured
                                     ? 'text-white border-white/30 hover:bg-white hover:text-[#102027]'
                                     : 'text-[#102027] border-[#102027]/30 hover:bg-[#102027] hover:text-white'
                                   }`}
                      >
                        View Details
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── All rooms include ── */}
      <section className="section-padding bg-[#faf8f4]" aria-label="All rooms include">
        <div className="container-luxury">
          <div className="text-center mb-14">
            <ScrollReveal>
              <SectionLabel className="mb-5 justify-center">Standard Across Every Room</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]">All Rooms Include</h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#e8e4dd]">
              {[
                'Free WiFi',
                'Air Conditioning',
                'Flat-screen TV',
                'Minibar',
                'Soundproofing',
                'Oceanis Amenities',
                'Daily Housekeeping',
                'Balcony or Terrace',
                'Ensuite Bathroom',
                'In-room Safe',
                '24h Reception',
                'Concierge Service',
              ].map((amenity) => (
                <div
                  key={amenity}
                  className="flex flex-col items-center text-center gap-3 p-6 bg-[#faf8f4]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-[#102027] font-light leading-tight">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
  )
}
