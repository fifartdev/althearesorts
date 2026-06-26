import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { SITE_URL } from '@/lib/seo'
import { SpaBanner } from '@/components/ui/SpaBanner'
import { getExperiences, getBookingSettings, getGeoSettings } from '@/lib/cms'

export const metadata = genMeta({
  title: 'Ocean Spa',
  description: 'The Ocean Spa at Althea Resorts — sauna, hammam, ice bath, dedicated pool, treatment cabins, yoga room and gym. Treatments built around Oceanis cosmetics, a certified Greek brand.',
  keywords: ['Ocean Spa Althea', 'spa Corinthia Greece', 'Oceanis cosmetics', 'hammam Greece', 'wellness hotel Corinthia', 'spa treatments Xylokastro'],
  canonical: `${SITE_URL}/spa`,
})

const facilities = [
  { name: 'Sauna',                     desc: 'Finnish dry heat. The kind that empties your mind before your body.' },
  { name: 'Hammam & Steam Room',        desc: 'Traditional steam ritual, updated for modern sensibility.' },
  { name: 'Ice Bath',                   desc: 'The contrast that makes everything else feel like relief.' },
  { name: 'Dedicated Spa Pool',         desc: 'Warm water, quiet. Separate from the resort\'s main pool.' },
  { name: 'Relaxation Area',            desc: 'Time set aside for doing nothing. Properly.' },
  { name: 'Yoga Room',                  desc: 'Open to the hillside. Sessions available on request.' },
  { name: 'Fully Equipped Gym',         desc: 'For those who need movement to find stillness.' },
  { name: 'Oceanis Boutique',           desc: 'Take the ritual home. The full Oceanis range, in-house.' },
]

const cabins = [
  {
    title: 'Single Cabin I & II',
    desc: 'Two private treatment rooms for individual sessions. Signature massages, body wraps, and facial rituals using Oceanis formulas. Each cabin is designed for complete quiet — no corridor noise, no interruption.',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Single treatment cabin — Ocean Spa',
  },
  {
    title: 'Double Cabin',
    desc: 'The double cabin offers all the same treatments for two, side by side. Couples massages, shared rituals, or simply the same experience in the same room. Bookable for any combination of guests.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Double treatment cabin — Ocean Spa',
  },
]

