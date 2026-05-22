import React from 'react'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBookingBar, FloatingBookingButton } from '@/components/layout/BookingCTA'
import { CustomCursor } from '@/components/animations/CustomCursor'
import { hotelSchema } from '@/lib/seo'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-canela',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-sohne',
  display: 'swap',
})

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50
                     focus:bg-[#102027] focus:text-white focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>

        <CustomCursor />
        <Header />
        {children}
        <Footer />
        <StickyBookingBar />
        <FloatingBookingButton />
      </body>
    </html>
  )
}
