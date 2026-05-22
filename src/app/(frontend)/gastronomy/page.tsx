import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { BOOKING_URL, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Gastronomy',
  description: 'Food at Althea Resorts is not an afterthought. Narrativa rooftop restaurant, all-day dining, breakfast rituals, and the bar — every meal tells the story of Corinthia.',
  keywords: ['Narrativa restaurant', 'rooftop dining Corinthia', 'Greek gastronomy', 'Althea Resorts restaurant'],
  canonical: `${SITE_URL}/gastronomy`,
})

const venues = [
  {
    id: 'breakfast',
    label: 'Breakfast Ritual',
    title: 'Morning, the Greek Way',
    desc: 'Breakfast at Althea is a slow ritual. The table is set with what the season offers. Local honey, fresh bread, cheeses from nearby villages, eggs, olives, fruit picked at the right time. It is a buffet, but it doesn\'t feel like one. It feels like someone\'s kitchen, scaled up with care. There is no rush here. The morning light over the Corinthian Gulf is reason enough to linger a little longer over your second cup of coffee.',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Mediterranean breakfast spread',
    bg: 'bg-[#f7f4ef]',
  },
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
    id: 'narrativa',
    label: 'Narrativa',
    title: 'Dinner on the Roof. A Different Story Every Night.',
    desc: 'NARRATIVA is the resort\'s rooftop restaurant and its most considered space. Each evening, the menu follows a different Mediterranean story told through a Greek lens. The flavors, the music, and the atmosphere shift together, connecting cultures that were shaped and evolved around the Greek world. The panoramic views of the Corinthian Gulf are not decoration. They are part of the meal. NARRATIVA is the kind of restaurant that people come back to Althea for — not just once, but every season.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Narrativa rooftop restaurant with Gulf views',
    bg: 'bg-[#e8e4dd]',
    featured: true,
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
    desc: 'Cold drinks, light bites, the sound of water. The pool bar is where the afternoon extends itself. A coffee that becomes a cocktail, a fresh juice that turns into a long conversation. The menu is simple by design: seasonal fruit, light snacks, everything you want when you are horizontal and the sun is doing its work. No rush required. The water will wait.',
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
          alt="Narrativa — Althea Resorts rooftop restaurant"
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
              Food Here Is Not<br />
              <em className="italic font-light text-white/70">an Afterthought</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Venues */}
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
                {venue.id === 'narrativa' && (
                  <ScrollReveal delay={300}>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 h-11 px-7
                                 text-xs uppercase tracking-[0.2em]
                                 bg-[#102027] text-white border border-[#102027]
                                 hover:bg-transparent hover:text-[#102027]
                                 transition-all duration-500"
                    >
                      Reserve a Table
                    </a>
                  </ScrollReveal>
                )}
              </div>
              <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ScrollReveal variant="image" className={`relative overflow-hidden ${venue.featured ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
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
