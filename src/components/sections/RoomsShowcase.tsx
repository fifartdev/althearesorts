import React from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RoomCard } from '@/components/ui/RoomCard'
import { ROOMS } from '@/lib/constants'

type Locale = 'en' | 'el'

const content = {
  en: {
    label: 'Accommodation',
    headlineLine1: 'Rooms Designed',
    headlineLine2: 'Around the View',
    body: 'Every room begins with the same question: what does this guest need to feel completely at ease?',
    cta: 'View All 6 Room Categories',
    ctaHref: '/accommodation',
  },
  el: {
    label: 'Διαμονή',
    headlineLine1: 'Δωμάτια Σχεδιασμένα',
    headlineLine2: 'Γύρω από τη Θέα',
    body: 'Κάθε δωμάτιο στο Althea ξεκινά με την ίδια ερώτηση: τι χρειάζεται ο επισκέπτης για να νιώσει απόλυτα άνετα;',
    cta: 'Δείτε όλες τις κατηγορίες δωματίων',
    ctaHref: '/el/accommodation',
  },
}

const greekRoomData: Record<string, { title: string; shortDesc: string; view: string }> = {
  'superior-sea-view': {
    title: 'Superior Sea View',
    shortDesc: 'Η πιο ευρύχωρη κατηγορία δωματίου στο Althea, σχεδιασμένη γύρω από ένα και μόνο στοιχείο: τη θέα. Μια μεγάλη ιδιωτική βεράντα αντικρίζει τον Κορινθιακό κόλπο χωρίς τίποτα να κρύβει τον ορίζοντα.',
    view: 'Θέα Θάλασσα',
  },
  'junior-suite-private-pool': {
    title: 'Junior Suite with Private Pool',
    shortDesc: 'Η Junior Suite αναβαθμίζει τη διαμονή σε κάθε επίπεδο. High-end φινιρίσματα, ιδιωτική πισίνα και η άνεση χώρου που θα σας κάνει να αναβάλετε τα σχέδιά σας για να μείνετε στο δωμάτιο περισσότερο από όσο υπολογίζατε!',
    view: 'Ιδιωτική Πισίνα & Θέα',
  },
  'althea-loft-suite': {
    title: 'Althea Loft Suite Outdoor Jacuzzi',
    shortDesc: 'Δύο επίπεδα. Ένα υπνοδωμάτιο στον επάνω όροφο που λούζεται από το φως του ουρανού. Καθηλωτική θέα στον Κορινθιακό κόλπο. Και έξω, ένα ιδιωτικό jacuzzi που μετατρέπει το βράδυ σε μια προσμονή που διαρκεί όλη μέρα.',
    view: 'Πανοραμική Θέα & Εξωτερικό Jacuzzi',
  },
}

export function RoomsShowcase({ locale = 'en' }: { locale?: Locale }) {
  const featuredRooms = ROOMS.slice(3)
  const c = content[locale]

  return (
    <section className="section-padding bg-white" aria-label="Rooms and Suites">
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <SectionLabel className="mb-6">{c.label}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027]">
                {c.headlineLine1}<br />
                {c.headlineLine2}
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="text-body-refined max-w-sm lg:text-right">
              {c.body}
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {featuredRooms.map((room, i) => {
            const gr = locale === 'el' ? greekRoomData[room.slug] : null
            return (
              <ScrollReveal key={room.slug} delay={i * 100}>
                <RoomCard
                  slug={room.slug}
                  href={locale === 'el' ? `/el/accommodation/${room.slug}` : undefined}
                  title={gr?.title ?? room.title}
                  size={room.size}
                  shortDesc={gr?.shortDesc ?? room.shortDesc}
                  view={gr?.view ?? room.view}
                  image={room.image}
                  priority={i === 0}
                  locale={locale}
                />
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal className="flex justify-center mt-12">
          <a
            href={c.ctaHref}
            className="inline-flex items-center gap-3
                       text-xs uppercase tracking-[0.2em] text-[#102027]
                       border-b border-[#102027] pb-1
                       hover:text-[#ad8b27] hover:border-[#ad8b27]
                       transition-colors duration-300"
          >
            {c.cta}
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
