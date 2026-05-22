import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'

export const metadata = genMeta({
  title: 'Location',
  description: 'Althea Resorts is located in Ano Loutro, near Xylokastro, Corinthia, Greece. 60 minutes from Athens. Private beach on the Corinthian Gulf. Near Ancient Corinth, the Acrocorinth, and the Corinth Canal.',
  keywords: ['Althea Resorts location', 'Xylokastro hotel', 'Corinthia Greece', 'near Ancient Corinth', 'hotel near Athens'],
  canonical: `${SITE_URL}/location`,
})

const sights = [
  {
    name: 'Ancient Corinth',
    distance: '45 min by car',
    desc: 'One of the most powerful city-states of antiquity. The archaeological site and museum hold their own against anything in Attica.',
    category: 'Archaeological',
  },
  {
    name: 'Acrocorinth',
    distance: '45 min by car',
    desc: 'The fortified hill rising above the ancient city. A climb that earns its view.',
    category: 'Archaeological',
  },
  {
    name: 'Corinth Canal',
    distance: '40 min by car',
    desc: 'One of the great feats of nineteenth-century engineering. It still stops people in their tracks when they see it for the first time.',
    category: 'Landmark',
  },
  {
    name: 'Xylokastro',
    distance: '10 min by car',
    desc: 'A seafront promenade, good coffee, local fish, and the feeling of a place that has not been arranged for visitors.',
    category: 'Town',
  },
  {
    name: 'Epidaurus',
    distance: '1.5 hr by car',
    desc: 'The ancient theatre, set in a valley of perfect acoustics and quiet beauty. One of Greece\'s most moving sites.',
    category: 'Day Trip',
  },
  {
    name: 'Mystras',
    distance: '2 hr by car',
    desc: 'The medieval city rising above the Peloponnese. A UNESCO World Heritage Site worth a full day.',
    category: 'Day Trip',
  },
]

export default function LocationPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#102027] overflow-hidden" aria-label="Location">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[14vw] font-light text-white/[0.03] leading-none select-none" aria-hidden="true">
          Corinthia
        </div>
        <div className="relative z-10 container-luxury">
          <ScrollReveal>
            <SectionLabel light className="mb-6">Location</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-3xl mb-8">
              Corinthia Has Been<br />
              <em className="italic font-light text-white/70">Waiting for You to Notice It</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed max-w-lg">
              Most people drive through Corinthia on the way to somewhere else.
              That is their loss and, quietly, your gain.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="font-editorial text-2xl font-light text-[#102027] leading-relaxed mb-8">
                  The Corinthian Gulf stretches out in front of you, calm and wide,
                  with the mountains of central Greece on the opposite shore.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-body-refined mb-5">
                  The light here is different from the light in the islands. Softer in the
                  morning, golden in the afternoon, and at dusk it does something to the water
                  that is difficult to describe and very easy to remember.
                </p>
                <p className="text-body-refined">
                  Althea sits on the gentle hills of Ano Loutro, five minutes from the sea,
                  at the center of a region that rewards the curious and rests the tired
                  in equal measure.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={150}>
                <div className="flex flex-col gap-6">
                  {[
                    { value: "60'", label: 'From Athens by car' },
                    { value: "5'", label: 'To private beach shuttle' },
                    { value: "10'", label: 'To Xylokastro town' },
                    { value: "45'", label: 'To Ancient Corinth' },
                  ].map((f) => (
                    <div key={f.label} className="flex gap-4 border-l-2 border-[#ad8b27] pl-4">
                      <span className="font-editorial text-3xl font-light text-[#102027] leading-none">{f.value}</span>
                      <span className="text-xs uppercase tracking-wider text-[#6b6b6b] font-light self-end pb-0.5">{f.label}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Private Beach */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80"
                alt="Corinthian Gulf private beach"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Beaches</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">The Sea Is Closer Than You Think</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The private beach of Althea is five minutes from the resort by shuttle — a
                  quiet stretch of coastline reserved for guests, with comfortable sunbeds and
                  the kind of privacy that public beaches cannot offer.
                </p>
                <p className="text-body-refined">
                  The Corinthian Gulf is calm by nature. The water is clean, the temperature
                  generous from early summer through October. Swimming here feels unhurried
                  in a way that the more crowded Aegean beaches rarely do.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sightseeing Grid */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-4">Sightseeing</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027]">
                  A Region With More History<br />Than It Gets Credit For
                </h2>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sights.map((sight, i) => (
              <ScrollReveal key={sight.name} delay={i * 60}>
                <div className="p-6 border border-[#e8e4dd] h-full flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-label-upper text-[#ad8b27]">{sight.category}</span>
                    <span className="text-xs font-light text-[#a0a0a0] uppercase tracking-wider">{sight.distance}</span>
                  </div>
                  <h3 className="font-editorial text-xl font-light text-[#102027]">{sight.name}</h3>
                  <p className="text-sm font-light text-[#6b6b6b] leading-relaxed">{sight.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
  )
}
