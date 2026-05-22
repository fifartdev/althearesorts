import React from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { BOOKING_URL } from '@/lib/constants'

export function FinalBookingCTA() {
  return (
    <section
      className="relative py-32 lg:py-48 overflow-hidden"
      aria-label="Book your stay"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#f7f4ef]" />

      {/* Large decorative text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span className="font-editorial text-[18vw] font-light text-[#e8e4dd] leading-none">
          Althea
        </span>
      </div>

      <div className="relative z-10 container-narrow text-center">
        <ScrollReveal>
          <span className="text-label-upper text-[#ad8b27] block mb-6">
            Reserve Your Stay
          </span>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-display-lg text-[#102027] mb-6">
            Sixty Minutes<br />From Athens
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-body-refined text-center max-w-md mx-auto mb-12">
            Close enough to be spontaneous. Far enough to feel completely
            removed from the city you left behind.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 px-10 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-[#102027] text-white border border-[#102027]
                         hover:bg-transparent hover:text-[#102027]
                         transition-all duration-500"
            >
              Book Now
            </a>
            <a
              href="/offers"
              className="h-12 px-10 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-transparent text-[#102027] border border-[#102027]
                         hover:bg-[#102027] hover:text-white
                         transition-all duration-500"
            >
              View Offers
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="mt-8 text-xs text-[#a0a0a0] uppercase tracking-widest">
            10% off all direct bookings · Valid until June 30, 2026
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
