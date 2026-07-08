'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/cn'
import { NAV_LINKS, NAV_LINKS_EL, BOOKING_URL, PHONE, SOCIAL } from '@/lib/constants'
import { EL_JOURNAL_SLUGS } from '@/app/(frontend-el)/el/journal/journalData'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isGreek = pathname.startsWith('/el')
  const links = isGreek ? NAV_LINKS_EL : NAV_LINKS
  const logoHref = isGreek ? '/el' : '/'
  const bookLabel = isGreek ? 'Κράτηση' : 'Book Now'
  const journalSlugMatch = !isGreek ? pathname.match(/^\/journal\/(.+)$/) : null
  const enOnlyJournalPage = journalSlugMatch ? !EL_JOURNAL_SLUGS.has(journalSlugMatch[1]) : false

  const switchHref = isGreek
    ? (pathname === '/el' ? '/' : pathname.replace(/^\/el/, ''))
    : pathname === '/'
      ? '/el'
      : enOnlyJournalPage
        ? '/el/journal'
        : `/el${pathname}`

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
          'bg-deep/95 backdrop-blur-sm border-b border-white/10',
          scrolled ? 'py-4' : 'py-6'
        )}
        role="banner"
      >
        <div className="container-luxury flex items-center justify-between">
          {/* Logo */}
          <Link
            href={logoHref}
            aria-label={isGreek ? 'Althea Resorts — Αρχική' : 'Althea Resorts — Home'}
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
            className="hidden lg:flex items-center gap-5"
            aria-label="Primary navigation"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-upper text-white/80 transition-colors duration-300 hover:text-[#ad8b27]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Language switcher + Burger */}
          <div className="flex items-center gap-4">
            {/* Social icons — desktop only */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="https://www.instagram.com/althearesorts" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/40 hover:text-white transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589365637032" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/40 hover:text-white transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/althearesorts" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/40 hover:text-white transition-colors duration-200">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>

            {/* Language switcher — desktop */}
            <Link
              href={switchHref}
              className="hidden lg:inline-flex items-center h-9 px-3
                         text-[10px] uppercase tracking-[0.2em] text-white/50
                         hover:text-white transition-colors duration-300"
              aria-label={isGreek ? 'Switch to English' : 'Εναλλαγή στα Ελληνικά'}
            >
              {isGreek ? 'EN' : 'ΕΛ'}
            </Link>

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
              {bookLabel}
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-1 text-white"
              aria-label={menuOpen ? (isGreek ? 'Κλείσιμο μενού' : 'Close menu') : (isGreek ? 'Άνοιγμα μενού' : 'Open menu')}
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
          'fixed inset-0 z-45 flex flex-col bg-deep transition-all duration-700',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex-1 overflow-y-auto container-luxury flex flex-col gap-6 pt-28 pb-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`font-editorial text-4xl font-light text-white hover:text-[#ad8b27] transition-colors duration-300 ${menuOpen ? `nav-delay-${i}` : ''}`}
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-6 mt-2">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center gap-2 h-11 px-7
                         text-xs uppercase tracking-[0.2em]
                         bg-gold text-white border border-gold"
            >
              {bookLabel}
            </a>
            <Link
              href={switchHref}
              onClick={() => setMenuOpen(false)}
              className="text-white/60 hover:text-white text-xs uppercase tracking-[0.2em] transition-colors duration-200 border border-white/20 h-11 px-5 inline-flex items-center"
            >
              {isGreek ? 'EN' : 'ΕΛ'}
            </Link>
          </div>
        </div>

        {/* Mobile menu footer */}
        <div className="container-luxury pb-8 border-t border-white/10 pt-6 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="text-white/40 text-xs uppercase tracking-widest">
              {isGreek ? 'Κορινθία, Ελλάδα' : 'Corinthia, Greece'}
            </span>
            <span className="text-white/60 text-xs">{PHONE}</span>
          </div>
          <div className="flex gap-4">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors duration-200">IG</a>
            <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-xs uppercase tracking-wider transition-colors duration-200">FB</a>
          </div>
        </div>
      </div>
    </>
  )
}
