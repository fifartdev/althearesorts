import 'server-only'

import { getItems, getPage, getSettings, tr } from './api'
import { splitLinks } from './text'
import type { Locale, Pages } from './schema-types'

export type NavLink = { label: string; href: string }

/** Data the client-side Header needs (both locales: it picks one from the pathname). */
export type HeaderData = {
  nav: Record<Locale, NavLink[]>
  bookLabel: Record<Locale, string>
  menuLocation: Record<Locale, string>
  bookingUrl: string
  siteName: string
  phone: string
  social: { instagram: string; facebook: string; linkedin: string }
  /** Blog slugs that have a Greek version (for the EN→EL language switch). */
  elJournalSlugs: string[]
  /** Screen-reader labels of the header, per language. */
  labels: Record<Locale, Labels<'layout'>>
}

type A11y = Pages['a11y']
export type Labels<S extends keyof A11y> = Record<keyof A11y[S], string>

/** Screen-reader labels of one section in the page language (English when the Greek label is empty). */
export async function getLabels<S extends keyof A11y>(section: S, locale: Locale): Promise<Labels<S>> {
  return labelsOf((await getPage('a11y'))[section], locale)
}

function labelsOf<T extends object>(section: T, locale: Locale) {
  return Object.fromEntries(Object.entries(section).map(([k, v]) => [k, tr(v as { en: string; el?: string }, locale)])) as Record<keyof T, string>
}

/** Site-wide settings and shared texts used by both layouts. */
export async function getSite() {
  const [settings, shared, posts, a11y, seoGeo] = await Promise.all([getSettings(), getPage('shared'), getItems('althea_post'), getPage('a11y'), getPage('seo_geo')])
  const nav = { en: splitLinks(settings.nav.en), el: splitLinks(settings.nav.el) }
  const header: HeaderData = {
    nav,
    bookLabel: shared.header.book_label,
    menuLocation: shared.header.menu_location,
    bookingUrl: settings.booking_url,
    siteName: settings.site_name,
    phone: settings.phone,
    social: { instagram: settings.instagram_url, facebook: settings.facebook_url, linkedin: settings.linkedin_url },
    elJournalSlugs: posts.filter((p) => p.fields.locale === 'el').map((p) => p.fields.route_slug),
    labels: { en: labelsOf(a11y.layout, 'en'), el: labelsOf(a11y.layout, 'el') },
  }
  return { settings, shared, nav, header, a11y, seoGeo }
}

export type Site = Awaited<ReturnType<typeof getSite>>

/** Localized value helper: L(field, 'el'). */
export const L = <T,>(field: Partial<Record<Locale, T>> | undefined, locale: Locale): T => field?.[locale] as T
