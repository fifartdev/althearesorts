'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Rich } from '@/lib/wp/Rich'
import type { OfferPopupData } from '@/lib/wp/site'

const HIDE_FOR_MS = 60 * 60 * 1000 // after closing, the pop-up comes back after 1 hour
const DELAY_MS = 800

const storageKey = (id: string) => `althea-offer-popup:${id}`

/** True when the visitor closed this offer's pop-up less than an hour ago. */
function recentlyClosed(id: string) {
  try {
    return Date.now() - Number(localStorage.getItem(storageKey(id)) || 0) < HIDE_FOR_MS
  } catch {
    return false
  }
}

/**
 * Offer pop-up, switched on per offer in WordPress ("Show as pop-up on every page").
 * Shows on every page (and every page change) until the visitor closes it with the X, a click
 * outside, Esc or one of its buttons; then it stays hidden for an hour.
 */
export function OfferPopup({ offer }: { offer: OfferPopupData }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (recentlyClosed(offer.id)) return
    const timer = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(timer)
  }, [pathname, offer.id])

  const close = useCallback(() => {
    try {
      localStorage.setItem(storageKey(offer.id), String(Date.now()))
    } catch {
      // Storage blocked (private mode): it just closes for this page.
    }
    setOpen(false)
  }, [offer.id])

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" role="dialog" aria-modal="true" aria-labelledby="offer-popup-title">
      {/* Overlay: a click outside closes */}
      <div className="absolute inset-0 bg-[#102027]/70 backdrop-blur-sm" onClick={close} />

      {/* Card */}
      <div className="relative z-10 bg-white max-w-md w-full max-h-[90vh] overflow-y-auto p-8 sm:p-10 text-center shadow-2xl">
        <button
          ref={closeRef}
          onClick={close}
          aria-label={offer.closeLabel}
          className="absolute top-4 right-4 p-1 text-[#102027]/30 hover:text-[#102027]/70 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>

        <div className="w-8 h-px bg-[#ad8b27] mx-auto mb-7" />

        {offer.eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-4">{offer.eyebrow}</p>}

        <h2 id="offer-popup-title" className="font-editorial text-2xl font-light text-[#102027] leading-snug mb-6">
          <Rich html={offer.heading} classes={{ em: 'italic font-light text-[#102027]/60' }} />
        </h2>

        {offer.body && (
          <p className="text-sm font-light text-[#6b6b6b] leading-relaxed mb-6">
            <Rich html={offer.body} />
          </p>
        )}

        {offer.includes.length > 0 && (
          <div className="mb-8 text-left">
            {offer.includesLabel && <p className="text-label-upper text-[#ad8b27] mb-3 text-center">{offer.includesLabel}</p>}
            <ul className="flex flex-col gap-2">
              {offer.includes.map((item) => (
                <li key={item} className="flex gap-3 text-sm font-light text-[#102027] leading-relaxed">
                  <span className="text-[#ad8b27] shrink-0" aria-hidden="true">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="w-8 h-px bg-[#ad8b27] mx-auto mb-7" />

        <div className="flex flex-col items-center gap-4">
          <a
            href={offer.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="h-11 px-8 inline-flex items-center justify-center text-xs uppercase tracking-[0.2em] bg-[#ad8b27] text-white border border-[#ad8b27] hover:bg-transparent hover:text-[#ad8b27] transition-all duration-500"
          >
            {offer.ctaLabel}
          </a>
          <Link
            href={offer.viewHref}
            onClick={close}
            className="text-xs uppercase tracking-[0.2em] text-[#ad8b27] border-b border-[#ad8b27]/40 pb-0.5 hover:border-[#ad8b27] transition-colors duration-300"
          >
            {offer.viewLabel}
          </Link>
        </div>

        {(offer.noteTitle || offer.noteText) && (
          <div className="mt-8 pt-6 border-t border-[#e8e4dd]">
            {offer.noteTitle && <p className="text-sm font-medium text-[#102027] mb-1">{offer.noteTitle}</p>}
            {offer.noteText && <p className="text-sm font-light text-[#6b6b6b] leading-relaxed whitespace-pre-line">{offer.noteText}</p>}
          </div>
        )}
      </div>
    </div>
  )
}
