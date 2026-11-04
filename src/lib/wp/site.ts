import 'server-only'

import { getItems, getPage, getSettings, tr } from './api'
import { splitLines, splitLinks } from './text'
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

/** Texts of the offer pop-up in one language (see OfferPopup). */
export type OfferPopupData = {
  /** The offer's slug: closing the pop-up hides this offer only, so a new offer shows at once. */
  id: string
  eyebrow: string
  heading: string
  body: string
  includesLabel: string
  includes: string[]
  noteTitle: string
  noteText: string
  ctaLabel: string
  bookingUrl: string
  viewLabel: string
  viewHref: string
  closeLabel: string
}

/** Site-wide settings and shared texts used by both layouts. */
export async function getSite() {
  const [settings, shared, posts, a11y, seoGeo, offers] = await Promise.all([getSettings(), getPage('shared'), getItems('althea_post'), getPage('a11y'), getPage('seo_geo'), getItems('althea_offer')])
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
  // The first active offer ticked "Show as pop-up on every page" (in Order), per language.
  const offer = offers.find((o) => o.fields.active && o.fields.popup)
  const popup = offer
    ? (Object.fromEntries(
        (['en', 'el'] as const).map((locale) => {
          const f = offer.fields
          const t = (field: { en: string; el?: string }) => tr(field, locale)
          return [
            locale,
            {
              id: offer.slug,
              eyebrow: t(f.eyebrow),
              heading: t(f.heading),
              body: t(f.body),
              includesLabel: t(f.includes_label),
              includes: splitLines(t(f.includes)),
              noteTitle: t(f.note_title),
              noteText: t(f.note_text),
              ctaLabel: t(f.cta_label),
              bookingUrl: f.booking_url || settings.booking_url,
              viewLabel: t(shared.offer_popup.view_offer),
              viewHref: locale === 'el' ? '/el/offers' : '/offers',
              closeLabel: t(shared.offer_popup.close),
            },
          ]
        }),
      ) as Record<Locale, OfferPopupData>)
    : null
  return { settings, shared, nav, header, a11y, seoGeo, popup }
}

export type Site = Awaited<ReturnType<typeof getSite>>

/** Localized value helper: L(field, 'el'). */
export const L = <T,>(field: Partial<Record<Locale, T>> | undefined, locale: Locale): T => field?.[locale] as T
