import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { ContactForm } from '@/components/contact/ContactForm'
import { getPage, getSettings, src, tr } from '@/lib/wp/api'
import { Rich } from '@/lib/wp/Rich'
import type { Locale } from '@/lib/wp/schema-types'

// Screen-reader labels (UI microcopy).
const ARIA = {
  en: { hero: 'Contact', info: (e: string) => `Email us at ${e}`, reservations: (e: string) => `Email reservations at ${e}`, map: 'Map — Althea Resorts location' },
  el: { hero: 'Επικοινωνία', info: (e: string) => `Στείλτε μας email στο ${e}`, reservations: (e: string) => `Email κρατήσεων στο ${e}`, map: 'Χάρτης — Τοποθεσία Althea Resorts' },
}

export async function ContactPage({ locale }: { locale: Locale }) {
  const [c, settings] = await Promise.all([getPage('contact'), getSettings()])
  const { hero, info, map } = c
  const aria = ARIA[locale]
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={aria.hero}
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

      {/* Contact grid */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info */}
            <div className="lg:col-span-5">
              <ScrollReveal>
                <h2 className="text-display-sm text-[#102027] mb-8">{info.heading[locale]}</h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <GoldLine className="mb-10" />
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">{info.address_label[locale]}</span>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{tr(settings.address, locale)}</p>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">{info.contact_label[locale]}</span>
                    <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200 block mb-1">
                      {settings.phone}
                    </a>
                    <a href={`mailto:${settings.email_info}`} aria-label={aria.info(settings.email_info)} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200 block mb-1">
                      {info.general_label[locale]}
                    </a>
                    <a href={`mailto:${settings.email_reservations}`} aria-label={aria.reservations(settings.email_reservations)} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200">
                      {info.reservations_label[locale]}
                    </a>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">{info.getting_here_label[locale]}</span>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                      {info.getting_here[locale]}
                    </p>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-4">{info.book_label[locale]}</span>
                    <a
                      href={settings.booking_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-7 inline-flex items-center
                                 text-xs uppercase tracking-[0.2em]
                                 bg-[#102027] text-white border border-[#102027]
                                 hover:bg-transparent hover:text-[#102027]
                                 transition-all duration-500"
                    >
                      {info.book_cta[locale]}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal delay={100}>
                <ContactForm locale={locale} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[500px] overflow-hidden" aria-label={aria.map}>
        <iframe
          src={`https://maps.google.com/maps?q=${settings.lat},${settings.lng}&z=15&output=embed`}
          width="100%"
          height="100%"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={map.iframe_title[locale]}
          className="border-0 grayscale opacity-90"
        />
        {/* Address bar overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#102027]/90 backdrop-blur-sm px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-label-upper text-[#ad8b27] block mb-1">{map.name[locale]}</span>
            <p className="text-sm font-light text-white/70">{map.address[locale]}</p>
          </div>
          <a
            href={settings.google_maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#ad8b27] transition-colors duration-300 shrink-0"
          >
            {map.directions[locale]}
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}
