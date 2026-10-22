import React from 'react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { RoomCard } from '@/components/ui/RoomCard'
import { generateMetadata as genMeta } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'
import { getItems, getPage, getSettings, src, tr } from '@/lib/wp/api'
import { siteDefaults } from '@/lib/wp/metadata'
import { getLabels } from '@/lib/wp/site'
import { splitLines } from '@/lib/wp/text'
import type { Item, Locale } from '@/lib/wp/schema-types'

/** Room texts in the page language, falling back to English per field. */
function roomTexts(room: Item<'althea_room'>, locale: Locale) {
  const f = room.fields
  return { view: tr(f.view, locale), shortDesc: tr(f.short_desc, locale), features: splitLines(tr(f.features, locale)) }
}

async function findRoom(slug: string) {
  const rooms = await getItems('althea_room')
  return { rooms, room: rooms.find((r) => r.slug === slug) }
}

export async function roomStaticParams() {
  return (await getItems('althea_room')).map((room) => ({ slug: room.slug }))
}

export async function roomMetadata(slug: string, locale: Locale): Promise<Metadata> {
  const { room } = await findRoom(slug)
  if (!room) return {}
  const f = room.fields
  const [site, geo] = await Promise.all([siteDefaults(locale), getPage('seo_geo')])
  // The room's own SEO fields win; otherwise defaults built from the room name, description and view.
  const ownKeywords = splitLines(f.seo_keywords[locale])
  const keywords = ownKeywords.length ? ownKeywords : [`${room.title} Althea`, ...splitLines(geo.defaults.room_keywords[locale])]
  const path = locale === 'el' ? `/el/accommodation/${slug}` : `/accommodation/${room.slug}`
  let description = f.seo_description[locale]
  if (!description && locale === 'el') {
    const grDesc = f.short_desc.el
    description = `${room.title} στην Althea Resorts — ${grDesc ? grDesc.slice(0, 80) : f.short_desc.en}. ${tr(f.view, locale)}.`
  }
  if (!description) description = `${room.title} at Althea Resorts — ${f.short_desc.en} ${f.size}. ${f.view.en}.`
  return genMeta({
    title: f.seo_title[locale] || room.title,
    description,
    keywords,
    canonical: `${SITE_URL}${path}`,
    image: src(room.image),
    site,
  })
}

const UI = {
  en: { galleryBg: 'bg-cream', galleryHeading: 'text-deep', galleryCell: 'aspect-4/3' },
  el: { galleryBg: 'bg-[#faf8f4]', galleryHeading: 'text-[#102027]', galleryCell: 'aspect-[4/3]' },
}

