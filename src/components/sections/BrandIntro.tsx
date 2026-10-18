import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { getPage } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'
import { splitParagraphs } from '@/lib/wp/text'

type Locale = 'en' | 'el'

export async function BrandIntro({ locale = 'en' }: { locale?: Locale }) {
  const c = (await getPage('home')).brand_intro
  const paragraphs = splitParagraphs(c.paragraphs[locale])

  return (
    <section className="section-padding bg-[#f2f8fb]" aria-label="About Althea Resorts">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — editorial text block */}
          <div className="lg:col-span-5">
            <ScrollReveal>
              <SectionLabel className="mb-8">{c.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-lg text-[#102027] mb-8">
                <Rich html={c.heading[locale]} classes={{ em: 'italic font-light' }} />
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <GoldLine className="mb-8" />
            </ScrollReveal>
            <ScrollReveal delay={300}>
              {paragraphs.map((p, i) => (
                <p key={i} className={`text-body-refined leading-relaxed ${i === paragraphs.length - 1 ? 'mb-10' : 'mb-6'}`}>
                  <Rich html={p} />
                </p>
              ))}
            </ScrollReveal>
            <ScrollReveal delay={400}>
              <a
                href={locale === 'el' ? '/el/about' : '/about'}
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#102027] hover:text-[#ad8b27] transition-colors duration-300"
              >
                {c.link_label[locale]}
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          </div>

          {/* Right — image composition */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-6">
            <ScrollReveal variant="image" className="col-span-1 aspect-[3/4] relative overflow-hidden">
              <Image
                src={c.image?.url ?? ''}
                alt={c.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </ScrollReveal>
            <div className="col-span-1 flex flex-col gap-4 lg:gap-6 pt-12">
              <ScrollReveal variant="image" className="aspect-square relative overflow-hidden">
                <Image
                  src={c.image2?.url ?? ''}
                  alt={c.image2_alt[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </ScrollReveal>
              <ScrollReveal variant="fade" delay={200}>
                <div className="bg-[#102027] p-6 flex flex-col gap-3">
                  <span className="text-label-upper text-[#ad8b27]">{c.card_label[locale]}</span>
                  <p className="font-editorial text-lg font-light text-white/90 leading-snug">
                    <Rich html={c.card_quote[locale]} classes={{ em: 'italic' }} />
                  </p>
                  <p className="text-xs font-light text-white/50 whitespace-pre-line">
                    {c.card_sub[locale]}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
