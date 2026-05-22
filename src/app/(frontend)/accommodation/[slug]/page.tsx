import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ROOMS, BOOKING_URL, SITE_URL } from '@/lib/constants'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { RoomCard } from '@/components/ui/RoomCard'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const room = ROOMS.find((r) => r.slug === slug)
  if (!room) return {}
  return genMeta({
    title: room.title,
    description: `${room.title} at Althea Resorts — ${room.shortDesc} ${room.size}. ${room.view}.`,
    keywords: [`${room.title} Althea`, 'luxury room Corinthia', 'book hotel room Greece'],
    canonical: `${SITE_URL}/accommodation/${room.slug}`,
    image: room.image,
  })
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params
  const room = ROOMS.find((r) => r.slug === slug)
  if (!room) notFound()

  const similarRooms = ROOMS.filter((r) => r.slug !== slug).slice(0, 3)

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-screen min-h-[600px] overflow-hidden"
        aria-label={room.title}
      >
        <Image
          src={room.image}
          alt={room.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#102027]/80 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 container-luxury pb-16 lg:pb-24">
          <ScrollReveal>
            <span className="text-label-upper text-[#ad8b27] block mb-4">Accommodation</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-white mb-6">{room.title}</h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-6 text-sm font-light text-white/70 mb-8">
              <span>{room.size}</span>
              <span>·</span>
              <span>{room.view}</span>
              <span>·</span>
              <span>Max 2 guests</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
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
              Check Availability
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Description */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <SectionLabel className="mb-6">The Room</SectionLabel>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-sm text-[#102027] mb-6">
                  {room.title}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined leading-loose mb-8">
                  {room.shortDesc}
                </p>
              </ScrollReveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={100}>
                <div className="bg-[#f2f8fb] p-8 flex flex-col gap-6">
                  <h3 className="text-label-upper text-[#102027]">Room Specifications</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Size</span>
                      <span className="text-sm font-light text-[#102027]">{room.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">View</span>
                      <span className="text-sm font-light text-[#102027]">{room.view}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Bed</span>
                      <span className="text-sm font-light text-[#102027]">King or Twin</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">Occupancy</span>
                      <span className="text-sm font-light text-[#102027]">Max 2 guests</span>
                    </div>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-[#102027] text-white border border-[#102027]
                               hover:bg-transparent hover:text-[#102027]
                               transition-all duration-500 w-full"
                  >
                    Book This Room
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-[#102027] mb-12">Room Amenities</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {room.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-white border border-[#e8e4dd]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ad8b27] shrink-0" />
                  <span className="text-sm font-light text-[#102027]">{feature}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Similar Rooms */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-[#102027] mb-12">Other Rooms & Suites</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {similarRooms.map((r, i) => (
              <ScrollReveal key={r.slug} delay={i * 80}>
                <RoomCard
                  slug={r.slug}
                  title={r.title}
                  size={r.size}
                  shortDesc={r.shortDesc}
                  view={r.view}
                  image={r.image}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
