import React from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { BOOKING_URL } from '@/lib/constants'

type Locale = 'en' | 'el'

const content = {
  en: {
    eyebrow: 'Reserve Your Stay',
    headlineLine1: 'Sixty Minutes',
    headlineLine2: 'From Athens',
    body: 'Close enough to be spontaneous. Far enough to feel completely removed from the city you left behind.',
    cta1: 'Book Now',
    cta2: 'View Offers',
    offersHref: '/offers',
  },
  el: {
    eyebrow: 'Κλείστε τη Διαμονή σας',
    headlineLine1: 'Εξήντα λεπτά',
    headlineLine2: 'από Αθήνα',
    body: 'Αρκετά κοντά για να είναι αυθόρμητο. Αρκετά μακριά για να αισθανθείτε τελείως αλλού.',
    cta1: 'Κάντε Κράτηση',
    cta2: 'Δείτε Προσφορές',
    offersHref: '/el/offers',
  },
}

export function FinalBookingCTA({ locale = 'en' }: { locale?: Locale }) {
  const c = content[locale]

  return (
    <section
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-label="Book your stay"
    >
      <div className="absolute inset-0 bg-[#f7f4ef]" />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-editorial text-[18vw] font-light text-[#e8e4dd] leading-none">
          Althea
        </span>
      </div>

      <div className="relative z-10 container-narrow text-center">
        <ScrollReveal>
          <span className="text-label-upper text-[#ad8b27] block mb-6">
            {c.eyebrow}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-display-lg text-[#102027] mb-6">
            {c.headlineLine1}<br />
            {c.headlineLine2}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-body-refined text-center max-w-md mx-auto mb-12">
            {c.body}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-10 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-[#102027] text-white border border-[#102027]
                         hover:bg-transparent hover:text-[#102027]
                         transition-all duration-500"
            >
              {c.cta1}
            </a>
            <a
              href={c.offersHref}
              className="h-12 px-10 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-transparent text-[#102027] border border-[#102027]
                         hover:bg-[#102027] hover:text-white
                         transition-all duration-500"
            >
              {c.cta2}
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
