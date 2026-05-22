import React from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RoomCard } from '@/components/ui/RoomCard'
import { ROOMS } from '@/lib/constants'

export function RoomsShowcase() {
  const featuredRooms = ROOMS.slice(3) // Superior, Junior Suite, Loft

  return (
    <section className="section-padding bg-white" aria-label="Rooms and Suites">
      <div className="container-luxury">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-6">Accommodation</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027]">
                Rooms Designed<br />Around the View
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="text-body-refined max-w-sm lg:text-right">
              Every room begins with the same question: what does this guest
              need to feel completely at ease?
            </p>
          </ScrollReveal>
        </div>

        {/* Featured rooms — large first, then grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {featuredRooms.map((room, i) => (
            <ScrollReveal key={room.slug} delay={i * 100}>
              <RoomCard
                slug={room.slug}
                title={room.title}
                size={room.size}
                shortDesc={room.shortDesc}
                view={room.view}
                image={room.image}
                priority={i === 0}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* All rooms CTA */}
        <ScrollReveal className="flex justify-center mt-12">
          <a
            href="/accommodation"
            className="inline-flex items-center gap-3
                       text-xs uppercase tracking-[0.2em] text-[#102027]
                       border-b border-[#102027] pb-1
                       hover:text-[#ad8b27] hover:border-[#ad8b27]
                       transition-colors duration-300"
          >
            View All 6 Room Categories
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
