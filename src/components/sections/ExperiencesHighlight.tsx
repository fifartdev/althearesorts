import React from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

type Locale = 'en' | 'el'

export type ExperienceCard = {
  label: string
  title: string
  desc: string
  href: string
  image: string
  imageAlt: string
}

type ExperiencesHighlightProps = {
  locale?: Locale
  label?: string
  headline1?: string
  headline2?: string
  subtext?: string
  discoverLabel?: string
  experiences?: ExperienceCard[]
}

export function ExperiencesHighlight({
  label,
  headline1,
  headline2,
  subtext,
  discoverLabel,
  experiences,
}: ExperiencesHighlightProps) {
  if (!experiences || experiences.length === 0) return null

  return (
    <section
      className="section-padding bg-deep"
      aria-label="Experiences at Althea Resorts"
    >
      <div className="container-luxury">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            {label && (
              <ScrollReveal>
                <SectionLabel light className="mb-6">{label}</SectionLabel>
              </ScrollReveal>
            )}
            {headline1 && (
              <ScrollReveal delay={100}>
                <h2 className="text-display-md text-white">
                  {headline1}<br />
                  {headline2 && <em className="italic font-light text-white/70">{headline2}</em>}
                </h2>
              </ScrollReveal>
            )}
          </div>
          {subtext && (
            <ScrollReveal delay={200}>
              <p className="text-sm font-light text-white/50 max-w-xs leading-relaxed whitespace-pre-line">
                {subtext}
              </p>
            </ScrollReveal>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {experiences.slice(0, 3).map((exp, i) => (
            <ScrollReveal key={exp.title} delay={i * 120}>
              <a
                href={exp.href}
                className="group block overflow-hidden border border-white/10 hover:border-gold/40 transition-colors duration-500"
              >
                <div className="aspect-4/3 relative overflow-hidden">
                  <Image
                    src={exp.image}
                    alt={exp.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-deep/0 group-hover:bg-deep/20 transition-colors duration-500" />
                </div>

                <div className="p-6 bg-deep">
                  <span className="text-label-upper text-gold mb-3 block">
                    {exp.label}
                  </span>
                  <h3 className="font-editorial text-xl font-light text-white mb-3">
                    {exp.title}
                  </h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-5">
                    {exp.desc}
                  </p>
                  {discoverLabel && (
                    <span className="text-xs uppercase tracking-widest text-white/40 group-hover:text-gold transition-colors duration-300 flex items-center gap-2">
                      {discoverLabel}
                      <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                        <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                      </svg>
                    </span>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
