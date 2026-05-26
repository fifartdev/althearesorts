import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const experiences = [
  {
    label: 'Spa & Wellness',
    title: 'The Ocean Spa',
    desc: 'Ancient wellness traditions meet contemporary therapies. Sauna, hammam, ice bath, pool, and two treatment cabins. Using Oceanis cosmetics, a Greek brand drawn from this sea.',
    href: '/experiences#spa',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Ocean Spa — Althea Resorts wellness',
  },
  {
    label: 'Dining',
    title: 'AITHER',
    desc: 'The rooftop restaurant with panoramic Gulf views. Each evening, the kitchen works with the Mediterranean as its reference point and Greece as its lens.',
    href: '/gastronomy#aither',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'AITHER rooftop restaurant',
  },
  {
    label: 'Activities',
    title: 'The Corinthian Landscape',
    desc: 'Hiking trails, cycling routes, yoga sessions open to the Gulf. The landscape is not a backdrop — it is part of what you came for.',
    href: '/experiences#activities',
    image: 'https://images.unsplash.com/photo-1717518213008-16af162e8494?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Boat traveling through the Corinth Canal',
  },
]

export function ExperiencesHighlight() {
  return (
    <section
      className="section-padding bg-[#102027]"
      aria-label="Experiences at Althea Resorts"
    >
      <div className="container-luxury">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <ScrollReveal>
              <SectionLabel light className="mb-6">Experiences</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-md text-white">
                This Is What You<br />
                <em className="italic font-light text-white/70">Come Back For</em>
              </h2>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/50 max-w-xs leading-relaxed">
              Most guests arrive with a plan.<br />
              Most plans change by the second morning.
            </p>
          </ScrollReveal>
        </div>

        {/* Experience cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i * 120}>
              <a
                href={exp.href}
                className="group block overflow-hidden border border-white/10 hover:border-[#ad8b27]/40 transition-colors duration-500"
              >
                {/* Image */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/20 transition-colors duration-500" />
                </div>

                {/* Content */}
                <div className="p-6 bg-[#102027]">
                  <span className="text-label-upper text-[#ad8b27] mb-3 block">
                    {exp.label}
                  </span>
                  <h3 className="font-editorial text-xl font-light text-white mb-3">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-5">
                    {exp.desc}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-[#ad8b27] transition-colors duration-300 flex items-center gap-2">
                    Discover
                    <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                      <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                    </svg>
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
