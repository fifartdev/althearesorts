import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBookingBar, FloatingBookingButton } from '@/components/layout/BookingCTA'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { hotelSchema, organizationSchema } from '@/lib/seo'
import { getContactInfo, getBookingSettings } from '@/lib/cms'
import '../../(frontend)/globals.css'

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

export default async function GreekLayout({ children }: { children: React.ReactNode }) {
  const [contactInfo, bookingSettings] = await Promise.all([
    getContactInfo(),
    getBookingSettings(),
  ])

  const bookingUrl = (bookingSettings as any)?.bookingEngineUrl || undefined
  const phone = (contactInfo as any)?.phone || undefined
  const address = (contactInfo as any)?.address || undefined
  const email = (contactInfo as any)?.email || undefined

  return (
    <html lang="el" className={`scroll-smooth ${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
                     focus:bg-[#102027] focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Μετάβαση στο κύριο περιεχόμενο
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

        <CustomCursor />
        <Header bookingUrl={bookingUrl} phone={phone} />
        {children}
        <Footer locale="el" phone={phone} email={email} address={address} bookingUrl={bookingUrl} />
        <StickyBookingBar locale="el" bookingUrl={bookingUrl} />
        <FloatingBookingButton bookingUrl={bookingUrl} />
        <CookieConsent locale="el" />
      </body>
    </html>
  )
}
