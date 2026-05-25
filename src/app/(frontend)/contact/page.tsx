import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { ContactForm } from '@/components/contact/ContactForm'
import { PHONE, EMAIL, ADDRESS, BOOKING_URL, COORDINATES, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Contact',
  description: 'Contact Althea Resorts. Located in Ano Loutro, Xylokastro, Corinthia, Greece. Phone: +30 211 41 84 108. Email: reservations@althearesorts.com.',
  keywords: ['contact Althea Resorts', 'hotel phone number Corinthia', 'reservations Greece'],
  canonical: `${SITE_URL}/contact`,
})

export default function ContactPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Contact"
      >
        <Image
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/Gallery-3CH8F86.jpg"
          alt="Althea Resorts — contact us"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Contact</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              We Are Happy<br />
              <em className="italic font-light text-white/70">to Hear from You</em>
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
                <h2 className="text-display-sm text-[#102027] mb-8">Get in Touch</h2>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <GoldLine className="mb-10" />
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="flex flex-col gap-8">
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">Address</span>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{ADDRESS}</p>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">Reservations</span>
                    <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200 block mb-1">
                      {PHONE}
                    </a>
                    <a href={`mailto:${EMAIL}`} className="text-sm font-light text-[#102027] hover:text-[#ad8b27] transition-colors duration-200">
                      {EMAIL}
                    </a>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-2">Getting Here</span>
                    <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">
                      60 minutes from Athens by car. Follow the Athens–Corinth motorway
                      toward the Peloponnese, exit at Xylokastro. Shuttle available from
                      Xylokastro town.
                    </p>
                  </div>
                  <div>
                    <span className="text-label-upper text-[#ad8b27] block mb-4">Book Your Stay</span>
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-7 inline-flex items-center
                                 text-xs uppercase tracking-[0.2em]
                                 bg-[#102027] text-white border border-[#102027]
                                 hover:bg-transparent hover:text-[#102027]
                                 transition-all duration-500"
                    >
                      Reserve Online
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal delay={100}>
                <ContactForm />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="relative h-[500px] overflow-hidden" aria-label="Map — Althea Resorts location">
        <iframe
          src={`https://maps.google.com/maps?q=${COORDINATES.lat},${COORDINATES.lng}&z=15&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Althea Resorts — Ano Loutro, Xylokastro, Corinthia, Greece"
          className="grayscale opacity-90"
        />
        {/* Address bar overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-[#102027]/90 backdrop-blur-sm px-8 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-label-upper text-[#ad8b27] block mb-1">Althea Resorts</span>
            <p className="text-sm font-light text-white/70">Ano Loutro, Xylokastro, Corinthia, Greece</p>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${COORDINATES.lat},${COORDINATES.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-[#ad8b27] transition-colors duration-300 shrink-0"
          >
            Get Directions
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </a>
        </div>
      </section>
    </main>
  )
}
