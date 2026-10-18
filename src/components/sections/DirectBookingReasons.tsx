import React from 'react'
import { getItems, getPage, getSettings } from '@/lib/wp/api'
import { DirectBookingReasonsView } from './DirectBookingReasonsView'

/** "Reasons to book directly" accordion: content from the CMS, interaction in the client view. */
export async function DirectBookingReasons({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const [shared, reasons, settings] = await Promise.all([getPage('shared'), getItems('althea_reason'), getSettings()])
  return (
    <DirectBookingReasonsView
      locale={locale}
      c={shared.direct_booking}
      reasons={reasons.map((r) => ({ title: r.fields.title[locale], body: r.fields.body[locale] }))}
      bookingUrl={settings.booking_url}
    />
  )
}
