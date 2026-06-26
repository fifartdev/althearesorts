'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'

interface HeroStat { value: string; label: string }

interface HeroProps {
  locale?: 'en' | 'el'
  heroImage?: string
  headline1?: string
  headline2?: string
  tagline?: string
  locationLabel?: string
  scrollLabel?: string
  cta1Label?: string
  cta1Url?: string
  cta2Label?: string
  cta2Href?: string
  stats?: HeroStat[]
}

export function Hero({
  locale = 'en',
  heroImage,
  headline1,
  headline2,
  tagline,
  locationLabel,
  scrollLabel,
  cta1Label,
  cta1Url,
  cta2Label,
  cta2Href,
  stats = [],
}: HeroProps = {}) {
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
        {heroImage ? (
          <Image
            src={heroImage}
            alt="Althea Resorts — Corinthian Gulf views"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-deep" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" />
      </div>

      {/* Scroll indicator */}
      {scrollLabel && (
        <div className="absolute right-8 bottom-1/3 flex-col items-center gap-3 z-10 hidden lg:flex">
          <span className="text-white/40 text-[10px] uppercase tracking-[0.25em]" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
            {scrollLabel}
          </span>
          <div className="w-px h-16 bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white/60 animate-scroll-line" />
          </div>
        </div>
      )}

      {/* Hero content */}
      <div className="relative z-10 container-luxury pb-20 lg:pb-28 w-full">
        <div className="max-w-4xl">
          {/* Location label */}
          {locationLabel && (
            <div className="flex items-center gap-3 mb-6">
              <span className="block w-6 h-px bg-gold" />
              <span className="text-label-upper text-white/60">
                {locationLabel}
              </span>
            </div>
          )}

          {/* Main headline */}
          {(headline1 || headline2) && (
            <h1
              ref={headlineRef}
              className="text-display-xl text-white mb-6"
              style={{ opacity: 0 }}
            >
              {headline1}
              {headline1 && headline2 && <br />}
              {headline2 && <em className="not-italic text-white/80">{headline2}</em>}
            </h1>
          )}

          {/* Tagline */}
          {tagline && (
            <p
              ref={subtitleRef}
              className="text-base font-light text-white/65 leading-relaxed max-w-md mb-10"
              style={{ opacity: 0 }}
            >
              {tagline}
            </p>
          )}

          {/* CTAs */}
          {(cta1Url || cta2Href) && (
            <div
              ref={ctaRef}
              className="flex flex-wrap gap-4"
              style={{ opacity: 0 }}
            >
              {cta1Url && cta1Label && (
                <a
                  href={cta1Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-11 px-8 inline-flex items-center
                             text-xs uppercase tracking-[0.2em]
                             bg-gold text-white border border-gold
                             hover:bg-transparent hover:text-gold
                             transition-all duration-500"
                >
                  {cta1Label}
                </a>
              )}
              {cta2Href && cta2Label && (
                <a
                  href={cta2Href}
                  className="h-11 px-8 inline-flex items-center
                             text-xs uppercase tracking-[0.2em]
                             bg-transparent text-white border border-white/40
                             hover:bg-white hover:text-deep
                             transition-all duration-500"
                >
                  {cta2Label}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Stats row */}
        {stats.length > 0 && (
          <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap gap-x-12 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="font-editorial text-2xl font-light text-white">{stat.value}</span>
                <span className="text-label-upper text-white/40">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
