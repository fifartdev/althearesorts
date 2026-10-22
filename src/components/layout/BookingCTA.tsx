'use client'

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/cn'

export function StickyBookingBar({ tagline, cta, bookingUrl, ariaLabel }: { tagline: string; cta: string; bookingUrl: string; ariaLabel: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <p className="text-xs uppercase tracking-[0.2em] text-white/70 font-light">
        {tagline}
      </p>
      <div className="flex items-center gap-6">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="h-9 px-6 inline-flex items-center
                     text-[10px] uppercase tracking-[0.2em]
                     bg-[#ad8b27] text-white border border-[#ad8b27]
                     hover:bg-transparent hover:text-[#ad8b27]
                     transition-all duration-400"
        >
          {cta}
        </a>
      </div>
    </div>
  )
}

export function FloatingBookingButton({ label, bookingUrl, ariaLabel }: { label: string; bookingUrl: string; ariaLabel: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <a
      href={bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'fixed bottom-6 right-6 z-40 lg:hidden',
        'h-12 px-5 inline-flex items-center gap-2',
        'text-[10px] uppercase tracking-[0.2em]',
        'bg-[#ad8b27] text-white shadow-lg shadow-[#ad8b27]/30',
        'transition-all duration-500',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0 pointer-events-none'
      )}
      aria-label={ariaLabel}
    >
      {label}
    </a>
  )
}
