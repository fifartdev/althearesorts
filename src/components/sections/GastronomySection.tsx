import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { getPage } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { Rich } from '@/lib/wp/Rich'
import { splitLines, splitParagraphs } from '@/lib/wp/text'

type Locale = 'en' | 'el'

export async function GastronomySection({ locale = 'en' }: { locale?: Locale }) {
  const labels = await getLabels('home', locale)
  const c = (await getPage('home')).gastronomy
  const paragraphs = splitParagraphs(c.paragraphs[locale])

  return (
    <section className="section-padding bg-[#faf8f4]" aria-label={labels.gastronomy}>
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="order-2 lg:order-1">
            <ScrollReveal variant="image" className="aspect-[3/4] w-full relative overflow-hidden">
              <Image
                src={c.image?.url ?? ''}
                alt={c.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute -right-6 -bottom-6 bg-[#102027] p-6 w-56 hidden lg:block z-10">
                <p className="font-editorial text-lg font-light text-white/90 leading-snug mb-2 whitespace-pre-line">
                  {c.card_quote[locale]}
                </p>
                <span className="text-label-upper text-[#ad8b27]">{c.card_label[locale]}</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <ScrollReveal>
              <SectionLabel className="mb-8">{c.label[locale]}</SectionLabel>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-[#102027] mb-8">
                <Rich html={c.heading[locale]} classes={{ em: 'italic font-light' }} />
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <GoldLine className="mb-8" />
            </ScrollReveal>

            <ScrollReveal delay={200}>
              {paragraphs.map((p, i) => (
                <p key={i} className={`text-body-refined ${i === paragraphs.length - 1 ? 'mb-10' : 'mb-6'}`}><Rich html={p} /></p>
              ))}
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="flex flex-col gap-4 mb-10">
                {splitLines(c.venues[locale]).map((v) => (
                  <div key={v} className="flex items-center gap-4 py-3 border-b border-[#e8e4dd]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27]" aria-hidden="true" />
                    <span className="text-sm uppercase tracking-widest text-[#102027] font-light">{v}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <a
                href={locale === 'el' ? '/el/gastronomy' : '/gastronomy'}
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
        </div>
      </div>
    </section>
  )
}
