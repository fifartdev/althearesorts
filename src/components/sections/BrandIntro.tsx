import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'

type Locale = 'en' | 'el'

type BrandIntroProps = {
  locale?: Locale
  label?: string
  headline1?: string
  headline2?: string
  body1?: string
  body2?: string
  linkLabel?: string
  linkHref?: string
  cardLabel?: string
  cardLine1?: string
  cardLine2?: string
  cardSub?: string
  image1?: string
  image2?: string
}

export function BrandIntro({
  locale = 'en',
  label,
  headline1,
  headline2,
  body1,
  body2,
  linkLabel,
  linkHref,
  cardLabel,
  cardLine1,
  cardLine2,
  cardSub,
  image1,
  image2,
}: BrandIntroProps) {
  if (!headline1 && !body1) return null

  const aboutHref = linkHref || (locale === 'el' ? '/el/about' : '/about')

  return (
    <section className="section-padding bg-soft" aria-label="About Althea Resorts">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — editorial text block */}
          <div className="lg:col-span-5">
            {label && (
              <ScrollReveal>
                <SectionLabel className="mb-8">{label}</SectionLabel>
              </ScrollReveal>
            )}
            {headline1 && (
              <ScrollReveal delay={100}>
                <h2 className="text-display-lg text-deep mb-8">
                  {headline1}<br />
                  {headline2 && <em className="italic font-light">{headline2}</em>}
                </h2>
              </ScrollReveal>
            )}
            <ScrollReveal delay={200}>
              <GoldLine className="mb-8" />
            </ScrollReveal>
            {(body1 || body2) && (
              <ScrollReveal delay={300}>
                {body1 && <p className="text-body-refined leading-relaxed mb-6">{body1}</p>}
                {body2 && <p className="text-body-refined leading-relaxed mb-10">{body2}</p>}
              </ScrollReveal>
            )}
            {linkLabel && (
              <ScrollReveal delay={400}>
                <a
                  href={aboutHref}
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-deep hover:text-gold transition-colors duration-300"
                >
                  {linkLabel}
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                    <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </a>
              </ScrollReveal>
            )}
          </div>

          {/* Right — image composition */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 lg:gap-6">
            <ScrollReveal variant="image" className="col-span-1 aspect-[3/4] relative overflow-hidden">
              {image1 ? (
                <Image
                  src={image1}
                  alt="Althea Resorts — pool and hillside"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-deep/10" />
              )}
            </ScrollReveal>
            <div className="col-span-1 flex flex-col gap-4 lg:gap-6 pt-12">
              <ScrollReveal variant="image" className="aspect-square relative overflow-hidden">
                {image2 ? (
                  <Image
                    src={image2}
                    alt="Althea Resorts — Corinthian Gulf view"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full bg-deep/10" />
                )}
              </ScrollReveal>
              {(cardLabel || cardLine1) && (
                <ScrollReveal variant="fade" delay={200}>
                  <div className="bg-deep p-6 flex flex-col gap-3">
                    {cardLabel && <span className="text-label-upper text-gold">{cardLabel}</span>}
                    {cardLine1 && (
                      <p className="font-editorial text-lg font-light text-white/90 leading-snug">
                        {cardLine1}<br />
                        {cardLine2 && <em className="italic">{cardLine2}</em>}
                      </p>
                    )}
                    {cardSub && (
                      <p className="text-xs font-light text-white/50 whitespace-pre-line">
                        {cardSub}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
