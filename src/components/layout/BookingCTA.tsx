'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/cn'

export function StickyBookingBar({
  locale = 'en',
  bookingUrl,
  stickyBarText,
  offerText,
  ctaLabel,
}: {
  locale?: 'en' | 'el'
  bookingUrl?: string
  stickyBarText?: string
  offerText?: string
  ctaLabel?: string
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!bookingUrl) return null

  const label = ctaLabel || (locale === 'el' ? 'Κράτηση' : 'Book Now')
  const ariaLabel = locale === 'el' ? 'Γρήγορη κράτηση' : 'Quick booking'

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-40 transition-transform duration-500',
        'hidden lg:flex items-center justify-between',
        'booking-bar px-8 py-4 border-t border-white/10',
        visible ? 'translate-y-0' : 'translate-y-full'
      )}
      role="complementary"
      aria-label={ariaLabel}
    >
      {stickyBarText && (
        <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-light">
          {stickyBarText}
        </p>
      )}
      <div className={cn('flex items-center gap-6', !stickyBarText && 'ml-auto')}>
        {offerText && (
          <span className="text-xs text-gold uppercase tracking-widest font-light">
            {offerText}
          </span>
        )}
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-6 inline-flex items-center
                     text-[10px] uppercase tracking-[0.2em]
                     bg-gold text-white border border-gold
                     hover:bg-transparent hover:text-gold
                     transition-all duration-400"
        >
          {label}
        </a>
      </div>
    </div>
  )
}

export function FloatingBookingButton({
  bookingUrl,
  label,
}: {
  bookingUrl?: string
  label?: string
} = {}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!bookingUrl) return null

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-40 lg:hidden',
        'h-12 px-5 inline-flex items-center gap-2',
        'text-[10px] uppercase tracking-[0.2em]',
        'bg-gold text-white shadow-lg shadow-gold/30',
        'transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      )}
      aria-label="Book your stay at Althea Resorts"
    >
      {label || 'Book Now'}
    </a>
  )
}