export default async function SpaPage() {
  const [docs, bookingSettings, geoSettings] = await Promise.all([
    getExperiences('en'),
    getBookingSettings(),
    getGeoSettings('en'),
  ])
  const spaDoc = docs.find((d: any) => d.category === 'spa') as any | undefined
  const spaIntro: string | undefined = spaDoc?.shortDescription || undefined
  const bookingUrl: string | undefined = (bookingSettings as any)?.bookingEngineUrl || undefined

  const geoNested: any[] = (geoSettings as any)?.nestedPlaces ?? []
  const spaEntry = geoNested.find(
    (p: any) => p.schemaType === 'HealthAndBeautyBusiness' || p.name?.toLowerCase().includes('spa')
  )
  const oceanSpaSchema = spaEntry
    ? {
        '@context': 'https://schema.org',
        '@type': 'HealthAndBeautyBusiness',
        ...(spaEntry.id ? { '@id': spaEntry.id } : { '@id': `${SITE_URL}/spa#ocean-spa` }),
        name: spaEntry.name,
        ...(spaEntry.description ? { description: spaEntry.description } : {}),
        url: spaEntry.url || `${SITE_URL}/spa`,
        containedInPlace: { '@id': `${SITE_URL}/#hotel` },
      }
    : null

  return (
    <>
      {oceanSpaSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(oceanSpaSchema) }}
        />
      )}
    <main id="main-content">
      <SpaBanner />
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-130 flex items-end overflow-hidden"
        aria-label="Ocean Spa"
      >
        <Image
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=80"
          alt="Ocean Spa — Althea Resorts wellness"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Spa & Wellness</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              The Ocean Spa<br />
              <em className="italic font-light text-white/70">Is Not an Add-On</em>
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
                <SectionLabel className="mb-6">The Space</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-deep mb-6">
                  One of the Main Reasons to Come
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                {spaIntro
                  ? spaIntro.split('\n\n').map((p: string, i: number) => (
                      <p key={i} className="text-body-refined mb-5">{p.trim()}</p>
                    ))
                  : <>
                      <p className="text-body-refined mb-5">
                        The Ocean Spa at Althea was designed as a destination in itself, not
                        a facility ticked off a checklist. It occupies its own wing of the
                        property — quiet, unhurried, built around the idea that the body
                        knows what it needs when you finally give it the conditions.
                      </p>
                      <p className="text-body-refined mb-5">
                        You arrive carrying the weight of everything that happened before you
                        got here. An hour later, you have genuinely forgotten what most of it
                        was. That is not a promise. That is just what happens in this room,
                        on this hillside, with these hands.
                      </p>
                      <p className="text-body-refined">
                        Every treatment is built around Oceanis cosmetics — a certified Greek
                        brand drawn from the same sea and land that surrounds the property.
                        The same formulas used in the spa are available in the Oceanis Boutique —
                        the full Oceanis range, for those who want to bring a piece of this place home.
                      </p>
                    </>
                }
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-4/5 w-full relative overflow-hidden">
              <Image
                src="/images/oceanisphoto.jpg"
                alt="Oceanis cosmetics — natural Greek skincare products"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="section-padding bg-cream">
        <div className="container-luxury">
          <div className="max-w-xl mb-16">
            <ScrollReveal>
              <SectionLabel className="mb-6">Facilities</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-deep mb-6">Everything the Spa Needs to Be</h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mb-0" />
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-stone">
            {facilities.map((f, i) => (
              <ScrollReveal key={f.name} delay={i * 60}>
                <div className="bg-white p-8 h-full flex flex-col gap-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <h3 className="text-xs uppercase tracking-[0.18em] text-deep font-light leading-relaxed">
                    {f.name}
                  </h3>
                  <p className="text-sm font-light text-smoke leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Cabins */}
      <section className="section-padding bg-deep">
        <div className="container-luxury">
          <div className="max-w-xl mb-16">
            <ScrollReveal>
              <SectionLabel light className="mb-6">Treatments</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-white mb-6">Three Cabins. One Purpose.</h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mb-6" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-sm font-light text-white/60 leading-relaxed">
                The Ocean Spa has two single treatment cabins and one double cabin.
                All treatments use Oceanis formulas — massages, body rituals, and facial
                therapies designed around the skin and the season.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {cabins.map((cabin, i) => (
              <ScrollReveal key={cabin.title} delay={i * 100}>
                <div className="group relative overflow-hidden">
                  <div className="aspect-3/2 relative overflow-hidden">
                    <Image
                      src={cabin.image}
                      alt={cabin.imageAlt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-deep/20" />
                  </div>
                  <div className="bg-[#0d1b21] p-8">
                    <h3 className="font-editorial text-xl font-light text-white mb-4">{cabin.title}</h3>
                    <p className="text-sm font-light text-white/60 leading-relaxed mb-6">{cabin.desc}</p>
                    {bookingUrl && (
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-gold border-b border-gold/40 pb-1 hover:border-gold transition-colors duration-300"
                    >
                      Book This Cabin
                      <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                        <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                      </svg>
                    </a>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {bookingUrl && (
          <ScrollReveal delay={200} className="mt-12 text-center">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-10
                         text-xs uppercase tracking-[0.2em]
                         bg-gold text-white border border-gold
                         hover:bg-transparent hover:text-gold
                         transition-all duration-500"
            >
              Book a Treatment
            </a>
          </ScrollReveal>
          )}
        </div>
      </section>

      {/* Oceanis Philosophy */}
      <section className="section-padding bg-soft">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Sustainability</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-deep mb-6">
                  Oceanis: The Philosophy Behind the Product
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  Oceanis takes its name from the Oceanids, the water nymphs of ancient
                  Greek mythology, daughters of Oceanus and Tethys. A Greek brand, rooted
                  in Greek myth, made in Greece, for a property that sits above a Greek gulf.
                  Everything connects.
                </p>
                <p className="text-body-refined mb-5">
                  The formulas are certified biodegradable in twenty-eight days. The packaging
                  is made from recycled PET and is one hundred percent recyclable. Every
                  dispenser in the spa and in each room is part of a refill system designed
                  to eliminate single-use waste at its source.
                </p>
                <p className="text-body-refined">
                  At Althea, sustainability is not a separate initiative with its own page.
                  It is a series of quiet decisions made during the design of the property.
                  Oceanis is one of those decisions.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal variant="image" delay={100} className="aspect-4/5 w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=80"
                alt="Natural ingredients — Oceanis sustainable cosmetics"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
    </>
  )
}
