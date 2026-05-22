'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

const categories = ['All', 'Rooms & Suites', 'Pool & Exterior', 'Dining', 'Spa & Wellness', 'Views']

const galleryItems = [
  { src: `${S}/Gallery-MUZ36MM.jpg`,                    caption: 'Pool & Gulf Views',       category: 'Pool & Exterior',  wide: true },
  { src: `${S}/Gallery-CBESRFQ.jpg`,                    caption: 'Corinthian Horizon',      category: 'Views',            wide: false },
  { src: `${S}/Gallery-FYCW8WR.jpg`,                    caption: 'Resort Exterior',         category: 'Pool & Exterior',  wide: false },
  { src: `${S}/Gallery-9VZMNYN.jpg`,                    caption: 'Garden & Terraces',       category: 'Pool & Exterior',  wide: false },
  { src: `${S}/Gallery-3CH8F86.jpg`,                    caption: 'Evening by the Pool',     category: 'Pool & Exterior',  wide: true },
  { src: `${S}/althea-exclusive-resorts-spa-1.png`,     caption: 'Standard Double',         category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-2.png`,     caption: 'Room Interior',           category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-3.png`,     caption: 'Room Details',            category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-4.png`,     caption: 'Deluxe Double',           category: 'Rooms & Suites',   wide: true },
  { src: `${S}/althea-exclusive-resorts-spa-5.png`,     caption: 'Deluxe with Pool',        category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-6.png`,     caption: 'Superior Sea View',       category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-8.png`,     caption: 'Junior Suite',            category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-9.png`,     caption: 'Loft Suite',              category: 'Rooms & Suites',   wide: true },
  { src: `${S}/althea-exclusive-resorts-spa-10.png`,    caption: 'Suite Living Area',       category: 'Rooms & Suites',   wide: false },
  { src: `${S}/althea-exclusive-resorts-spa-11.png`,    caption: 'Suite Terrace',           category: 'Rooms & Suites',   wide: false },
  { src: `${S}/1.jpg`,                                  caption: 'The Property',            category: 'Views',            wide: false },
  { src: `${S}/2.jpg`,                                  caption: 'Gulf at Dusk',            category: 'Views',            wide: true },
  { src: `${S}/FAQ-CKK5K7K.jpg`,                        caption: 'Althea Resorts',          category: 'Pool & Exterior',  wide: false },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Gallery"
      >
        <Image
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/Gallery-MUZ36MM.jpg"
          alt="Althea Resorts — gallery"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Gallery</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              The View<br />
              <em className="italic font-light text-white/70">From Here</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter bar */}
      <section className="py-10 bg-white border-b border-[#e8e4dd]">
        <div className="container-luxury">
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {categories.map((cat) => (
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
      <section className="pb-24 bg-white" aria-label={`Gallery — ${activeCategory}`}>
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
