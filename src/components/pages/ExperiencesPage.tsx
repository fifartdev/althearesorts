import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { getPage, getSettings, src } from '@/lib/wp/api'
import type { Locale } from '@/lib/wp/schema-types'
import { Paragraphs, Rich, spaced } from '@/lib/wp/Rich'
import { splitLines } from '@/lib/wp/text'

const LINK = 'text-[#ad8b27] hover:underline font-light'

// Screen-reader labels, enquiry e-mail subjects and reveal timings that differ per language.
const UI = {
  en: { hero: 'Experiences', events: 'Events at Althea', corporateSubject: 'Corporate Event Enquiry', weddingSubject: 'Wedding Enquiry', spaHref: '/spa', equipmentDelay: 300, corporateCtaDelay: 350 },
  el: { hero: 'Εμπειρίες', events: 'Εκδηλώσεις στο Althea', corporateSubject: 'Αίτημα Εταιρικής Εκδήλωσης', weddingSubject: 'Αίτημα Γάμου', spaHref: '/el/spa', equipmentDelay: 265, corporateCtaDelay: 280 },
}

export async function ExperiencesPage({ locale }: { locale: Locale }) {
  const [c, settings] = await Promise.all([getPage('experiences'), getSettings()])
  const { hero, intro, activities, spa, pool, events, corporate, weddings } = c
  const ui = UI[locale]
  const hasSubheading = Boolean(corporate.facilities_subheading[locale])
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={ui.hero}
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
            <p className="text-sm font-light text-white/55 leading-relaxed mt-6 max-w-lg">
              {hero.subtitle[locale]}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Page Intro */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Paragraphs html={intro.paragraphs[locale]} className={spaced('text-body-refined text-lg leading-relaxed', 'mb-5')} classes={{ a: LINK }} />
          </ScrollReveal>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src={src(activities.image)}
                alt={activities.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{activities.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6"><Rich html={activities.heading[locale]} /></h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={activities.paragraphs[locale]} className={activities.note[locale] ? 'text-body-refined mb-5' : spaced('text-body-refined', 'mb-5')} />
                {activities.note[locale] && (
                  <p className="text-body-refined italic">
                    <Rich html={activities.note[locale]} />
                  </p>
                )}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Spa */}
      <section id="spa" className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden lg:sticky lg:top-32">
              <Image
                src={src(spa.image)}
                alt={spa.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel light className="mb-6">{spa.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-6"><Rich html={spa.heading[locale]} /></h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={spa.paragraphs[locale]} className={spaced('text-sm font-light text-white/60 leading-relaxed', 'mb-5', 'mb-8')} />
              </ScrollReveal>

              {/* Oceanis philosophy */}
              <ScrollReveal delay={250}>
                <div className="border-t border-white/10 pt-8 mb-8">
                  <h3 className="text-label-upper text-[#ad8b27] mb-5">{spa.oceanis_heading[locale]}</h3>
                  <Paragraphs html={spa.oceanis_paragraphs[locale]} className="text-sm font-light text-white/50 leading-relaxed mb-4" />
                  <p className={`text-sm font-light text-white/40 leading-relaxed${locale === 'en' ? ' italic' : ''}`}>
                    <Rich html={spa.oceanis_note[locale]} />
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <a
                  href={ui.spaHref}
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 hover:text-[#ad8b27] hover:border-[#ad8b27] transition-colors duration-300"
                >
                  {spa.cta[locale]}
                  <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                    <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pool */}
      <section id="pool" className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
              <Image
                src={src(pool.image)}
                alt={pool.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{pool.label[locale]}</SectionLabel>
              </ScrollReveal>
              {pool.heading[locale] && (
                <ScrollReveal delay={100}>
                  <h2 className="text-display-sm text-[#102027] mb-6"><Rich html={pool.heading[locale]} /></h2>
                </ScrollReveal>
              )}
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={pool.paragraphs[locale]} className={spaced('text-body-refined', 'mb-5')} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Events header */}
      <section className="section-padding bg-white" aria-label={ui.events}>
        <div className="container-luxury text-center">
          <ScrollReveal>
            <SectionLabel className="mb-6 justify-center">{events.label[locale]}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display-sm text-[#102027] mb-6">
              <Rich html={events.heading[locale]} />
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <GoldLine className="mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* Conference Facilities */}
      <section id="conference" className="pt-0 pb-0 section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{corporate.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  <Rich html={corporate.heading[locale]} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={corporate.paragraphs[locale]} className={spaced('text-body-refined', 'mb-5', 'mb-10')} />
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <h3 className={`text-label-upper text-[#102027] ${hasSubheading ? 'mb-2' : 'mb-6'}`}>{corporate.facilities_heading[locale]}</h3>
                {hasSubheading && (
                  <p className="font-editorial text-lg font-light italic text-[#6b6b6b] mb-6">
                    {corporate.facilities_subheading[locale]}
                  </p>
                )}
                <p className={`text-body-refined ${hasSubheading ? 'mb-8' : 'mb-10'}`}>
                  <Rich html={corporate.facilities_body[locale]} />
                </p>
              </ScrollReveal>

              {/* Configurations */}
              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-[#102027] mb-5">{corporate.configs_heading[locale]}</h3>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {corporate.configs.map((c) => (
                    <div key={c.layout[locale]} className="border border-[#e8e4dd] p-4">
                      <span className="text-xs uppercase tracking-[0.18em] text-[#ad8b27] block mb-1">{c.layout[locale]}</span>
                      <span className="font-editorial text-2xl font-light text-[#102027]">{c.capacity[locale]}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Equipment */}
              <ScrollReveal delay={ui.equipmentDelay}>
                <h3 className="text-label-upper text-[#102027] mb-5">{corporate.equipment_heading[locale]}</h3>
                <div className="flex flex-col gap-2 mb-10">
                  {splitLines(corporate.equipment[locale]).map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-light text-[#6b6b6b]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={ui.corporateCtaDelay}>
                <a
                  href={`mailto:${settings.email_reservations}?subject=${ui.corporateSubject}`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  {corporate.cta[locale]}
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src={src(corporate.image)}
                alt={corporate.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section id="weddings" className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src={src(weddings.image)}
                alt={weddings.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{weddings.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  <Rich html={weddings.heading[locale]} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={weddings.paragraphs[locale]} className={spaced('text-body-refined', 'mb-5', 'mb-10')} />
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <a
                  href={`mailto:${settings.email_reservations}?subject=${ui.weddingSubject}`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  {weddings.cta[locale]}
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FinalBookingCTA locale={locale} />
    </main>
  )
}
