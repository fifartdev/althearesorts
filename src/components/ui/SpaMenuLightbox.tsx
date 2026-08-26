'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface SpaMenuLightboxProps {
  src: string
  alt: string
  triggerLabel: string
  closeLabel: string
  openLabel: string
  downloadLabel: string
  downloadFileName: string
}

export function SpaMenuLightbox({
  src,
  alt,
  triggerLabel,
  closeLabel,
  openLabel,
  downloadLabel,
  downloadFileName,
}: SpaMenuLightboxProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={triggerLabel}
        className="group relative block w-full aspect-[3/4] overflow-hidden bg-[#faf8f4]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-[#102027]/0 group-hover:bg-[#102027]/40 transition-colors duration-500 flex items-center justify-center">
          <span
            className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                       transition-all duration-500 inline-flex items-center gap-2
                       text-xs uppercase tracking-[0.2em] text-white border border-white/70 px-6 py-3"
          >
            {triggerLabel}
          </span>
        </div>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#102027]/95 p-4 sm:p-8"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute top-5 right-5 sm:top-8 sm:right-8 z-10 flex items-center gap-4 sm:gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={openLabel}
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-3M14 4h6v6M20 4l-9 9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href={src}
              download={downloadFileName}
              aria-label={downloadLabel}
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 3v13m0 0l-4.5-4.5M12 16l4.5-4.5M4 19.5h16" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className="text-white/70 hover:text-white transition-colors duration-300"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="1" />
              </svg>
            </button>
          </div>
          <div
            className="relative w-full max-w-lg h-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
