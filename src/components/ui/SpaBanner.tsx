'use client'

import { useState, useEffect } from 'react'

export function SpaBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Spa availability notice"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#102027]/70 backdrop-blur-sm"
        onClick={() => setVisible(false)}
      />

      {/* Card */}
      <div className="relative z-10 bg-white max-w-md w-full p-10 text-center shadow-2xl">
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          aria-label="Close"
          className="absolute top-4 right-4 text-[#102027]/30 hover:text-[#102027]/70 transition-colors duration-200"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>

        {/* Gold rule */}
        <div className="w-8 h-px bg-[#ad8b27] mx-auto mb-7" />

        <p className="text-xs uppercase tracking-[0.2em] text-[#6b6b6b] mb-4">
          Notice
        </p>

        <h2 className="font-editorial text-2xl font-light text-[#102027] leading-snug mb-6">
          Ocean Spa — Coming Soon
        </h2>

        <p className="text-sm font-light text-[#6b6b6b] leading-relaxed mb-8">
          All SPA services will be available by the{' '}
          <span className="text-[#102027] font-normal">25th of July 2026</span>.
          We look forward to welcoming you.
        </p>

        {/* Gold rule */}
        <div className="w-8 h-px bg-[#ad8b27] mx-auto mb-7" />

        <button
          onClick={() => setVisible(false)}
          className="text-xs uppercase tracking-[0.2em] text-[#ad8b27] border-b border-[#ad8b27]/40 pb-0.5 hover:border-[#ad8b27] transition-colors duration-300"
        >
          Understood
        </button>
      </div>
    </div>
  )
}
