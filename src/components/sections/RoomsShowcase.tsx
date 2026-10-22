import React from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RoomCard } from '@/components/ui/RoomCard'
import { getItems, getPage, tr } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { Rich } from '@/lib/wp/Rich'

type Locale = 'en' | 'el'

export async function RoomsShowcase({ locale = 'en' }: { locale?: Locale }) {
  const labels = await getLabels('home', locale)
  const [home, rooms, shared] = await Promise.all([getPage('home'), getItems('althea_room'), getPage('shared')])
  const featuredRooms = rooms.slice(3)
  const c = home.rooms_showcase

  return (
    <section className="section-padding bg-white" aria-label={labels.rooms}>
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-6">{c.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027]">
                <Rich html={c.heading[locale]} />
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="text-body-refined max-w-sm lg:text-right">
              {c.body[locale]}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {featuredRooms.map((room, i) => {
            const f = room.fields
            return (
              <ScrollReveal key={room.slug} delay={i * 100}>
                <RoomCard
                  slug={room.slug}
                  href={locale === 'el' ? `/el/accommodation/${room.slug}` : undefined}
                  title={room.title}
                  size={f.size}
                  shortDesc={tr(f.short_desc, locale)}
                  view={tr(f.view, locale)}
                  image={room.image?.url ?? ''}
                  priority={i === 0}
                  locale={locale}
                  discoverLabel={shared.room_card.discover[locale]}
                />
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="flex justify-center mt-12">
          <a
            href={locale === 'el' ? '/el/accommodation' : '/accommodation'}
            className="inline-flex items-center gap-3
                       text-xs uppercase tracking-[0.2em] text-[#102027]
                       border-b border-[#102027] pb-1
                       hover:text-[#ad8b27] hover:border-[#ad8b27]
                       transition-colors duration-300"
          >
            {c.cta[locale]}
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
