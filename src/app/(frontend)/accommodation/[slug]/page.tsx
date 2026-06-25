import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ROOMS, BOOKING_URL, SITE_URL } from '@/lib/constants'
import { getRoom, getRooms } from '@/lib/cms'
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
  const cmsRoom = await getRoom(slug, 'en')
  if (cmsRoom) {
    const image = (typeof (cmsRoom as any).heroImage === 'object'
      ? (cmsRoom as any).heroImage?.url
      : (cmsRoom as any).heroImage) || (cmsRoom as any).imageUrl || ''
    return genMeta({
      title: (cmsRoom as any).title ?? '',
      description: `${(cmsRoom as any).title} at Althea Resorts — ${(cmsRoom as any).shortDescription ?? ''}`,
      keywords: [`${(cmsRoom as any).title} Althea`, 'luxury room Corinthia', 'book hotel room Greece'],
      canonical: `${SITE_URL}/accommodation/${slug}`,
      image,
    })
  }
  const room = ROOMS.find((r) => r.slug === slug)
  if (!room) return {}
  return genMeta({
    title: room.title,
    description: `${room.title} at Althea Resorts — ${room.shortDesc} ${room.size}. ${room.view}.`,
    keywords: [`${room.title} Althea`, 'luxury room Corinthia', 'book hotel room Greece'],
    canonical: `${SITE_URL}/accommodation/${slug}`,
    image: room.image,
  })
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params

  const cmsRoom = await getRoom(slug, 'en')
  const allCmsRooms = await getRooms('en')

  // Normalise to a single shape whether source is CMS or constants
  const room = cmsRoom
    ? {
        slug: (cmsRoom as any).slug ?? slug,
        title: (cmsRoom as any).title ?? '',
        view: (cmsRoom as any).viewType ?? '',
        size: (cmsRoom as any).size ?? '',
        shortDesc: (cmsRoom as any).shortDescription ?? '',
        image: (typeof (cmsRoom as any).heroImage === 'object'
          ? (cmsRoom as any).heroImage?.url
          : (cmsRoom as any).heroImage) || (cmsRoom as any).imageUrl || '',
        images: ((cmsRoom as any).gallery ?? [])
          .map((g: any) => typeof g.image === 'object' ? g.image?.url : g.image)
          .filter(Boolean) as string[],
        features: ((cmsRoom as any).amenities ?? []).map((a: any) => a.label ?? '').filter(Boolean) as string[],
        maxOccupancy: (cmsRoom as any).maxOccupancy ?? 2,
      }
    : (() => {
        const r = ROOMS.find((r) => r.slug === slug)
        if (!r) return null
        return {
          slug: r.slug,
          title: r.title,
          view: r.view,
          size: r.size,
          shortDesc: r.shortDesc,
          image: r.image,
          images: r.images ?? [],
          features: r.features ?? [],
          maxOccupancy: 2,
        }
      })()

  if (!room) notFound()

  const similarRooms = allCmsRooms.length > 0
    ? allCmsRooms
        .filter((r: any) => r.slug !== slug)
        .slice(0, 3)
        .map((r: any) => ({
          slug: r.slug ?? '',
          title: r.title ?? '',
          size: r.size ?? '',
          shortDesc: r.shortDescription ?? '',
          view: r.viewType ?? '',
          image: (typeof r.heroImage === 'object' ? r.heroImage?.url : r.heroImage) || r.imageUrl || '',
        }))
    : ROOMS.filter((r) => r.slug !== slug).slice(0, 3).map((r) => ({
        slug: r.slug, title: r.title, size: r.size,
        shortDesc: r.shortDesc, view: r.view, image: r.image,
      }))

  const hotelRoomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    '@id': `${SITE_URL}/accommodation/${room.slug}#room`,
    name: room.title,
    description: room.shortDesc,
    url: `${SITE_URL}/accommodation/${room.slug}`,
    photo: room.image.startsWith('/') ? `${SITE_URL}${room.image}` : room.image,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: parseInt(room.size) || 0,
      unitCode: 'MTK',
    },
    bed: { '@type': 'BedDetails', typeOfBed: 'King or Twin' },
    occupancy: { '@type': 'QuantitativeValue', maxValue: room.maxOccupancy, minValue: 1 },
    containedInPlace: { '@id': `${SITE_URL}/#hotel` },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelRoomSchema) }}
      />
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-screen min-h-150 overflow-hidden"
        aria-label={room.title}
      >
        {room.image && (
          <Image
            src={room.image}
            alt={room.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-deep/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10 container-luxury pb-16 lg:pb-24">
          <ScrollReveal>
            <span className="text-label-upper text-gold block mb-4">Accommodation</span>
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
              <span>Max {room.maxOccupancy} guests</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-gold text-white border border-gold
                         hover:bg-transparent hover:text-gold
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
                <h2 className="text-display-sm text-deep mb-6">{room.title}</h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined leading-loose mb-8">{room.shortDesc}</p>
              </ScrollReveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={100}>
                <div className="bg-soft p-8 flex flex-col gap-6">
                  <h3 className="text-label-upper text-deep">Room Specifications</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-stone pb-3">
                      <span className="text-sm font-light text-smoke">Size</span>
                      <span className="text-sm font-light text-deep">{room.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone pb-3">
                      <span className="text-sm font-light text-smoke">View</span>
                      <span className="text-sm font-light text-deep">{room.view}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone pb-3">
                      <span className="text-sm font-light text-smoke">Bed</span>
                      <span className="text-sm font-light text-deep">King or Twin</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-sm font-light text-smoke">Occupancy</span>
                      <span className="text-sm font-light text-deep">Max {room.maxOccupancy} guests</span>
                    </div>
                  </div>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-deep text-white border border-deep
                               hover:bg-transparent hover:text-deep
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

      {/* Photo Gallery */}
      {room.images.length > 0 && (
        <section className="section-padding bg-cream" aria-label="Room photo gallery">
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-6">Photo Gallery</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className="text-display-sm text-deep mb-12">The Room in Detail</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {room.images.map((src, i) => (
                <ScrollReveal key={src} delay={i * 40} className="aspect-4/3 relative overflow-hidden group">
                  <Image
                    src={src}
                    alt={`${room.title} — photo ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Amenities */}
      <section className="section-padding bg-soft">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-deep mb-12">Room Amenities</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {room.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 p-4 bg-white border border-stone"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  <span className="text-sm font-light text-deep">{feature}</span>
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
            <h2 className="text-display-sm text-deep mb-12">Other Rooms & Suites</h2>
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
    </>
  )
}
