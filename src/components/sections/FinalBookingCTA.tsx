import React from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { getPage, getSettings } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'

type Locale = 'en' | 'el'

export async function FinalBookingCTA({ locale = 'en' }: { locale?: Locale }) {
  const [shared, settings] = await Promise.all([getPage('shared'), getSettings()])
  const c = shared.final_cta

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
          {c.watermark}
        </span>
      </div>

      <div className="relative z-10 container-narrow text-center">
        <ScrollReveal>
          <span className="text-label-upper text-[#ad8b27] block mb-6">
            {c.eyebrow[locale]}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-display-lg text-[#102027] mb-6">
            <Rich html={c.heading[locale]} />
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-body-refined text-center max-w-md mx-auto mb-12">
            {c.body[locale]}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={settings.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-10 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-[#102027] text-white border border-[#102027]
                         hover:bg-transparent hover:text-[#102027]
                         transition-all duration-500"
            >
              {c.cta1[locale]}
            </a>
            <a
              href={locale === 'el' ? '/el/offers' : '/offers'}
              className="h-12 px-10 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-transparent text-[#102027] border border-[#102027]
                         hover:bg-[#102027] hover:text-white
                         transition-all duration-500"
            >
              {c.cta2[locale]}
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  )
}
