import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import { getItems, getPage, src } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'
import type { Locale } from '@/lib/wp/schema-types'

export async function OffersPage({ locale }: { locale: Locale }) {
  const [c, offers] = await Promise.all([getPage('offers'), getItems('althea_offer')])
  const { hero } = c
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={locale === 'el' ? 'Προσφορές' : 'Offers'}
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

      {/* Active offers */}
      {offers.filter((o) => o.fields.active).map((offer) => {
        const f = offer.fields
        const readMoreHref = f.read_more_href[locale]
        const readMoreClass = `h-11 px-7 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-transparent text-[#102027] border border-[#102027]
                               hover:bg-[#102027] hover:text-white
                               transition-all duration-500`
        return (
          <section key={offer.slug} className="section-padding bg-white">
            <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <ScrollReveal>
                    <SectionLabel className="mb-5">{c.offer.label[locale]}</SectionLabel>
                  </ScrollReveal>
                  <ScrollReveal delay={80}>
                    <span className="inline-block text-[10px] uppercase tracking-[0.2em] bg-[#ad8b27] text-white px-3 py-1.5 mb-5">
                      {f.eyebrow[locale]}
                    </span>
                  </ScrollReveal>
                  <ScrollReveal delay={120}>
                    <h2 className="text-display-sm text-[#102027] mb-6">
                      <Rich html={f.heading[locale]} classes={{ em: 'italic font-light text-[#102027]/60' }} />
                    </h2>
                  </ScrollReveal>
                  <ScrollReveal delay={160}>
                    <GoldLine className="mb-8" />
                  </ScrollReveal>
                  <ScrollReveal delay={200}>
                    <p className="text-body-refined mb-8">
                      <Rich html={f.body[locale]} />
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={f.booking_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-11 px-8 inline-flex items-center justify-center gap-3
                               text-xs uppercase tracking-[0.2em]
                               bg-[#ad8b27] text-white border border-[#ad8b27]
                               hover:bg-transparent hover:text-[#ad8b27]
                               transition-all duration-500"
                      >
                        {f.cta_label[locale]}
                        <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                          <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                        </svg>
                      </a>
                      {readMoreHref && (readMoreHref.startsWith('/') ? (
                        <Link href={readMoreHref} className={readMoreClass}>
                          {f.read_more_label[locale]}
                        </Link>
                      ) : (
                        <a href={readMoreHref} className={readMoreClass}>
                          {f.read_more_label[locale]}
                        </a>
                      ))}
                    </div>
                  </ScrollReveal>
                </div>
                <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
                  <Image
                    src={src(offer.image)}
                    alt={f.image_alt[locale]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </ScrollReveal>
              </div>
            </div>
          </section>
        )
      })}
      <DirectBookingReasons locale={locale} />
    </main>
  )
}