export async function RoomPage({ slug, locale }: { slug: string; locale: Locale }) {
  const [{ rooms, room }, c, shared, settings, labels] = await Promise.all([findRoom(slug), getPage('room'), getPage('shared'), getSettings(), getLabels('pages', locale)])
  if (!room) notFound()

  const similarRooms = rooms.filter((r) => r.slug !== slug).slice(0, 3)
  const t = roomTexts(room, locale)
  const ui = UI[locale]
  const image = src(room.image)
  const photos = room.fields.gallery.map((m) => m.url)

  // Structured data is only on the English page (as before the CMS migration).
  const hotelRoomSchema = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    '@id': `${SITE_URL}/accommodation/${room.slug}#room`,
    name: room.title,
    description: room.fields.short_desc.en,
    url: `${SITE_URL}/accommodation/${room.slug}`,
    photo: image.startsWith('/') ? `${SITE_URL}${image}` : image,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: parseInt(room.fields.size),
      unitCode: 'MTK',
    },
    bed: { '@type': 'BedDetails', typeOfBed: room.fields.schema_bed },
    occupancy: { '@type': 'QuantitativeValue', maxValue: Number(room.fields.schema_occupancy_max), minValue: Number(room.fields.schema_occupancy_min) },
    containedInPlace: {
      '@id': `${SITE_URL}/#hotel`,
    },
  }

  return (
    <>
      {locale === 'en' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelRoomSchema) }}
        />
      )}
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-screen min-h-[600px] overflow-hidden"
        aria-label={room.title}
      >
        <Image
          src={image}
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
            <span className="text-label-upper text-[#ad8b27] block mb-4">{c.hero.label[locale]}</span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-lg text-white mb-6">{room.title}</h1>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-6 text-sm font-light text-white/70 mb-8">
              <span>{room.fields.size}</span>
              <span>·</span>
              <span>{t.view}</span>
              <span>·</span>
              <span>{c.hero.guests[locale]}</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <a
              href={room.fields.booking_url || settings.booking_url}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-8 inline-flex items-center
                         text-xs uppercase tracking-[0.2em]
                         bg-[#ad8b27] text-white border border-[#ad8b27]
                         hover:bg-transparent hover:text-[#ad8b27]
                         transition-all duration-500"
            >
              {c.hero.cta[locale]}
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
                <SectionLabel className="mb-6">{c.description.label[locale]}</SectionLabel>
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
                  {t.shortDesc}
                </p>
              </ScrollReveal>
            </div>

            {/* Specs sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={100}>
                <div className="bg-[#f2f8fb] p-8 flex flex-col gap-6">
                  <h3 className="text-label-upper text-[#102027]">{c.specs.heading[locale]}</h3>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">{c.specs.size[locale]}</span>
                      <span className="text-sm font-light text-[#102027]">{room.fields.size}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">{c.specs.view[locale]}</span>
                      <span className="text-sm font-light text-[#102027]">{t.view}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#e8e4dd] pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">{c.specs.bed[locale]}</span>
                      <span className="text-sm font-light text-[#102027]">{c.specs.bed_value[locale]}</span>
                    </div>
                    <div className="flex justify-between pb-3">
                      <span className="text-sm font-light text-[#6b6b6b]">{c.specs.occupancy[locale]}</span>
                      <span className="text-sm font-light text-[#102027]">{c.specs.occupancy_value[locale]}</span>
                    </div>
                  </div>
                  <a
                    href={room.fields.booking_url || settings.booking_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-6 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-[#102027] text-white border border-[#102027]
                               hover:bg-transparent hover:text-[#102027]
                               transition-all duration-500 w-full"
                  >
                    {c.specs.cta[locale]}
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <section className={`section-padding ${ui.galleryBg}`} aria-label={labels.room_gallery}>
          <div className="container-luxury">
            <ScrollReveal>
              <SectionLabel className="mb-6">{c.gallery.label[locale]}</SectionLabel>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <h2 className={`text-display-sm ${ui.galleryHeading} mb-12`}>{c.gallery.heading[locale]}</h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {photos.map((photo, i) => (
                <ScrollReveal key={photo} delay={i * 40} className={`${ui.galleryCell} relative overflow-hidden group`}>
                  <Image
                    src={photo}
                    alt={c.gallery.photo_alt[locale].replace('{room}', room.title).replace('{n}', String(i + 1))}
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
      <section className="section-padding bg-[#f2f8fb]">
        <div className="container-luxury">
          <ScrollReveal>
            <h2 className="text-display-sm text-[#102027] mb-12">{c.amenities.heading[locale]}</h2>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {t.features.map((feature) => (
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
            <h2 className="text-display-sm text-[#102027] mb-12">{c.similar.heading[locale]}</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {similarRooms.map((r, i) => {
              const card = roomTexts(r, locale)
              return (
                <ScrollReveal key={r.slug} delay={i * 80}>
                  <RoomCard
                    slug={r.slug}
                    href={locale === 'el' ? `/el/accommodation/${r.slug}` : undefined}
                    title={r.title}
                    size={r.fields.size}
                    shortDesc={card.shortDesc}
                    view={card.view}
                    image={src(r.image)}
                    discoverLabel={shared.room_card.discover[locale]}
                  />
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>
    </main>
    </>
  )
}
