import React from 'react'
import { getPage, getSettings } from '@/lib/wp/api'
import { getLabels } from '@/lib/wp/site'
import { HeroView } from './HeroView'

/** Homepage hero: loads its content on the server, animation runs in HeroView (client). */
export async function Hero({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const [home, settings, labels] = await Promise.all([getPage('home'), getSettings(), getLabels('home', locale)])
  return <HeroView locale={locale} c={home.hero} bookingUrl={settings.booking_url} ariaLabel={labels.hero} />
}
