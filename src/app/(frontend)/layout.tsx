import React from 'react'
import Script from 'next/script'
import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBookingBar, FloatingBookingButton } from '@/components/layout/BookingCTA'
import { CookieConsent } from '@/components/layout/CookieConsent'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { buildHotelSchema, buildOrganizationSchema } from '@/lib/seo'
import {
  getContactInfo,
  getBookingSettings,
  getSiteSettings,
  getGeoSettings,
  getSEOSettings,
  getHeaderGlobal,
  getFooterGlobal,
} from '@/lib/cms'
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
  const [contactInfo, bookingSettings, siteSettings, geoSettings, seoSettings, headerGlobal, footerGlobal] =
    await Promise.all([
      getContactInfo(),
      getBookingSettings(),
      getSiteSettings(),
      getGeoSettings('en'),
      getSEOSettings('en'),
      getHeaderGlobal('en'),
      getFooterGlobal('en'),
    ])

  const bookingUrl = (bookingSettings as any)?.bookingEngineUrl || undefined
  const phone = (contactInfo as any)?.phone || undefined
  const address = (contactInfo as any)?.address || undefined
  const email = (contactInfo as any)?.email || undefined
  const gaId: string | undefined = (seoSettings as any)?.googleAnalyticsId || undefined

  // Build nav links from Payload Header global
  const rawNav = (headerGlobal as any)?.navItems ?? []
  const navLinks = rawNav.map((item: any) => ({
    label: item.label ?? '',
    href: item.type === 'external' ? (item.url ?? '#') : (item.internalUrl ?? '#'),
  })).filter((l: any) => l.label && l.href !== '#')

  const ctaLabel: string | undefined = (headerGlobal as any)?.ctaLabel || undefined

  // Build social from site settings (merged with geo settings)
  const social = {
    instagram: (siteSettings as any)?.instagram || (geoSettings as any)?.instagram || undefined,
    facebook: (siteSettings as any)?.facebook || (geoSettings as any)?.facebook || undefined,
    linkedin: (siteSettings as any)?.linkedin || (geoSettings as any)?.linkedin || undefined,
  }

  const hotelSchema = buildHotelSchema(geoSettings, siteSettings)
  const organizationSchema = buildOrganizationSchema(geoSettings, siteSettings)

  // Build footer data from Payload
  const footerColumns = (footerGlobal as any)?.columns ?? []
  const footerLegalLinks = (footerGlobal as any)?.legalLinks ?? []
  const footerCopyright: string | undefined = (footerGlobal as any)?.copyrightText || undefined
  const footerSocial = {
    instagram: (footerGlobal as any)?.social?.instagram || social.instagram,
    facebook: (footerGlobal as any)?.social?.facebook || social.facebook,
    linkedin: social.linkedin,
  }

  // Booking bar text from Payload
  const stickyBarText: string | undefined = (bookingSettings as any)?.stickyBarText || undefined

  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${dmSans.variable}`}>
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
                     focus:bg-deep focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>

        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}

        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','955309630869188');fbq('track','PageView');`}
        </Script>

        <CustomCursor />
        <Header
          bookingUrl={bookingUrl}
          phone={phone}
          social={social}
          navLinks={navLinks}
          ctaLabel={ctaLabel}
        />
        {children}
        <Footer
          phone={phone}
          email={email}
          address={address}
          bookingUrl={bookingUrl}
          social={footerSocial}
          columns={footerColumns}
          legalLinks={footerLegalLinks}
          copyrightText={footerCopyright}
        />
        <StickyBookingBar bookingUrl={bookingUrl} stickyBarText={stickyBarText} />
        <FloatingBookingButton bookingUrl={bookingUrl} />
        <CookieConsent />
      </body>
    </html>
  )
}
