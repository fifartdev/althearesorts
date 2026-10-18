import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { getPage } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'
import { splitParagraphs } from '@/lib/wp/text'

type Locale = 'en' | 'el'

export async function LocationSection({ locale = 'en' }: { locale?: Locale }) {
  const c = (await getPage('home')).location
  const paragraphs = splitParagraphs(c.paragraphs[locale])

  return (
    <section
      className="relative section-padding overflow-hidden"
      aria-label="Location — Corinthia, Greece"
    >
      <div className="absolute inset-0 bg-[#102027]" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[20vw] font-light text-white/[0.03] leading-none select-none pointer-events-none" aria-hidden="true">
        {c.watermark}
      </div>

      <div className="relative z-10 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal>
              <SectionLabel light className="mb-8">{c.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-white mb-8">
                <Rich html={c.heading[locale]} classes={{ em: 'italic font-light text-white/70' }} />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              {paragraphs.map((p, i) => (
                <p key={i} className={`text-sm font-light text-white/50 leading-relaxed ${i === paragraphs.length - 1 ? 'mb-10' : 'mb-6'}`}><Rich html={p} /></p>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {c.facts.map((fact) => (
                  <div key={fact.label[locale]} className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <span className="font-editorial text-3xl font-light text-white">{fact.value}</span>
                    <span className="text-label-upper text-white/40">{fact.label[locale]}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <a
                href={locale === 'el' ? '/el/location' : '/location'}
                className="inline-flex items-center gap-3
                           text-xs uppercase tracking-[0.2em] text-white/60
                           border-b border-white/20 pb-1
                           hover:text-white hover:border-white
                           transition-colors duration-300"
              >
                {c.cta[locale]}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          </div>

          <ScrollReveal variant="image" className="aspect-square lg:aspect-[4/5] w-full relative overflow-hidden">
            <Image
              src={c.image?.url ?? ''}
              alt={c.image_alt[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-[#102027]/20" />
            <div className="absolute bottom-6 left-6">
              <span className="text-label-upper text-white/70">{c.image_caption[locale]}</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
