import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'

type Locale = 'en' | 'el'

type GastronomySectionProps = {
  locale?: Locale
  label?: string
  headline1?: string
  headline2?: string
  cardQuote?: string
  cardLabel?: string
  body1?: string
  body2?: string
  venues?: string[]
  cta?: string
  ctaHref?: string
  image?: string
}

export function GastronomySection({
  locale = 'en',
  label,
  headline1,
  headline2,
  cardQuote,
  cardLabel,
  body1,
  body2,
  venues,
  cta,
  ctaHref,
  image,
}: GastronomySectionProps) {
  if (!headline1 && !body1 && !venues?.length) return null

  const href = ctaHref || (locale === 'el' ? '/el/gastronomy' : '/gastronomy')

  return (
    <section className="section-padding bg-cream" aria-label="Gastronomy at Althea Resorts">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="order-2 lg:order-1">
            <ScrollReveal variant="image" className="aspect-3/4 w-full relative overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt="AITHER — Althea Resorts rooftop restaurant"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-deep/10" />
              )}
              {(cardQuote || cardLabel) && (
                <div className="absolute -right-6 -bottom-6 bg-deep p-6 w-56 hidden lg:block z-10">
                  {cardQuote && (
                    <p className="font-editorial text-lg font-light text-white/90 leading-snug mb-2 whitespace-pre-line">
                      {cardQuote}
                    </p>
                  )}
                  {cardLabel && <span className="text-label-upper text-gold">{cardLabel}</span>}
                </div>
              )}
            </ScrollReveal>
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            {label && (
              <ScrollReveal>
                <SectionLabel className="mb-8">{label}</SectionLabel>
              </ScrollReveal>
            )}

            {headline1 && (
              <ScrollReveal delay={100}>
                <h2 className="text-display-md text-deep mb-8">
                  {headline1}<br />
                  {headline2 && <em className="italic font-light">{headline2}</em>}
                </h2>
              </ScrollReveal>
            )}

            <ScrollReveal delay={150}>
              <GoldLine className="mb-8" />
            </ScrollReveal>

            {(body1 || body2) && (
              <ScrollReveal delay={200}>
                {body1 && <p className="text-body-refined mb-6">{body1}</p>}
                {body2 && <p className="text-body-refined mb-10">{body2}</p>}
              </ScrollReveal>
            )}

            {venues && venues.length > 0 && (
              <ScrollReveal delay={250}>
                <div className="flex flex-col gap-4 mb-10">
                  {venues.map((v) => (
                    <div key={v} className="flex items-center gap-4 py-3 border-b border-stone">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
                      <span className="text-sm uppercase tracking-widest text-deep font-light">{v}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {cta && (
              <ScrollReveal delay={300}>
                <a
                  href={href}
                  className="inline-flex items-center gap-3
                             text-xs uppercase tracking-[0.2em] text-deep
                             border-b border-deep pb-1
                             hover:text-gold hover:border-gold
                             transition-colors duration-300"
                >
                  {cta}
                  <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                    <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </a>
              </ScrollReveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
