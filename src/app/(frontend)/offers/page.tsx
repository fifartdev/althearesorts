import React from 'react'
import Image from 'next/image'
import { generateMetadata as genMeta } from '@/lib/seo'
import { ScrollReveal } from '@/components/animations/ScrollReveal'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { GoldLine } from '@/components/ui/GoldLine'
import { DirectBookingReasons } from '@/components/sections/DirectBookingReasons'
import { SITE_URL } from '@/lib/seo'
import { getOffers, getContactInfo, getBookingSettings } from '@/lib/cms'

export const metadata = genMeta({
  title: 'Offers & Special Rates',
  description: '10% off for all direct bookings at Althea Resorts. Opening offer for the first season. Book direct via our website, phone, or email for the best rate guaranteed.',
  keywords: ['Althea Resorts offers', 'hotel discount Corinthia', 'direct booking discount Greece', 'opening offer hotel'],
  canonical: `${SITE_URL}/offers`,
})

export default async function OffersPage() {
  const [offerDocs, contactInfo, bookingSettings] = await Promise.all([
    getOffers('en'),
    getContactInfo(),
    getBookingSettings(),
  ])
  const phone: string | undefined = (contactInfo as any)?.phone || undefined
  const email: string | undefined = (contactInfo as any)?.email || undefined
  const bookingUrl: string | undefined = (bookingSettings as any)?.bookingEngineUrl || undefined
  const b = bookingSettings as any
  const directReasons = b?.reasons?.length > 0
    ? (b.reasons as any[]).map((r: any) => ({ title: r.title ?? '', body: r.body ?? '' })).filter((r: any) => r.title)
    : undefined

  const offerEndDate: string | null = b?.openingOfferEndDate
    ? new Date(b.openingOfferEndDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  const firstOffer = (offerDocs as any[])?.[0]
  const offerSchema = firstOffer
    ? {
        '@context': 'https://schema.org',
        '@type': 'Offer',
        name: firstOffer.name || firstOffer.title,
        ...(firstOffer.description ? { description: firstOffer.description } : {}),
        url: `${SITE_URL}/offers`,
        priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'EUR' },
        ...(firstOffer.validThrough ? { validThrough: firstOffer.validThrough } : {}),
        seller: { '@id': `${SITE_URL}/#hotel` },
        eligibleCustomerType: 'http://purl.org/goodrelations/v1#EndUser',
      }
    : null
  return (
    <>
      {offerSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
        />
      )}
    <main id="main-content">
      {/* Hero */}
      <section
        className="relative h-[70vh] min-h-130 flex items-end overflow-hidden"
        aria-label="Offers"
      >
        <Image
          src="/images/new-images/althea-deluxe-double7.jpg"
          alt="Althea Resorts — special offers"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-deep/90 via-deep/30 to-transparent" />
        {/* Large decorative "10%" */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 font-editorial text-[18vw] font-light text-white/6 leading-none select-none pointer-events-none" aria-hidden="true">
          10%
        </div>
        <div className="relative z-10 container-luxury pb-16 lg:pb-24 w-full">
          <ScrollReveal>
            <SectionLabel light className="mb-5">Offers</SectionLabel>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="text-display-xl text-white max-w-2xl">
              A Reason to Book Now<br />
              <em className="italic font-light text-white/70">and Book Direct</em>
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Page Intro */}
      <section className="section-padding bg-white border-b border-stone">
        <div className="container-narrow text-center">
          <ScrollReveal>
            <GoldLine className="mx-auto mb-8" />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <p className="text-body-refined text-lg leading-relaxed mb-5">
              Althea opens its doors with an offer that reflects the way we think about
              hospitality: straightforward, generous, and without the fine print that makes
              you read twice. Book directly with us and receive ten percent off your stay.
              No intermediaries, no platform fees, no complicated conditions.
            </p>
            <p className="font-editorial text-xl font-light italic text-deep">
              Just a better rate for choosing to come to us first.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Opening Offer */}
      <section className="section-padding bg-white">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <div className="inline-flex items-center gap-2 bg-gold text-white px-4 py-2 mb-8">
                  <span className="text-xs uppercase tracking-[0.2em]">Opening Offer</span>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={100}>
                <h2 className="text-display-md text-deep mb-6">
                  10% Off for Direct Bookings
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <GoldLine className="mb-8" />
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <p className="text-body-refined mb-5">
                  To mark the opening of Althea Resorts, we are offering a ten percent
                  discount on all direct reservations made through our website or by
                  contacting us directly.
                </p>
                <p className="text-body-refined mb-5">
                  This offer is available for bookings made until {offerEndDate ?? 'the end of the opening season'} and
                  applies across all room categories — from the Standard Double to the
                  Althea Loft Suite with Outdoor Jacuzzi.
                </p>
                <p className="text-body-refined mb-5">
                  Booking direct also means you speak to us directly. Questions about your
                  stay, requests before arrival, specific arrangements — all handled by the
                  people who actually know the property, without a third party in between.
                </p>
                <p className="text-body-refined mb-10">
                  This is how we prefer to welcome our first guests. With a real offer
                  and a direct conversation.
                </p>
              </ScrollReveal>

              {/* Conditions */}
              <ScrollReveal delay={250}>
                <h3 className="text-label-upper text-deep mb-5">Offer Conditions</h3>
                <div className="flex flex-col gap-3 mb-10">
                  {[
                    'Valid for all room categories',
                    'Direct bookings only via althearesorts.com or by phone and email',
                    offerEndDate ? `Bookings made until ${offerEndDate}` : 'Bookings made during the opening season',
                    'Cannot be combined with other promotions',
                  ].map((cond) => (
                    <div key={cond} className="flex items-start gap-3 text-sm font-light text-smoke">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 mt-1.5" />
                      {cond}
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <h3 className="text-label-upper text-deep mb-5">How to Book</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-7 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-deep text-white border border-deep
                               hover:bg-transparent hover:text-deep
                               transition-all duration-500"
                  >
                    Book Online
                  </a>
                  )}
                  {phone && (
                  <a
                    href={`tel:${phone.replace(/\s/g, '')}`}
                    className="h-11 px-7 inline-flex items-center justify-center
                               text-xs uppercase tracking-[0.2em]
                               bg-transparent text-deep border border-deep
                               hover:bg-deep hover:text-white
                               transition-all duration-500"
                  >
                    {phone}
                  </a>
                  )}
                </div>
                {email && (
                <p className="mt-4 text-sm font-light text-smoke">
                  Or write to us at{' '}
                  <a href={`mailto:${email}`} className="text-gold hover:underline">
                    {email}
                  </a>
                </p>
                )}
              </ScrollReveal>
            </div>

            {/* Offer card */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={150}>
                <div className="bg-deep p-10 text-center sticky top-32">
                  <span className="text-label-upper text-gold block mb-4">Opening Offer</span>
                  <div className="font-editorial text-8xl font-light text-white leading-none mb-4">
                    10%
                  </div>
                  <p className="text-sm font-light text-white/60 mb-8">
                    Off your entire stay when you book direct
                  </p>
                  <p className="text-xs font-light text-white/40 uppercase tracking-wider mb-8">
                    {offerEndDate ? `Valid until ${offerEndDate}` : 'Opening season offer'}
                  </p>
                  {bookingUrl && (
                  <a
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-11 px-7 inline-flex items-center justify-center w-full
                               text-xs uppercase tracking-[0.2em]
                               bg-gold text-white border border-gold
                               hover:bg-transparent hover:text-gold
                               transition-all duration-500"
                  >
                    Claim This Offer
                  </a>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <DirectBookingReasons
        label={b?.directBookingLabel || undefined}
        headline1={b?.directBookingHeadline1 || undefined}
        headline2={b?.directBookingHeadline2 || undefined}
        intro={b?.directBookingIntro || undefined}
        ctaLabel={b?.directBookingCtaLabel || undefined}
        reasons={directReasons}
        bookingUrl={bookingUrl}
      />
    </main>
    </>
  )
}
