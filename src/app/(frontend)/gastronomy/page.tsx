import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { PHONE, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Gastronomy',
  description: 'AITHER, the rooftop restaurant of Althea Resorts — panoramic views of the Corinthian Gulf, Mediterranean cuisine told through a Greek lens. All-day dining, breakfast, bar, and pool bar.',
  keywords: ['AITHER restaurant', 'rooftop dining Corinthia', 'Greek gastronomy', 'Althea Resorts restaurant'],
  canonical: `${SITE_URL}/gastronomy`,
})

const venues = [
  {
    id: 'all-day',
    label: 'All Day Dining',
    title: 'Something Good, Any Hour You Want It',
    desc: 'Between meals, Althea keeps the kitchen open. Light plates, honest flavors, ingredients that don\'t need much done to them. Whether you come in from the pool or off the beach, there is always something worth sitting down for. The all-day menu follows the same philosophy as everything else at Althea: good produce, treated with respect, served without pretense.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'All-day dining at Althea',
    bg: 'bg-[#dde6ea]',
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    title: 'Morning, the Greek Way',
    desc: 'Breakfast at Althea is a slow ritual. The table is set with what the season offers. Local honey, fresh bread, cheeses from nearby villages, eggs, olives, fruit picked at the right time. It is a buffet, but it doesn\'t feel like one. It feels like someone\'s kitchen, scaled up with care. There is no rush here. The morning light over the Corinthian Gulf is reason enough to linger a little longer over your second cup of coffee.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Mediterranean breakfast spread',
    bg: 'bg-[#f7f4ef]',
  },
  {
    id: 'bar',
    label: 'Bar',
    title: 'The Bar at Althea',
    desc: 'Good spirits, well-made cocktails, and the kind of quiet that makes a conversation go somewhere. The selection is curated. Wines from Greek vineyards, spirits worth knowing, cocktails built with intention rather than habit. Open from late afternoon into the night, for those who are in no particular hurry and have found a good reason to stay at the table.',
    image: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Althea bar — curated spirits and cocktails',
    bg: 'bg-[#f2f8fb]',
  },
  {
    id: 'pool-bar',
    label: 'Pool Bar',
    title: 'By the Water, All Day',
    desc: 'Cold drinks, light bites, the sound of water. The pool bar is where the afternoon extends itself. A coffee that becomes a cocktail, a fresh juice that turns into a long conversation. The menu is simple by design: seasonal fruit, light snacks, everything you want when you are horizontal and the sun is doing its work. No rush required. The water will wait..',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Pool bar at Althea Resorts',
    bg: 'bg-[#dde6ea]',
  },
]

export default function GastronomyPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Gastronomy"
      >
        <Image
          src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2000&q=80"
          alt="AITHER — Althea Resorts rooftop restaurant"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Gastronomy</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              AITHER<br />
              <em className="italic font-light text-white/70">Rooftop Restaurant</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed mt-6 max-w-sm">
              Above the Gulf. Above Everything.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AITHER featured section */}
      <section id="aither" className="section-padding bg-[#e8e4dd]" aria-label="AITHER rooftop restaurant">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">AITHER</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  The Signature Restaurant<br />of Althea Resorts
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5 leading-loose">
                  The name comes from the ancient Greek word <em>Αιθήρ</em> — the pure air that
                  exists above the clouds, the luminous upper atmosphere where the gods were said
                  to breathe. A rooftop restaurant named after the highest reaches of the sky,
                  sitting above the Corinthian Gulf, open to the horizon in every direction.
                  The name earns itself every evening.
                </p>
                <p className="text-body-refined mb-5 leading-loose">
                  The kitchen works with the Mediterranean as its reference point and Greece as
                  its lens — ingredients that come from this land and this sea, prepared with
                  the kind of attention that makes a simple thing remarkable. Each evening has
                  its own character: the menu shifts, the atmosphere moves with it, and the
                  view changes as the light does. What stays constant is the quality of what
                  arrives at the table and the feeling that someone has thought carefully about
                  every part of your evening, not just the food.
                </p>
                <p className="text-body-refined mb-5 leading-loose">
                  On a clear evening, with the mountains of central Greece visible on the
                  opposite shore and the last light moving across the water, AITHER is the
                  best seat in Corinthia.
                </p>
                <p className="font-editorial text-lg font-light italic text-[#102027] mb-10">
                  "AITHER is the kind of restaurant that people come back to Althea for —
                  not just once, but every season."
                </p>
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <a
                  href={`tel:${PHONE.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Reserve a Table
                </a>
                <p className="mt-3 text-xs font-light text-[#6b6b6b]">
                  Call us at {PHONE} — reception or restaurant
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" className="aspect-[3/4] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80"
                alt="AITHER rooftop restaurant with Gulf views"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Other venues */}
      {venues.map((venue, i) => (
        <section
          key={venue.id}
          id={venue.id}
          className={`section-padding ${venue.bg}`}
          aria-label={venue.title}
        >
          <div className="container-luxury">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={i % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <ScrollReveal>
                  <SectionLabel className="mb-6">{venue.label}</SectionLabel>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="text-display-sm text-[#102027] mb-6">
                    {venue.title}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={150}>
                  <GoldLine className="mb-8" />
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-body-refined mb-8 leading-loose">
                    {venue.desc}
                  </p>
                </ScrollReveal>
              </div>
              <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ScrollReveal variant="image" className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={venue.image}
                    alt={venue.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <FinalBookingCTA />
    </main>
  )
}
