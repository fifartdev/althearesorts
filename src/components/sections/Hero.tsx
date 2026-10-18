import React from 'react'
import { getPage, getSettings } from '@/lib/wp/api'
import { HeroView } from './HeroView'

/** Homepage hero: loads its content on the server, animation runs in HeroView (client). */
export async function Hero({ locale = 'en' }: { locale?: 'en' | 'el' }) {
  const [home, settings] = await Promise.all([getPage('home'), getSettings()])
  return <HeroView locale={locale} c={home.hero} bookingUrl={settings.booking_url} />
}
