'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Rich } from '@/lib/wp/Rich'

export type GalleryViewItem = { src: string; caption: string; category: string; wide: boolean }

export function GalleryView({
  label,
  heading,
  heroImage,
  heroAlt,
  allLabel,
  categories,
  items,
  ariaLabel,
}: {
  label: string
  heading: string
  heroImage: string
  heroAlt: string
  allLabel: string
  categories: string[]
  items: GalleryViewItem[]
  ariaLabel: string
}) {
  const [activeCategory, setActiveCategory] = useState(allLabel)

  const filtered = activeCategory === allLabel
    ? items
    : items.filter((item) => item.category === activeCategory)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label={ariaLabel}
      >
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">{label}</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              <Rich html={heading} classes={{ em: 'italic font-light text-white/70' }} />
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-10 bg-white border-b border-[#e8e4dd]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {[allLabel, ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-8 px-4 text-xs uppercase tracking-[0.18em] transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-[#102027] text-white border border-[#102027]'
                      : 'bg-transparent text-[#6b6b6b] border border-[#e8e4dd] hover:border-[#102027] hover:text-[#102027]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Masonry */}
      <section className="pb-24 bg-white" aria-label={`${ariaLabel} — ${activeCategory}`}>
        <div className="container-luxury">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((item, i) => (
              <ScrollReveal
                key={item.src + i}
                delay={i * 40}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
              >
                <div className={`w-full relative ${item.wide ? 'aspect-[16/9]' : 'aspect-square'}`}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/40 transition-colors duration-500 flex flex-col items-center justify-center">
                    <p className="text-white text-xs uppercase tracking-widest font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
