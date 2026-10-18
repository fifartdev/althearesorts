import 'server-only'

import { getItems, getPage, getSettings } from './api'
import { splitLinks } from './text'
import type { Locale } from './schema-types'

export type NavLink = { label: string; href: string }

/** Data the client-side Header needs (both locales: it picks one from the pathname). */
export type HeaderData = {
  nav: Record<Locale, NavLink[]>
  bookLabel: Record<Locale, string>
  menuLocation: Record<Locale, string>
  bookingUrl: string
  phone: string
  social: { instagram: string; facebook: string; linkedin: string }
  /** Blog slugs that have a Greek version (for the EN→EL language switch). */
  elJournalSlugs: string[]
}

/** Site-wide settings and shared texts used by both layouts. */
export async function getSite() {
  const [settings, shared, posts] = await Promise.all([getSettings(), getPage('shared'), getItems('althea_post')])
  const nav = { en: splitLinks(settings.nav.en), el: splitLinks(settings.nav.el) }
  const header: HeaderData = {
    nav,
    bookLabel: shared.header.book_label,
    menuLocation: shared.header.menu_location,
    bookingUrl: settings.booking_url,
    phone: settings.phone,
    social: { instagram: settings.instagram_url, facebook: settings.facebook_url, linkedin: settings.linkedin_url },
    elJournalSlugs: posts.filter((p) => p.fields.locale === 'el').map((p) => p.fields.route_slug),
  }
  return { settings, shared, nav, header }
}

export type Site = Awaited<ReturnType<typeof getSite>>

/** Localized value helper: L(field, 'el'). */
export const L = <T,>(field: Partial<Record<Locale, T>> | undefined, locale: Locale): T => field?.[locale] as T
