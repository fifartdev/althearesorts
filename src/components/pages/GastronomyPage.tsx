import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { getItems, getPage, getSettings, src } from '@/lib/wp/api'
import { Paragraphs, Rich } from '@/lib/wp/Rich'
import type { Locale } from '@/lib/wp/schema-types'

// Structured data is only on the English page (as before the CMS migration).
const aithirSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://althearesorts.com/gastronomy#aither',
  name: 'AITHER',
  description: 'Rooftop restaurant at Althea Resorts — Mediterranean cuisine told through a Greek lens, with panoramic views of the Corinthian Gulf.',
  url: 'https://althearesorts.com/gastronomy',
  servesCuisine: ['Mediterranean', 'Greek'],
  priceRange: '€€€',
  containedInPlace: {
    '@id': 'https://althearesorts.com/#hotel',
  },
}

// Section backgrounds per venue (layout stays in code; new venues alternate).
const VENUE_BG: Record<string, string> = {
  'all-day': 'bg-[#dde6ea]',
  breakfast: 'bg-[#f7f4ef]',
  bar: 'bg-[#f2f8fb]',
  'pool-bar': 'bg-[#dde6ea]',
}

const ARIA = {
  en: { hero: 'Gastronomy', aither: 'AITHER rooftop restaurant' },
  el: { hero: 'Γαστρονομία', aither: 'Εστιατόριο AITHER' },
}

export async function GastronomyPage({ locale }: { locale: Locale }) {
  const [c, venues, settings] = await Promise.all([getPage('gastronomy'), getItems('althea_venue'), getSettings()])
  const { hero, aither } = c
  const hasQuote = Boolean(aither.quote[locale])
  return (
    <>
      {locale === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aithirSchema) }}
        />
      )}
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={ARIA[locale].hero}
      >
        <Image
          src={src(hero.image)}
          alt={hero.image_alt[locale]}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">{hero.label[locale]}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              <Rich html={hero.heading[locale]} classes={{ em: 'italic font-light text-white/70' }} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed mt-6 max-w-sm">
              {hero.subtitle[locale]}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AITHER featured section */}
      <section id="aither" className="section-padding bg-[#e8e4dd]" aria-label={ARIA[locale].aither}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{aither.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  <Rich html={aither.heading[locale]} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs
                  html={aither.paragraphs[locale]}
                  className={(i, n) => `text-body-refined ${i < n - 1 || hasQuote ? 'mb-5' : 'mb-10'} leading-loose`}
                />
                {hasQuote && (
                  <p className="font-editorial text-lg font-light italic text-[#102027] mb-10">
                    <Rich html={aither.quote[locale]} />
                  </p>
                )}
              </ScrollReveal>
              <ScrollReveal delay={300}>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  {aither.cta[locale]}
                </a>
                <p className="mt-3 text-xs font-light text-[#6b6b6b]">
                  {aither.phone_note[locale].replace('{phone}', settings.phone)}
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" className="aspect-[3/4] w-full relative overflow-hidden">
              <Image
                src={src(aither.image)}
                alt={aither.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Other venues */}
      {venues.map((venue, i) => (
        <section
          key={venue.slug}
          id={venue.slug}
          className={`section-padding ${VENUE_BG[venue.slug] ?? (i % 2 ? 'bg-[#f7f4ef]' : 'bg-[#dde6ea]')}`}
          aria-label={venue.fields.title[locale]}
        >
          <div className="container-luxury">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={i % 2 !== 0 ? 'lg:col-start-2' : ''}>
                <ScrollReveal>
                  <SectionLabel className="mb-6">{venue.fields.label[locale]}</SectionLabel>
                </ScrollReveal>
                <ScrollReveal delay={100}>
                  <h2 className="text-display-sm text-[#102027] mb-6">
                    {venue.fields.title[locale]}
                  </h2>
                </ScrollReveal>
                <ScrollReveal delay={150}>
                  <GoldLine className="mb-8" />
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <p className="text-body-refined mb-8 leading-loose">
                    {venue.fields.desc[locale]}
                  </p>
                </ScrollReveal>
              </div>
              <div className={i % 2 !== 0 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                <ScrollReveal variant="image" className="relative overflow-hidden aspect-[4/3]">
                  <Image
                    src={src(venue.image)}
                    alt={venue.fields.image_alt[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ScrollReveal>
              </div>
            </div>
          </div>
        </section>
      ))}

      <FinalBookingCTA locale={locale} />
    </main>
    </>
  )
}
