import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { NAV_LINKS, NAV_LINKS_EL, BOOKING_URL, PHONE, EMAIL, ADDRESS } from '@/lib/constants'

type Locale = 'en' | 'el'

const footerContent = {
  en: {
    desc: 'A luxury boutique resort on the gentle hillside of Ano Loutro, near Xylokastro, Corinthia. Sixty minutes from Athens. A world away from the rest.',
    explore: 'Explore',
    stay: 'Stay',
    bookNow: 'Book Now →',
    copyright: (year: number) => `© ${year} Althea Resorts. All rights reserved.`,
    privacy: 'Privacy Policy',
    terms: 'Terms',
    privacyHref: '/privacy-policy',
    termsHref: '/terms',
  },
  el: {
    desc: 'Ένα πολυτελές boutique resort στον ήπιο λόφο του Άνω Λουτρού, κοντά στο Ξυλόκαστρο, Κορινθία. Εξήντα λεπτά από Αθήνα. Ένας κόσμος μακριά.',
    explore: 'Εξερευνήστε',
    stay: 'Διαμονή',
    bookNow: 'Κράτηση →',
    copyright: (year: number) => `© ${year} Althea Resorts. Με επιφύλαξη κάθε δικαιώματος.`,
    privacy: 'Πολιτική Απορρήτου',
    terms: 'Όροι Χρήσης',
    privacyHref: '/privacy-policy',
    termsHref: '/terms',
  },
}

interface FooterProps {
  locale?: Locale
  phone?: string
  email?: string
  address?: string
  bookingUrl?: string
  social?: { instagram?: string; facebook?: string; linkedin?: string }
}

export function Footer({ locale = 'en', phone, email, address, bookingUrl, social }: FooterProps = {}) {
  const year = new Date().getFullYear()
  const c = footerContent[locale]
  const links = locale === 'el' ? NAV_LINKS_EL : NAV_LINKS
  const _phone = phone || PHONE
  const _email = email || EMAIL
  const _address = address || ADDRESS
  const _bookingUrl = bookingUrl || BOOKING_URL
  const _social = social || { instagram: 'https://www.instagram.com/althearesorts', facebook: 'https://www.facebook.com/profile.php?id=61589365637032', linkedin: 'https://www.linkedin.com/company/althearesorts' }

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
              {c.desc}
            </p>
            <div className="flex flex-col gap-2 text-sm font-light text-white/50">
              <span>{_address}</span>
              <a href={`tel:${_phone.replace(/\s/g, '')}`} className="hover:text-gold transition-colors duration-200">{_phone}</a>
              <a href={`mailto:${_email}`} className="hover:text-gold transition-colors duration-200">{_email}</a>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-3 lg:col-start-6">
            <h3 className="text-label-upper text-[#ad8b27] mb-5">{c.explore}</h3>
            <ul className="flex flex-col gap-3">
              {links.slice(0, 5).map((link) => (
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
            <h3 className="text-label-upper text-[#ad8b27] mb-5">{c.stay}</h3>
            <ul className="flex flex-col gap-3">
              {links.slice(5).map((link) => (
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
                  href={_bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-light text-[#ad8b27] hover:text-white transition-colors duration-200 uppercase tracking-wider"
                >
                  {c.bookNow}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
          <p className="text-xs font-light text-white/30 uppercase tracking-widest">
            {c.copyright(year)}
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link href={c.privacyHref} className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 uppercase tracking-wider">
              {c.privacy}
            </Link>
            <Link href={c.termsHref} className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 uppercase tracking-wider">
              {c.terms}
            </Link>
          </div>
          <div className="flex items-center sm:justify-end gap-5">
            <a href={_social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/30 hover:text-gold transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href={_social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/30 hover:text-gold transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href={_social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-white/30 hover:text-gold transition-colors duration-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
