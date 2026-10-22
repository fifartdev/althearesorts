import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { getItems, getPage, src } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { Paragraphs, Rich, spaced } from '@/lib/wp/Rich'
import type { Locale } from '@/lib/wp/schema-types'

const LINK = 'text-[#ad8b27] hover:underline font-light'

export async function LocationPage({ locale }: { locale: Locale }) {
  const labels = await getLabels('pages', locale)
  const [c, sights] = await Promise.all([getPage('location'), getItems('althea_sight')])
  const { hero, intro, sights: sightsSection } = c
  const lead = intro.lead[locale]
  const beaches = locale === 'el' ? { label: c.beaches.label.el, body: c.beaches.body.el } : null

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#35657a] overflow-hidden" aria-label={labels.location}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[14vw] font-light text-white/[0.03] leading-none select-none" aria-hidden="true">
          {hero.watermark[locale]}
        </div>
        <div className="relative z-10 container-luxury">
          <ScrollReveal>
            <SectionLabel light className="mb-6">{hero.label[locale]}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-3xl mb-8">
              <Rich html={hero.heading[locale]} classes={{ em: 'italic font-light text-white/70' }} />
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed max-w-lg">
              {hero.subtitle[locale]}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              {lead && (
                <ScrollReveal>
                  <p className="font-editorial text-2xl font-light text-[#102027] leading-relaxed mb-8">
                    <Rich html={lead} />
                  </p>
                </ScrollReveal>
              )}
              <ScrollReveal delay={lead ? 100 : undefined}>
                <Paragraphs
                  html={intro.paragraphs[locale]}
                  className={lead ? spaced('text-body-refined', 'mb-5') : 'text-body-refined mb-5'}
                  classes={{ a: LINK }}
                />
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={150}>
                <div className="flex flex-col gap-6">
                  {intro.facts.map((f) => (
                    <div key={f.label[locale]} className="flex gap-4 border-l-2 border-[#ad8b27] pl-4">
                      <span className="font-editorial text-3xl font-light text-[#102027] leading-none">{f.value}</span>
                      <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-light self-end pb-0.5">{f.label[locale]}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Beaches (Greek page only) */}
      {beaches && beaches.body && (
        <section className="section-padding bg-[#f2f8fb]">
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-6">{beaches.label}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-body-refined max-w-2xl">
                <Rich html={beaches.body} />
              </p>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Sightseeing Grid */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-6">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-4">{sightsSection.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027]">
                  <Rich html={sightsSection.heading[locale]} />
                </h2>
              </ScrollReveal>
            </div>
          </div>
          <ScrollReveal delay={150}>
            <p className="text-body-refined max-w-2xl mb-12">
              <Rich html={sightsSection.intro[locale]} classes={{ a: LINK }} />
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sights.map((sight, i) => {
              const f = sight.fields
              return (
                <ScrollReveal key={sight.slug} delay={i * 60}>
                  <div className="border border-[#e8e4dd] h-full flex flex-col overflow-hidden">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={src(sight.image)}
                        alt={f.name[locale]}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        style={f.object_position ? { objectPosition: f.object_position } : undefined}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-[#102027]/20" />
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] uppercase tracking-[0.18em] text-white bg-[#102027]/60 backdrop-blur-sm px-2.5 py-1">
                          {f.category[locale]}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col gap-2 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-editorial text-xl font-light text-[#102027]">{f.name[locale]}</h3>
                        <span className="text-xs font-light text-[#a0a0a0] uppercase tracking-wider shrink-0 mt-1">{f.distance[locale]}</span>
                      </div>
                      <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{f.desc[locale]}</p>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      <FinalBookingCTA locale={locale} />
    </main>
  )
}
