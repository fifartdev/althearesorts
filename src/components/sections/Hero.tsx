'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { BOOKING_URL } from '@/lib/constants'

type Locale = 'en' | 'el'

const content = {
  en: {
    locationLabel: 'Corinthia, Greece',
    scrollLabel: 'Scroll',
    headlineLine1: 'Where the Gulf',
    headlineLine2: 'Begins to Heal You',
    tagline: '41 rooms and suites on the hills of Ano Loutro. Sixty minutes from Athens. A world away from everything else.',
    cta1: 'Reserve a Room',
    cta2: 'Explore Rooms',
    cta2Href: '/accommodation',
    stats: [
      { value: '41', label: 'Rooms & Suites' },
      { value: "60'", label: 'From Athens' },
      { value: '5★', label: 'Experience' },
    ],
  },
  el: {
    locationLabel: 'Κορινθία, Ελλάδα',
    scrollLabel: 'Κύλιση',
    headlineLine1: 'Εκεί που ο Κόλπος',
    headlineLine2: 'Αρχίζει να σε Θεραπεύει',
    tagline: '41 δωμάτια και σουίτες στους λόφους του Άνω Λουτρού. Εξήντα λεπτά από Αθήνα. Ένας κόσμος μακριά από όλα τα άλλα.',
    cta1: 'Κάντε Κράτηση',
    cta2: 'Εξερευνήστε Δωμάτια',
    cta2Href: '/el/accommodation',
    stats: [
      { value: '41', label: 'Δωμάτια & Σουίτες' },
      { value: "60'", label: 'Από Αθήνα' },
      { value: '5★', label: 'Εμπειρία' },
    ],
  },
}

export function Hero({ locale = 'en' }: { locale?: Locale }) {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const c = content[locale]

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      ;[headlineRef, subtitleRef, ctaRef].forEach((r) => {
        if (r.current) {
          r.current.classList.remove('gsap-fade-init')
          r.current.style.opacity = '1'
        }
      })
      return
    }

    import('gsap').then(({ default: gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, ease: 'power3.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.8'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.6'
      )
    })
  }, [])

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-end overflow-hidden"
      aria-label="Hero — Althea Resorts"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/new-images/althea-front.jpg"
          alt="Althea Resorts — Corinthian Gulf views"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
      </div>

      {/* Scroll indicator */}
      <div className="absolute right-8 bottom-1/3 flex flex-col items-center gap-3 z-10 hidden lg:flex">
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em] writing-vertical-rl">
          {c.scrollLabel}
        </span>
        <div className="w-px h-16 bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-scroll-line" />
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container-luxury pb-20 lg:pb-28 w-full">
        <div className="max-w-4xl">
          {/* Location label */}
          <div className="flex items-center gap-3 mb-6">
            <span className="block w-6 h-px bg-[#ad8b27]" />
            <span className="text-label-upper text-white/60">
              {c.locationLabel}
            </span>
          </div>

          {/* Main headline */}
          <h1
            ref={headlineRef}
            className="text-display-xl text-white mb-6 gsap-fade-init"
          >
            {c.headlineLine1}<br />
            <em className="not-italic text-white/80">{c.headlineLine2}</em>
          </h1>

          {/* Tagline */}
          <p
            ref={subtitleRef}
            className="text-base font-light text-white/65 leading-relaxed max-w-md mb-10 gsap-fade-init"
          >
            {c.tagline}
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4 gsap-fade-init"
          >
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-[#ad8b27] text-white border border-[#ad8b27]
                         hover:bg-transparent hover:text-[#ad8b27]
                         transition-all duration-500"
            >
              {c.cta1}
            </a>
            <a
              href={c.cta2Href}
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-transparent text-white border border-white/40
                         hover:bg-white hover:text-[#102027]
                         transition-all duration-500"
            >
              {c.cta2}
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-4">
          {c.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="font-editorial text-2xl font-light text-white">{stat.value}</span>
              <span className="text-label-upper text-white/40">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
