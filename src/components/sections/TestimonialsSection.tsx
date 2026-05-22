'use client'

import React, { useState } from 'react'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'

const testimonials = [
  {
    quote: "The morning we left, we sat on the balcony for an extra hour because neither of us could quite bring ourselves to move. The Gulf was doing something with the light that we didn't have a name for. Althea is the kind of place that earns its name.",
    name: 'Sophie M.',
    origin: 'Paris, France',
    stay: 'Junior Suite with Private Pool',
  },
  {
    quote: "Sixty minutes from Athens and it feels like a different world. The spa team worked with us both and by the second treatment I had genuinely forgotten what day it was. I came back three months later.",
    name: 'Andreas K.',
    origin: 'Athens, Greece',
    stay: 'Althea Loft Suite',
  },
  {
    quote: "Narrativa is the kind of restaurant that changes your expectations. The menu told a story across every course. The views made it impossible to be anywhere else in your mind.",
    name: 'Catherine R.',
    origin: 'London, United Kingdom',
    stay: 'Superior Sea View Room',
  },
]

export function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const t = testimonials[active]

  return (
    <section className="section-padding bg-[#f2f8fb]" aria-label="Guest testimonials">
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Label + selector */}
          <div className="lg:col-span-3">
            <ScrollReveal>
              <SectionLabel className="mb-8">Guest Stories</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-10">
                Heard at<br />Checkout
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="flex flex-col gap-3">
                {testimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`text-left text-xs uppercase tracking-widest font-light transition-all duration-300 flex items-center gap-3 ${
                      active === i ? 'text-[#102027]' : 'text-[#a0a0a0]'
                    }`}
                  >
                    <span className={`block w-4 h-px transition-all duration-300 ${active === i ? 'bg-[#ad8b27] w-6' : 'bg-[#a0a0a0]'}`} />
                    {t.name}
                  </button>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Quote */}
          <div className="lg:col-span-9">
            <ScrollReveal>
              <blockquote className="relative">
                <span className="absolute -top-6 -left-4 font-editorial text-8xl text-[#ad8b27]/20 leading-none select-none" aria-hidden="true">"</span>
                <p className="font-editorial text-2xl lg:text-3xl font-light text-[#102027] leading-relaxed mb-8 relative z-10">
                  {t.quote}
                </p>
                <footer className="flex items-center gap-4">
                  <span className="block w-8 h-px bg-[#ad8b27]" />
                  <div>
                    <cite className="not-italic text-sm font-light text-[#102027] uppercase tracking-wider">
                      {t.name}
                    </cite>
                    <span className="block text-xs font-light text-[#6b6b6b] uppercase tracking-wider mt-0.5">
                      {t.origin} · {t.stay}
                    </span>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
