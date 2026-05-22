import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

export function LocationSection() {
  return (
    <section
      className="relative section-padding overflow-hidden"
      aria-label="Location — Corinthia, Greece"
    >
      {/* Full background */}
      <div className="absolute inset-0 bg-[#102027]" />

      {/* Decorative large text */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[20vw] font-light text-white/[0.03] leading-none select-none pointer-events-none" aria-hidden="true">
        Corinthia
      </div>

      <div className="relative z-10 container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <ScrollReveal>
              <SectionLabel light className="mb-8">Location</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-white mb-8">
                Corinthia Has Been<br />
                <em className="italic font-light text-white/70">Waiting for You</em>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-sm font-light text-white/50 leading-relaxed mb-6">
                Most people drive through Corinthia on the way to somewhere else.
                That is their loss and, quietly, your gain.
              </p>
              <p className="text-sm font-light text-white/50 leading-relaxed mb-10">
                The Corinthian Gulf stretches out in front of you, calm and wide.
                The light here is different — softer in the morning, golden in the afternoon,
                and at dusk it does something to the water that is difficult to describe
                and very easy to remember.
              </p>
            </ScrollReveal>

            {/* Distance facts */}
            <ScrollReveal delay={250}>
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { value: "60'", label: 'From Athens by car' },
                  { value: "5'", label: 'To private beach' },
                  { value: '45\'', label: 'To Ancient Corinth' },
                ].map((fact) => (
                  <div key={fact.label} className="flex flex-col gap-1 border-l border-white/10 pl-4">
                    <span className="font-editorial text-3xl font-light text-white">{fact.value}</span>
                    <span className="text-label-upper text-white/40">{fact.label}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <a
                href="/location"
                className="inline-flex items-center gap-3
                           text-xs uppercase tracking-[0.2em] text-white/60
                           border-b border-white/20 pb-1
                           hover:text-white hover:border-white
                           transition-colors duration-300"
              >
                Discover the Region
                <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
                  <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </a>
            </ScrollReveal>
          </div>

          {/* Image */}
          <ScrollReveal variant="image" className="aspect-square lg:aspect-[4/5] w-full relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&w=900&q=80"
              alt="Corinthian Gulf coastline"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* Location pin overlay */}
            <div className="absolute inset-0 bg-[#102027]/20" />
            <div className="absolute bottom-6 left-6">
              <span className="text-label-upper text-white/70">Ano Loutro, Corinthia</span>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
