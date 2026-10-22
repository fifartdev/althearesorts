import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { getItems, getPage, getSettings, src, tr } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { Paragraphs, Rich, spaced } from '@/lib/wp/Rich'
import { splitLines } from '@/lib/wp/text'
import type { Item, Locale } from '@/lib/wp/schema-types'


/** Room texts in the page language (English fallback per field); the Greek section label is the view. */
function roomTexts(room: Item<'althea_room'>, locale: Locale) {
  const f = room.fields
  return {
    aria: locale === 'el' ? tr(f.view, locale) || room.title : room.title,
    view: tr(f.view, locale),
    tagline: locale === 'el' ? f.tagline.el : f.tagline.en,
    shortDesc: tr(f.short_desc, locale),
    features: splitLines(tr(f.features, locale)),
  }
}

export async function AccommodationPage({ locale }: { locale: Locale }) {
  const labels = await getLabels('pages', locale)
  const [c, rooms, settings] = await Promise.all([getPage('accommodation'), getItems('althea_room'), getSettings()])
  const { hero, intro, list, included } = c
  const roomBase = locale === 'el' ? '/el/accommodation' : '/accommodation'

  return (
    <main id="main-content">

      {/* ── Hero ── */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={labels.accommodation}
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

      {/* ── Intro text ── */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <Paragraphs html={intro.paragraphs[locale]} className={spaced('text-body-refined text-lg leading-relaxed', 'mb-5')} />
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12 pt-10 border-t border-[#e8e4dd]">
              {intro.stats.map((s) => (
                <div key={s.label[locale]} className="flex flex-col items-center gap-1">
                  <span className="font-editorial text-3xl font-light text-[#102027]">{s.value}</span>
                  <span className="text-label-upper text-[#6b6b6b]">{s.label[locale]}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Room sections ── */}
      {rooms.map((room, i) => {
        const isEven = i % 2 === 0
        const isFeatured = room.fields.featured === true
        const t = roomTexts(room, locale)

        return (
          <section
            key={room.slug}
            id={room.slug}
            className={`${isFeatured ? 'bg-[#102027]' : i % 2 === 0 ? 'bg-white' : 'bg-[#f2f8fb]'} overflow-hidden`}
            aria-label={t.aria}
          >
            <div className="container-luxury py-0">
              <div className={`grid grid-cols-1 lg:grid-cols-2 ${isEven ? '' : 'lg:[direction:rtl]'}`}>

                {/* Image */}
                <ScrollReveal variant="image" className="aspect-[4/3] lg:aspect-auto lg:min-h-[600px] relative overflow-hidden">
                  <Image
                    src={src(room.image)}
                    alt={room.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={i === 0}
                  />
                  {isFeatured && (
                    <div className="absolute top-6 left-6 bg-[#ad8b27] px-4 py-1.5">
                      <span className="text-label-upper text-white">{list.signature_label[locale]}</span>
                    </div>
                  )}
                </ScrollReveal>

                {/* Content */}
                <div className={`flex flex-col justify-center px-8 py-16 lg:px-16 lg:py-20 [direction:ltr] ${isFeatured ? 'bg-[#102027]' : ''}`}>
                  <ScrollReveal>
                    <span className="text-label-upper text-[#ad8b27] mb-6 block">{t.view}</span>
                  </ScrollReveal>
                  <ScrollReveal delay={80}>
                    <h2 className={`text-display-sm mb-3 ${isFeatured ? 'text-white' : 'text-[#102027]'}`}>
                      {room.title}
                    </h2>
                  </ScrollReveal>
                  {t.tagline && (
                    <ScrollReveal delay={100}>
                      <p className={`font-editorial text-lg font-light italic mb-4 ${isFeatured ? 'text-white/70' : 'text-[#6b6b6b]'}`}>
                        {t.tagline}
                      </p>
                    </ScrollReveal>
                  )}
                  <ScrollReveal delay={120}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className={`text-sm font-light ${isFeatured ? 'text-white/50' : 'text-[#6b6b6b]'}`}>
                        {room.fields.size}
                      </span>
                      <span className={`w-px h-4 ${isFeatured ? 'bg-white/20' : 'bg-[#e8e4dd]'}`} />
                      <span className={`text-sm font-light ${isFeatured ? 'text-white/50' : 'text-[#6b6b6b]'}`}>
                        {list.config_label[locale]}
                      </span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={150}>
                    <GoldLine className="mb-6" />
                  </ScrollReveal>
                  <ScrollReveal delay={180}>
                    <p className={`text-sm font-light leading-relaxed mb-8 ${isFeatured ? 'text-white/60' : 'text-[#6b6b6b]'}`}>
                      {t.shortDesc}
                    </p>
                  </ScrollReveal>

                  {/* Features */}
                  <ScrollReveal delay={210}>
                    <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-10">
                      {t.features.slice(0, 6).map((f) => (
                        <li key={f} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-[#ad8b27] shrink-0" aria-hidden="true" />
                          <span className={`text-xs font-light ${isFeatured ? 'text-white/50' : 'text-[#6b6b6b]'}`}>
                            {f}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>

                  {/* CTAs */}
                  <ScrollReveal delay={250}>
                    <div className="flex flex-wrap gap-4">
                      <a
                        href={room.fields.booking_url || settings.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-7 inline-flex items-center
                                   text-xs uppercase tracking-[0.2em]
                                   bg-[#ad8b27] text-white border border-[#ad8b27]
                                   hover:bg-transparent hover:text-[#ad8b27]
                                   transition-all duration-500"
                      >
                        {list.reserve[locale]}
                      </a>
                      <a
                        href={`${roomBase}/${room.slug}`}
                        className={`h-11 px-7 inline-flex items-center
                                   text-xs uppercase tracking-[0.2em]
                                   bg-transparent border transition-all duration-500
                                   ${isFeatured
                                     ? 'text-white border-white/30 hover:bg-white hover:text-[#102027]'
                                     : 'text-[#102027] border-[#102027]/30 hover:bg-[#102027] hover:text-white'
                                   }`}
                      >
                        {list.details[locale]}
                      </a>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* ── All rooms include ── */}
      <section className="section-padding bg-[#faf8f4]" aria-label={labels.accommodation_included}>
        <div className="container-luxury">
          <div className="text-center mb-14">
            <ScrollReveal>
              <SectionLabel className="mb-5 justify-center">{included.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027]"><Rich html={included.heading[locale]} /></h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={150}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-[#e8e4dd]">
              {splitLines(included.items[locale]).map((amenity) => (
                <div
                  key={amenity}
                  className="flex flex-col items-center text-center gap-3 p-6 bg-[#faf8f4]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27]" aria-hidden="true" />
                  <span className="text-xs uppercase tracking-wider text-[#102027] font-light leading-tight">
                    {amenity}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalBookingCTA locale={locale} />
    </main>
  )
}
