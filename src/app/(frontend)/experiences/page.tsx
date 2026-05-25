import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { FinalBookingCTA } from '@/components/sections/FinalBookingCTA'
import { BOOKING_URL, SITE_URL } from '@/lib/constants'

export const metadata = genMeta({
  title: 'Experiences',
  description: 'The Ocean Spa, pool, activities, weddings, and corporate events at Althea Resorts, Corinthia. Ancient wellness traditions meet contemporary therapies using Oceanis cosmetics.',
  keywords: ['Ocean Spa Althea', 'spa Corinthia Greece', 'Oceanis cosmetics hotel', 'wedding venue Corinthia', 'corporate events Greece'],
  canonical: `${SITE_URL}/experiences`,
})

export default function ExperiencesPage() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-[520px] flex items-end overflow-hidden"
        aria-label="Experiences"
      >
        <Image
          src="https://staging.althearesorts.com/wp-content/uploads/2026/02/1.jpg"
          alt="Althea Resorts — experiences and wellness"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/90 via-[#102027]/30 to-transparent" />
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Experiences</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              This Is What You<br />
              <em className="italic font-light text-white/70">Come Back For</em>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-sm font-light text-white/55 leading-relaxed mt-6 max-w-lg">
              A resort is not only a place to sleep well. Most guests arrive with a plan.
              Most plans change by the second morning.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Activities */}
      <section id="activities" className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80"
                alt="Hiking and activities in Corinthia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Activities</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">Move at Your Own Pace</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The landscape around Althea is not a backdrop. It is part of what you
                  came for. Hiking trails wind through the Corinthian hills with views that
                  stop you mid-step. Cycling routes follow the coastline at whatever speed
                  you choose. Yoga sessions open to the air and the Gulf, the kind where
                  you actually forget to check the time.
                </p>
                <p className="text-body-refined mb-5">
                  The activities at Althea are designed for guests who want to feel the
                  place they are in, not just photograph it from a distance.
                </p>
                <p className="text-body-refined">
                  We are adding more experiences as the resort grows — ask us directly
                  and we will tell you what is coming.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Spa */}
      <section id="spa" className="section-padding bg-[#102027]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden lg:sticky lg:top-32">
              <Image
                src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80"
                alt="Ocean Spa — Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel light className="mb-6">Spa, The Ocean</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-white mb-6">The Body Catches Up<br />With the Mind</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  The Ocean Spa at Althea is not an add-on to the resort experience.
                  It is one of the main reasons to come. The treatments are built around
                  Oceanis cosmetics — a Greek brand drawn from the same sea and land that
                  surrounds the property — and each therapy is chosen for what it actually
                  does, not for how it sounds on a menu.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  The facilities were designed with the same intention as everything else
                  at Althea: nothing excessive, nothing missing. A sauna and a hammam with
                  steam room for heat and release. An ice bath for those who know what
                  follows the cold. A dedicated pool, a relaxation area where time genuinely
                  stops, and a yoga room open to movement and stillness in equal measure.
                  A fully equipped gym for those who need to keep the body honest.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-5">
                  Two single treatment cabins and one double cabin for couples or those who
                  simply want more space around them. Changing rooms, private facilities,
                  and a cosmetics boutique carrying the full Oceanis range.
                </p>
                <p className="text-sm font-light text-white/60 leading-relaxed mb-8">
                  The practitioners here work with your body's own rhythm. They are not
                  in a hurry. They do not want you to be either. You arrive carrying the
                  weight of everything that happened before you got here. An hour later,
                  you have genuinely forgotten what most of it was.
                </p>
              </ScrollReveal>

              {/* Oceanis philosophy */}
              <ScrollReveal delay={250}>
                <div className="border-t border-white/10 pt-8 mb-8">
                  <h3 className="text-label-upper text-[#ad8b27] mb-5">Oceanis: The Philosophy Behind the Product</h3>
                  <p className="text-sm font-light text-white/50 leading-relaxed mb-4">
                    Oceanis takes its name from the Oceanids — the water nymphs of ancient
                    Greek mythology. A Greek brand, rooted in Greek myth, made in Greece,
                    for a property that sits above a Greek gulf. Everything connects.
                  </p>
                  <p className="text-sm font-light text-white/50 leading-relaxed">
                    The formulas are certified biodegradable in twenty-eight days. Packaging
                    is made from recycled PET and is one hundred percent recyclable. Products
                    are vegan, cruelty-free, and dermatologically tested. The full Oceanis
                    range is available in the spa boutique.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <a
                  href="/spa"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white border-b border-white/30 pb-1 hover:text-[#ad8b27] hover:border-[#ad8b27] transition-colors duration-300"
                >
                  Discover the Full Ocean Spa
                  <svg width="16" height="6" viewBox="0 0 16 6" fill="none" aria-hidden="true">
                    <path d="M0 3h14M10 1l3 2-3 2" stroke="currentColor" strokeWidth="0.75" />
                  </svg>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Pool */}
      <section id="pool" className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/3] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80"
                alt="Main pool at Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Swimming Pool</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">The Center of the Day</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The main pool at Althea is where the afternoon organizes itself without
                  any help from you. Clean water, natural materials, sun loungers placed
                  exactly where the light falls right, and the pool bar close enough that
                  you never have to go far for anything. Some guests come down for a swim
                  and stay for four hours. Nobody finds that surprising.
                </p>
                <p className="text-body-refined">
                  There is a particular quality to time by this pool: it moves slower
                  than it does anywhere else. Bring a book. Leave it closed. Both are fine.
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Events header */}
      <section className="section-padding bg-white" aria-label="Events at Althea">
        <div className="container-luxury text-center">
          <ScrollReveal>
            <SectionLabel className="mb-6 justify-center">Events</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-display-sm text-[#102027] mb-6">
              The Occasion Deserves<br />More Than a Venue
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <GoldLine className="mx-auto" />
          </ScrollReveal>
        </div>
      </section>

      {/* Conference Facilities */}
      <section id="conference" className="pt-0 pb-0 section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Corporate Events</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  Meetings That Leave a Mark
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  The best corporate gatherings happen when the environment does some of
                  the work. When people are removed from the familiar offices and the usual
                  rooms, something shifts. Conversations become more direct. Ideas arrive
                  more easily. The tension that builds in ordinary conference settings simply
                  does not follow you here.
                </p>
                <p className="text-body-refined mb-5">
                  At Althea, the spaces are flexible and well-equipped, but it is the
                  setting that makes the real difference: the hills, the sea, the meals
                  together, the evenings that extend naturally into something that feels
                  less like a work trip and more like a reason to trust the people you
                  work with.
                </p>
                <p className="text-body-refined mb-10">
                  Teams leave Althea with decisions made and energy restored.
                  That combination is rarer than it should be.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={220}>
                <h3 className="text-label-upper text-[#102027] mb-4">Conference Facilities</h3>
                <p className="text-body-refined mb-8">
                  The conference room seats up to one hundred people in theatre configuration —
                  a serious space for serious gatherings, without the corporate anonymity that
                  usually comes with it. Fully equipped and adaptable, able to shift from a
                  large plenary to a more intimate working format depending on what the day
                  requires.
                </p>
              </ScrollReveal>

              {/* Configurations */}
              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-[#102027] mb-5">Room Configurations</h3>
                <div className="grid grid-cols-2 gap-3 mb-10">
                  {[
                    { layout: 'Theatre',   capacity: '100 guests' },
                    { layout: 'Classroom', capacity: '60 guests' },
                    { layout: 'U-Shape',   capacity: '40 guests' },
                    { layout: 'Boardroom', capacity: '30 guests' },
                  ].map((c) => (
                    <div key={c.layout} className="border border-[#e8e4dd] p-4">
                      <span className="text-xs uppercase tracking-[0.18em] text-[#ad8b27] block mb-1">{c.layout}</span>
                      <span className="font-editorial text-2xl font-light text-[#102027]">{c.capacity}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Equipment */}
              <ScrollReveal delay={300}>
                <h3 className="text-label-upper text-[#102027] mb-5">Equipment & Services</h3>
                <div className="flex flex-col gap-2 mb-10">
                  {[
                    'High-definition projector & screens',
                    'Wireless microphones & PA system',
                    'High-speed dedicated Wi-Fi',
                    'Flip charts, whiteboards & stationery',
                    'Catering & coffee breaks on request',
                    'Breakout spaces & terrace access',
                    'AV technical support',
                    'Accommodation packages for delegates',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-light text-[#6b6b6b]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={350}>
                <a
                  href={`mailto:reservations@althearesorts.com?subject=Corporate Event Enquiry`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Enquire About Corporate Events
                </a>
              </ScrollReveal>
            </div>

            <ScrollReveal variant="image" delay={100} className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=900&q=80"
                alt="Conference facilities — Althea Resorts"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section id="weddings" className="section-padding bg-[#faf8f4]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal variant="image" className="aspect-[4/5] w-full relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=80"
                alt="Wedding venue — Althea Resorts Corinthia"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </ScrollReveal>
            <div>
              <ScrollReveal>
                <SectionLabel className="mb-6">Weddings</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  A Wedding in Corinthia
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  There are wedding venues, and then there are places where a wedding
                  actually belongs. Althea is the second kind. The hills of Corinthia,
                  the light over the Gulf at that particular hour of the evening, the air
                  that carries something warm and unhurried — no decorator can manufacture
                  any of it.
                </p>
                <p className="text-body-refined mb-5">
                  What we bring to every wedding at Althea is something quieter but more
                  important than aesthetics: the understanding that this day matters to
                  the people living it, not just to the photographs. Our team works closely
                  with every couple from the first conversation to the last dance, making
                  sure that the details hold and the day unfolds the way it was meant to.
                </p>
                <p className="text-body-refined mb-10">
                  Corinthia has been a place of gathering and celebration for thousands
                  of years. Your wedding fits naturally into that history.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={250}>
                <a
                  href={`mailto:reservations@althearesorts.com?subject=Wedding Enquiry`}
                  className="inline-flex items-center gap-2 h-11 px-7
                             text-xs uppercase tracking-[0.2em]
                             bg-[#102027] text-white border border-[#102027]
                             hover:bg-transparent hover:text-[#102027]
                             transition-all duration-500"
                >
                  Enquire About Weddings
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <FinalBookingCTA />
    </main>
  )
}
