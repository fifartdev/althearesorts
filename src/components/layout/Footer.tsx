import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS, BOOKING_URL, PHONE, EMAIL, ADDRESS } from '@/lib/constants'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#102027] text-white" role="contentinfo">
      {/* Main footer grid */}
      <div className="container-luxury pt-20 pb-12 lg:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <Image
                src="/logos/althea_logo_white-f.png"
                alt="Althea Resorts"
                width={160}
                height={50}
                className="object-contain"
              />
            </div>
            <p className="text-sm font-light text-white/50 leading-relaxed max-w-xs">
              A luxury boutique resort on the gentle hillside of Ano Loutro,
              near Xylokastro, Corinthia. Sixty minutes from Athens.
              A world away from the rest.
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-white/50">
              <span>{ADDRESS}</span>
              <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:text-[#ad8b27] transition-colors duration-200">{PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="hover:text-[#ad8b27] transition-colors duration-200">{EMAIL}</a>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h3 className="text-label-upper text-[#ad8b27] mb-5">Explore</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.slice(0, 5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-label-upper text-[#ad8b27] mb-5">Stay</h3>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.slice(5).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-light text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-[#ad8b27] hover:text-white transition-colors duration-200 uppercase tracking-wider"
                >
                  Book Now →
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs font-light text-white/30 uppercase tracking-widest">
            © {year} Althea Resorts. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 uppercase tracking-wider">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 uppercase tracking-wider">
              Terms
            </Link>
            <div className="flex gap-4">
              <a href="https://instagram.com/althearesorts" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-[#ad8b27] transition-colors duration-200 uppercase tracking-wider">
                Instagram
              </a>
              <a href="https://facebook.com/althearesorts" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-[#ad8b27] transition-colors duration-200 uppercase tracking-wider">
                Facebook
              </a>
              <a href="https://linkedin.com/company/althearesorts" target="_blank" rel="noopener noreferrer" className="text-xs text-white/30 hover:text-[#ad8b27] transition-colors duration-200 uppercase tracking-wider">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
