import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { SpaMenuLightbox } from '@/components/ui/SpaMenuLightbox'
import { buildSpaSchema } from '@/lib/seo'
import { getItems, getPage, getSettings, src } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { Paragraphs, Rich, spaced } from '@/lib/wp/Rich'
import type { Locale } from '@/lib/wp/schema-types'



const LINK = 'text-[#ad8b27] hover:underline font-light'

export async function SpaPage({ locale }: { locale: Locale }) {
  // Structured data is only on the English page (as before the CMS migration).
  const geo = await getPage('seo_geo')
  const labels = await getLabels('pages', locale)
  const [c, items, settings] = await Promise.all([getPage('spa'), getItems('althea_spa_item'), getSettings()])
  const facilities = items.filter((i) => i.fields.kind === 'facility')
  const cabins = items.filter((i) => i.fields.kind === 'cabin')
  const { hero, space, pool_break, treatments, menu, philosophy, crosslink } = c

  return (
    <>
      {locale === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSpaSchema(geo)) }}
        />
      )}
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={labels.spa}
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
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{space.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  <Rich html={space.heading[locale]} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={space.paragraphs[locale]} className={spaced('text-body-refined', 'mb-5')} classes={{ a: LINK }} />
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src={src(space.image)}
                alt={space.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="max-w-xl mb-16">
            <ScrollReveal>
              <SectionLabel className="mb-6">{c.facilities.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-6"><Rich html={c.facilities.heading[locale]} /></h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mb-0" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#e8e4dd]">
            {facilities.map((f, i) => (
              <ScrollReveal key={f.slug} delay={i * 60}>
                <div className="bg-white p-8 h-full flex flex-col gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                  <h3 className="text-xs uppercase tracking-[0.18em] text-[#102027] font-light leading-relaxed">
                    {f.fields.name[locale]}
                  </h3>
                  <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                    {f.fields.desc[locale]}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Indoor Pool — full-bleed image break */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={src(pool_break.image)}
          alt={pool_break.image_alt[locale]}
          fill
          className="object-cover"
          sizes="100vw"
        />
      </section>

      {/* Treatment Cabins */}
      <section className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="max-w-xl mb-16">
            <ScrollReveal>
              <SectionLabel light className="mb-6">{treatments.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-white mb-6"><Rich html={treatments.heading[locale]} /></h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mb-6" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-sm font-light text-white/60 leading-relaxed">
                <Rich html={treatments.body[locale]} />
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cabins.map((cabin, i) => (
              <ScrollReveal key={cabin.slug} delay={i * 100}>
                <div className="group relative overflow-hidden">
                  <div className="aspect-[3/2] relative overflow-hidden">
                    <Image
                      src={src(cabin.image)}
                      alt={cabin.fields.image_alt[locale]}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-[#102027]/20" />
                  </div>
                  <div className="bg-[#0d1b21] p-8">
                    <h3 className="font-editorial text-xl font-light text-white mb-4">{cabin.fields.name[locale]}</h3>
                    <p className="text-sm font-light text-white/60 leading-relaxed mb-6">{cabin.fields.desc[locale]}</p>
                    <a
                      href={settings.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[#ad8b27] border-b border-[#ad8b27]/40 pb-1 hover:border-[#ad8b27] transition-colors duration-300"
                    >
                      {treatments.cabin_cta[locale]}
                      <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                        <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                      </svg>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={200} className="mt-12 text-center">
            <a
              href={settings.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-10
                         text-xs uppercase tracking-[0.2em]
                         bg-[#ad8b27] text-white border border-[#ad8b27]
                         hover:bg-transparent hover:text-[#ad8b27]
                         transition-all duration-500"
            >
              {treatments.cta[locale]}
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Spa Menu */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{menu.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  <Rich html={menu.heading[locale]} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined">
                  <Rich html={menu.body[locale]} />
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="max-w-sm mx-auto lg:mx-0 w-full">
              <SpaMenuLightbox
                src={src(menu.image)}
                alt={menu.image_alt[locale]}
                triggerLabel={menu.trigger_label[locale]}
                closeLabel={c.menu.close_label[locale]}
                openLabel={c.menu.open_label[locale]}
                downloadLabel={c.menu.download_label[locale]}
                downloadFileName="althea-ocean-spa-menu.jpg"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Oceanis Philosophy */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">{philosophy.label[locale]}</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  <Rich html={philosophy.heading[locale]} />
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Paragraphs html={philosophy.paragraphs[locale]} className={spaced('text-body-refined', 'mb-5')} classes={{ a: LINK }} />
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src={src(philosophy.image)}
                alt={philosophy.image_alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Cross-link to offers */}
      <section className="py-12 bg-white text-center">
        <p className="text-sm font-light text-[#6b6b6b]">
          <Rich html={crosslink.body[locale]} classes={{ a: LINK }} />
        </p>
      </section>

      <FinalBookingCTA locale={locale} />
    </main>
    </>
  )
}
