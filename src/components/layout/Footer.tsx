import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type Locale = 'en' | 'el'

interface FooterColumn {
  heading?: string
  links?: Array<{ label: string; url: string }>
}

interface FooterProps {
  locale?: Locale
  phone?: string
  email?: string
  address?: string
  bookingUrl?: string
  social?: { instagram?: string; facebook?: string; linkedin?: string }
  columns?: FooterColumn[]
  legalLinks?: Array<{ label: string; url: string }>
  copyrightText?: string
}

export function Footer({
  locale = 'en',
  phone,
  email,
  address,
  bookingUrl,
  social,
  columns = [],
  legalLinks = [],
  copyrightText,
}: FooterProps = {}) {
  const year = new Date().getFullYear()
  const copyright = copyrightText || `© ${year} Althea Resorts`

  return (
    <footer className="bg-deep text-white" role="contentinfo">
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
            {/* Contact details from Payload */}
            <div className="flex flex-col gap-2 text-sm font-light text-white/50">
              {address && <span>{address}</span>}
              {phone && (
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors duration-200">
                  {phone}
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="hover:text-gold transition-colors duration-200">
                  {email}
                </a>
              )}
            </div>
          </div>

          {/* Payload-managed navigation columns */}
          {columns.slice(0, 2).map((col, i) => (
            <div key={i} className={i === 0 ? 'lg:col-span-3 lg:col-start-6' : 'lg:col-span-3'}>
              {col.heading && (
                <h3 className="text-label-upper text-gold mb-5">{col.heading}</h3>
              )}
              <ul className="flex flex-col gap-3">
                {(col.links ?? []).map((link) => (
                  <li key={link.url}>
                    <Link
                      href={link.url}
                      className="text-sm font-light text-white/60 hover:text-white transition-colors duration-200 uppercase tracking-wider"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                {/* Booking CTA in last column */}
                {i === 1 && bookingUrl && (
                  <li>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-light text-gold hover:text-white transition-colors duration-200 uppercase tracking-wider"
                    >
                      {locale === 'el' ? 'Κράτηση →' : 'Book Now →'}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}

          {/* If no CMS columns, show booking CTA only */}
          {columns.length === 0 && bookingUrl && (
            <div className="lg:col-span-3 lg:col-start-9">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-light text-gold hover:text-white transition-colors duration-200 uppercase tracking-wider"
              >
                {locale === 'el' ? 'Κράτηση →' : 'Book Now →'}
              </a>
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <p className="text-xs font-light text-white/30 uppercase tracking-widest">
            {copyright}
          </p>
          <div className="flex items-center justify-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 uppercase tracking-wider"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center sm:justify-end gap-5">
            {social?.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/30 hover:text-gold transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
            )}
            {social?.facebook && (
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/30 hover:text-gold transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            )}
            {social?.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/30 hover:text-gold transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
