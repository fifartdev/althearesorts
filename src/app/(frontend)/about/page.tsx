import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { StatBar } from '@/components/ui/StatBar'

export const metadata = genMeta({
  title: 'About Us',
  description: 'Althea Resorts — built on a simple idea. Luxury is about how a place makes you feel. 41 rooms and suites on the hillside of Ano Loutro, Corinthia, Greece.',
  keywords: ['luxury hotel Greece', 'boutique resort Corinthia', 'about Althea Resorts'],
  canonical: `${SITE_URL}/about`,
})

export default function AboutPage() {
  return (
    <main id="main-content">
      {/* Page Hero */}
      <section
        className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 bg-[#35657a] overflow-hidden"
        aria-label="About Us"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-editorial text-[22vw] font-light text-white leading-none select-none">
            Althea
          </div>
        </div>
        <div className="relative z-10 container-luxury">
          <ScrollReveal>
            <SectionLabel light className="mb-6">About Us</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-3xl">
              Redefining Hospitality With Timeless Elegance
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="font-editorial text-2xl font-light text-[#102027] leading-relaxed mb-8">
                  There is a moment, usually on the second day, when a guest
                  at Althea stops thinking about what they left behind.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <p className="text-body-refined mb-6">
                  The emails, the traffic, the particular weight of ordinary life. It happens
                  without effort. The hills of Corinthia do part of the work. The light over
                  the Gulf does the rest. We built Althea for that moment and everything about
                  this property, from the architecture to the breakfast table to the hands in
                  the spa, is designed to bring it closer.
                </p>
                <p className="text-body-refined">
                  Althea Resorts sits on the gentle hillside of Ano Loutro, near Xylokastro,
                  sixty minutes from Athens and a world away from the rhythm that most of our
                  guests arrive carrying. The name comes from the ancient Greek word <em>althos</em>,
                  meaning healing. That was not a random decision. It was a statement of intent.
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={200}>
                <StatBar stats={[
                  { value: '41', label: 'Rooms & Suites' },
                  { value: '6', label: 'Room Categories' },
                  { value: '5\'', label: 'To Private Beach' },
                  { value: '60\'', label: 'From Athens' },
                ]} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="/images/new-images/New-Hero.jpg"
                alt="Althea Resorts — pool and hillside"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Who We Are</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Built on a Simple Idea
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  We believe that luxury is not about the number of amenities on a list.
                  It is about how a place makes you feel when you are inside it: the quality
                  of the light in the morning, the temperature of the water in the pool,
                  the way a meal arrives when you are hungry and disappears when you are done.
                </p>
                <p className="text-body-refined mb-5">
                  It is the <a href="/gastronomy" className="text-[#ad8b27] hover:underline font-light">breakfast</a> made
                  from what the local farmers brought in that morning. It is the{' '}
                  <a href="/spa" className="text-[#ad8b27] hover:underline font-light">spa</a> treatment
                  that uses what this land and this sea have always produced. It is the staff
                  member who remembers your name on the second day without being reminded.
                </p>
                <p className="text-body-refined mb-5">
                  Althea was designed around these details. Forty-one{' '}
                  <a href="/accommodation" className="text-[#ad8b27] hover:underline font-light">rooms and suites</a>,
                  each one positioned to make the most of the Corinthian landscape. A rooftop
                  restaurant, AITHER, that tells a different Mediterranean story every evening.
                  A spa — the Ocean Spa — built as a modern Asclepeion, where ancient wellness
                  traditions meet contemporary therapies using Oceanis cosmetics, a Greek brand
                  as rooted in this land as we are.
                </p>
                <p className="text-body-refined">
                  A private <a href="/location" className="text-[#ad8b27] hover:underline font-light">beach</a> five
                  minutes away. A kitchen that begins every morning with what is fresh, local,
                  and worth eating.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Where We Are */}
      <section className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <SectionLabel light className="mb-6">Where We Are</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-8">
                  Corinthia,<br />Reconsidered
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  Most people know Corinthia as a place they passed through. A stretch of
                  motorway between Athens and the Peloponnese, a glimpse of the canal,
                  a note to stop sometime. Althea is the reason to stop.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  The region is one of the most historically rich and least touristically
                  crowded parts of Greece — Ancient Corinth, the Acrocorinth, the Corinth Canal,
                  the coastline of the Gulf, all within reach, all still quiet enough
                  to feel like a discovery.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  The town of Xylokastro sits ten minutes from our door, with its seafront,
                  its fish, and its unhurried pace. The sea is always close. Athens is sixty
                  minutes away.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed">
                  Everything else can wait..
                </p>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1698933464922-cb7af8fe9267?auto=format&fit=crop&w=900&q=80"
                  alt="Ancient stone pillars at Corinth"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <SectionLabel className="mb-6 justify-center">What We Stand For</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="text-display-sm text-[#102027] mb-8">
                Greek Hospitality, Without the Script
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <GoldLine className="mx-auto mb-10" />
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p className="text-body-refined text-center mb-6">
                Greek hospitality is not a concept that needs explaining to a Greek.
                It is something you grow up understanding, that a guest is to be received
                properly, fed well, made comfortable, and sent away with the feeling that
                they were genuinely wanted. At Althea, we have taken that instinct and built
                a five-star property around it. The result is a place that feels neither
                stiff nor casual, neither anonymous nor intrusive. It feels, if we have done
                our job correctly, like the best version of somewhere you already belong.
              </p>
              <p className="text-body-refined text-center mb-6">
                Sixty minutes from Athens. Not sixty minutes and a ferry. Not sixty minutes
                and a connecting flight. Sixty minutes by car, on a good road, with the Gulf
                appearing on your left before you have finished your first coffee. That proximity
                is one of the quiet advantages of Althea, close enough to be spontaneous,
                far enough to feel completely removed from the city you left behind.
              </p>
              <p className="font-editorial text-xl font-light italic text-[#102027] mt-8">
                "This is Greek hospitality at its most honest. Not performed for tourists.
                Not packaged for a brochure. Simply offered, the way it has always been
                offered here, to anyone who arrives at the door."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
  )
}
