'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/cn'
import { NAV_LINKS, BOOKING_URL } from '@/lib/constants'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          scrolled
            ? 'bg-[#102027]/95 backdrop-blur-sm border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        )}
        role="banner"
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Althea Resorts — Home"
          >
            <Image
              src="/logos/althea_logo_white-f.png"
              alt="Althea Resorts"
              width={140}
              height={44}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-upper text-white/80 transition-colors duration-300 hover:text-[#ad8b27]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Burger */}
          <div className="flex items-center gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'hidden lg:inline-flex items-center gap-2 h-9 px-5',
                'text-[10px] uppercase tracking-[0.2em] transition-all duration-400',
                'bg-white/10 text-white border border-white/40 hover:bg-white/20'
              )}
            >
              Book Now
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1 text-white"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={cn(
                  'block w-6 h-px bg-current transition-all duration-300 origin-center',
                  menuOpen && 'rotate-45 translate-y-[5px]'
                )}
              />
              <span
                className={cn(
                  'block w-4 h-px bg-current transition-all duration-300',
                  menuOpen && 'opacity-0 w-0'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-px bg-current transition-all duration-300 origin-center',
                  menuOpen && '-rotate-45 -translate-y-[5px]'
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-[#102027] transition-all duration-700',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex-1 flex flex-col justify-center container-luxury gap-8 pt-24">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-editorial text-4xl font-light text-white hover:text-[#ad8b27] transition-colors duration-300"
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
            >
              {link.label}
            </Link>
          ))}

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="mt-4 inline-flex items-center gap-2 h-11 px-7 w-fit
                       text-xs uppercase tracking-[0.2em]
                       bg-[#ad8b27] text-white border border-[#ad8b27]"
          >
            Book Now
          </a>
        </div>

        {/* Mobile menu footer */}
        <div className="container-luxury pb-8 border-t border-white/10 pt-6 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-white/40 text-xs uppercase tracking-widest">Corinthia, Greece</span>
            <span className="text-white/60 text-xs">+30 211 41 84 108</span>
          </div>
          <div className="flex gap-4">
            <a href="https://instagram.com/althearesorts" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors duration-200">IG</a>
            <a href="https://facebook.com/althearesorts" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors duration-200">FB</a>
          </div>
        </div>
      </div>
    </>
  )
}
