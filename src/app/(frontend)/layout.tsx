import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBookingBar, FloatingBookingButton } from '@/components/layout/BookingCTA'
import { ClientShells } from '@/components/layout/ClientShells'
import { buildHotelSchema, buildOrganizationSchema } from '@/lib/seo'
import { MetaPixel } from '@/components/analytics/MetaPixel'
import { getSite } from '@/lib/wp/site'
import './globals.css'

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  },
}

const GA_ID = 'G-WYCXWW127J'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-canela',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-sohne',
  display: 'swap',
})

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite()
  const { settings, shared, seoGeo } = site
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildHotelSchema(settings, seoGeo)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema(settings, seoGeo)) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
                     focus:bg-[#102027] focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          {site.header.labels.en.skip_link}
        </a>

        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>

        <MetaPixel />

        <Header site={site.header} />
        {children}
        <Footer site={site} />
        <StickyBookingBar tagline={shared.booking_bar.tagline.en} cta={shared.booking_bar.cta.en} bookingUrl={settings.booking_url} ariaLabel={site.header.labels.en.quick_booking} />
        <FloatingBookingButton label={shared.booking_bar.floating_label.en} bookingUrl={settings.booking_url} ariaLabel={site.header.labels.en.floating_book} />
        <ClientShells cookie={{ heading: shared.cookie.heading.en, body: shared.cookie.body.en, accept: shared.cookie.accept.en, reject: shared.cookie.reject.en }} />
      </body>
    </html>
  )
}
