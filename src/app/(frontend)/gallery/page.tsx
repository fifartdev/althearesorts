'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const S = 'https://staging.althearesorts.com/wp-content/uploads/2026/02'

const categories = ['All', 'Rooms & Suites', 'Pool & Exterior', 'Dining', 'Lobby & Reception', 'Breakfast', 'Spa & Wellness', 'Views']

const galleryItems = [
  { src: '/images/new-images/althea-front.jpg',         caption: 'Althea Resorts',          category: 'Pool & Exterior',  wide: true },
  { src: '/images/main-pool.jpg',                        caption: 'Main Pool',               category: 'Pool & Exterior',  wide: false },
  { src: `${S}/Gallery-9VZMNYN.jpg`,                    caption: 'Garden & Terraces',       category: 'Pool & Exterior',  wide: false },
  { src: '/images/new-images/New-Hero.jpg',             caption: 'The Resort',              category: 'Pool & Exterior',  wide: false },

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

  { src: '/images/new-images/althea-side-images1.jpg',  caption: 'Corinthian Gulf Views',   category: 'Views',            wide: true },
  { src: '/images/new-images/althea-side-images2.jpg',  caption: 'Corinthian Coast',        category: 'Views',            wide: false },
  { src: '/images/new-images/althea-side-images3.jpg',  caption: 'The Surroundings',        category: 'Views',            wide: false },
  { src: '/images/new-images/althea-side-images4.jpg',  caption: 'Landscape & Nature',      category: 'Views',            wide: false },
  { src: `${S}/1.jpg`,                                  caption: 'The Property',            category: 'Views',            wide: false },
  { src: `${S}/2.jpg`,                                  caption: 'Gulf at Dusk',            category: 'Views',            wide: false },

  { src: `${S}/FAQ-CKK5K7K.jpg`,                        caption: 'Althea Resorts',          category: 'Pool & Exterior',  wide: false },
  { src: '/images/oceanisphoto.jpg',                    caption: 'Oceanis — Spa Products',  category: 'Spa & Wellness',   wide: false },

  { src: '/images/breakfast/althea-breakfast-1.jpg',   caption: 'Morning Spread',          category: 'Breakfast',           wide: true },
  { src: '/images/breakfast/althea-breakfast-2.jpg',   caption: 'Fresh Pastries',          category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-3.jpg',   caption: 'Local Honey & Cheeses',   category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-4.jpg',   caption: 'Seasonal Fruit',          category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-5.jpg',   caption: 'Greek Breakfast',         category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-6.jpg',   caption: 'The Breakfast Table',     category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-7.jpg',   caption: 'Breakfast at Althea',     category: 'Breakfast',           wide: true },
  { src: '/images/breakfast/althea-breakfast-8.jpg',   caption: 'Morning Ritual',          category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-9.jpg',   caption: 'Fresh from the Kitchen',  category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-10.jpg',  caption: 'Morning Light',           category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-11.jpg',  caption: 'Buffet Selection',        category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-12.jpg',  caption: 'Village Cheeses',         category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-13.jpg',  caption: 'Mediterranean Morning',   category: 'Breakfast',           wide: true },
  { src: '/images/breakfast/althea-breakfast-14.jpg',  caption: 'Slow Mornings',           category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-15.jpg',  caption: 'Morning Coffee',          category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-16.jpg',  caption: 'Breakfast Spread',        category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-17.jpg',  caption: 'Freshly Baked',           category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-18.jpg',  caption: 'The Morning Table',       category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-19.jpg',  caption: 'Breakfast by the Sea',    category: 'Breakfast',           wide: true },
  { src: '/images/breakfast/althea-breakfast-20.jpg',  caption: 'Harvest & Honey',         category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-21.jpg',  caption: 'A Greek Morning',         category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-22.jpg',  caption: 'Morning Details',         category: 'Breakfast',           wide: false },
  { src: '/images/breakfast/althea-breakfast-23.jpg',  caption: 'The Breakfast Hour',      category: 'Breakfast',           wide: false },

  // Restaurant & Dining
  { src: '/images/restaurant/althea-indoor-outdoor-9.jpg',   caption: 'Dining at Althea',        category: 'Dining',              wide: true },
  { src: '/images/restaurant/althea-indoor-outdoor-10.jpg',  caption: 'Restaurant Terrace',      category: 'Dining',              wide: false },
  { src: '/images/restaurant/althea-indoor-outdoor-11.jpg',  caption: 'Indoor Dining',           category: 'Dining',              wide: false },
  { src: '/images/restaurant/althea-indoor-outdoor-12.jpg',  caption: 'The Dining Room',         category: 'Dining',              wide: false },

  // Lobby & Reception
  { src: '/images/reception/althea-indoor-outdoor-1.jpg',    caption: 'Althea Lobby',            category: 'Lobby & Reception',   wide: true },
  { src: '/images/reception/althea-indoor-outdoor-2.jpg',    caption: 'Reception',               category: 'Lobby & Reception',   wide: false },
  { src: '/images/reception/althea-indoor-outdoor-3.jpg',    caption: 'Hotel Interior',          category: 'Lobby & Reception',   wide: false },
  { src: '/images/reception/althea-indoor-outdoor-4.jpg',    caption: 'Lobby Details',           category: 'Lobby & Reception',   wide: false },
  { src: '/images/reception/althea-indoor-outdoor-5.jpg',    caption: 'The Welcome',             category: 'Lobby & Reception',   wide: false },
  { src: '/images/reception/althea-indoor-outdoor-6.jpg',    caption: 'Arrival at Althea',       category: 'Lobby & Reception',   wide: true },
  { src: '/images/reception/althea-indoor-outdoor-7.jpg',    caption: 'Common Areas',            category: 'Lobby & Reception',   wide: false },
  { src: '/images/reception/althea-indoor-outdoor-8.jpg',    caption: 'Interior Design',         category: 'Lobby & Reception',   wide: false },

  // Outdoor Pool
  { src: '/images/outdoor-pool/althea-indoor-outdoor-13.jpg', caption: 'Outdoor Pool',           category: 'Pool & Exterior',     wide: true },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-14.jpg', caption: 'Pool at Sunset',         category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-15.jpg', caption: 'Pool Terrace',           category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-16.jpg', caption: 'The Pool',               category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-17.jpg', caption: 'Poolside',               category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-18.jpg', caption: 'Summer at the Pool',     category: 'Pool & Exterior',     wide: true },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-19.jpg', caption: 'Pool Views',             category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-20.jpg', caption: 'Afternoon Swim',         category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-21.jpg', caption: 'By the Water',           category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-22.jpg', caption: 'Pool & Gulf',            category: 'Pool & Exterior',     wide: false },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-23.jpg', caption: 'Pool Garden',            category: 'Pool & Exterior',     wide: true },
  { src: '/images/outdoor-pool/althea-indoor-outdoor-24.jpg', caption: 'Outdoor Living',         category: 'Pool & Exterior',     wide: false },
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
          src="/images/main-pool.jpg"
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
