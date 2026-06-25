'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ManageLocale } from '@/lib/manage-i18n'
import { useTranslations } from '@/lib/manage-i18n'

interface SidebarProps {
  locale: ManageLocale
  userEmail?: string
  userName?: string
}

export default function Sidebar({ locale, userEmail, userName }: SidebarProps) {
  const pathname = usePathname()
  const tr = useTranslations(locale)

  const navItems = [
    { href: '/manage', label: tr.nav.dashboard, icon: GridIcon },
    { href: '/manage/rooms', label: tr.nav.rooms, icon: BedIcon },
    { href: '/manage/gallery', label: tr.nav.gallery, icon: PhotoIcon },
    { href: '/manage/offers', label: tr.nav.offers, icon: TagIcon },
    { href: '/manage/journal', label: tr.nav.journal, icon: BookIcon },
    { href: '/manage/faqs', label: tr.nav.faqs, icon: QuestionIcon },
    { href: '/manage/testimonials', label: tr.nav.testimonials, icon: StarIcon },
    { href: '/manage/enquiries', label: tr.nav.enquiries, icon: MailIcon },
    { href: '/manage/settings', label: tr.nav.settings, icon: GearIcon },
  ]

  const isActive = (href: string) =>
    href === '/manage' ? pathname === '/manage' : pathname.startsWith(href)

  return (
    <div className="flex flex-col h-full bg-[#102027] text-white">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/logos/althea_logo_white-f.png" alt="Althea Resorts" className="h-8 w-auto" />
        </div>
        <p className="text-white/40 text-xs mt-1 font-sans tracking-wide">
          {locale === 'el' ? 'Διαχείριση περιεχομένου' : 'Content manager'}
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={`${href}?locale=${locale}`}
            className={[
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-sans transition-colors',
              isActive(href)
                ? 'bg-white/10 text-white'
                : 'text-white/60 hover:text-white hover:bg-white/5',
            ].join(' ')}
          >
            <Icon className="w-4 h-4 shrink-0" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Bottom: user + locale toggle */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        {/* Locale toggle */}
        <div className="flex gap-1.5">
          <LocaleButton href={pathname} current={locale} target="en" label="EN" />
          <LocaleButton href={pathname} current={locale} target="el" label="ΕΛ" />
        </div>

        {/* User */}
        {userEmail && (
          <div className="flex items-center gap-2 py-1">
            <div className="w-7 h-7 rounded-full bg-[#ad8b27]/30 flex items-center justify-center shrink-0">
              <span className="text-[#ad8b27] text-xs font-semibold">
                {(userName || userEmail)[0].toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{userName || userEmail}</p>
              <p className="text-white/40 text-xs truncate">{userEmail}</p>
            </div>
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3 text-xs text-white/40">
          <a href="/admin" target="_blank" className="hover:text-white/70 transition-colors">
            {locale === 'el' ? 'Πλήρες CMS' : 'Full CMS'} ↗
          </a>
          <form action="/api/users/logout" method="POST">
            <button type="submit" className="hover:text-white/70 transition-colors cursor-pointer">
              {locale === 'el' ? 'Αποσύνδεση' : 'Sign out'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function LocaleButton({
  href,
  current,
  target,
  label,
}: {
  href: string
  current: ManageLocale
  target: ManageLocale
  label: string
}) {
  const url = new URL(href, 'http://x')
  url.searchParams.set('locale', target)
  return (
    <a
      href={`${url.pathname}${url.search}`}
      className={[
        'flex-1 py-1 text-center text-xs rounded border transition-colors',
        current === target
          ? 'border-[#ad8b27] text-[#ad8b27]'
          : 'border-white/20 text-white/40 hover:border-white/40 hover:text-white/60',
      ].join(' ')}
    >
      {label}
    </a>
  )
}

// ─── Inline SVG Icons ──────────────────────────────────────────────────────

function GridIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  )
}

function BedIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}

function PhotoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
}

function TagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
  )
}

function BookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  )
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  )
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  )
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}
