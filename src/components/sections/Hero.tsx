'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { BOOKING_URL } from '@/lib/constants'

export function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      ;[headlineRef, subtitleRef, ctaRef].forEach((r) => {
        if (r.current) { r.current.style.opacity = '1'; r.current.style.transform = 'none' }
      })
      return
    }

    import('gsap').then(({ default: gsap }) => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from(headlineRef.current, {
        opacity: 0, y: 40, duration: 1.4, ease: 'power3.out',
      })
      .from(subtitleRef.current, {
        opacity: 0, y: 20, duration: 1, ease: 'power2.out',
      }, '-=0.8')
      .from(ctaRef.current, {
        opacity: 0, y: 16, duration: 0.8, ease: 'power2.out',
      }, '-=0.6')
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
          src="https://staging.althearesorts.com/wp-content/uploads/2025/11/Althea-Pool-Infinity-Color.jpg"
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
        <span className="text-white/40 text-[10px] uppercase tracking-[0.25em]" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
          Scroll
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
              Corinthia, Greece
            </span>
          </div>

          {/* Main headline */}
          <h1
            ref={headlineRef}
            className="text-display-xl text-white mb-6"
            style={{ opacity: 0 }}
          >
            Where the Gulf<br />
            <em className="not-italic text-white/80">Begins to Heal You</em>
          </h1>

          {/* Tagline */}
          <p
            ref={subtitleRef}
            className="text-base font-light text-white/65 leading-relaxed max-w-md mb-10"
            style={{ opacity: 0 }}
          >
            41 rooms and suites on the hills of Ano Loutro.
            Sixty minutes from Athens. A world away from everything else.
          </p>

          {/* CTAs */}
          <div
            ref={ctaRef}
            className="flex flex-wrap gap-4"
            style={{ opacity: 0 }}
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
              Reserve a Room
            </a>
            <a
              href="/accommodation"
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-transparent text-white border border-white/40
                         hover:bg-white hover:text-[#102027]
                         transition-all duration-500"
            >
              Explore Rooms
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-4">
          {[
            { value: '41', label: 'Rooms & Suites' },
            { value: '5\'', label: 'To Private Beach' },
            { value: '60\'', label: 'From Athens' },
            { value: '5★', label: 'Experience' },
          ].map((stat) => (
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
