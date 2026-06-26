'use client'

import dynamic from 'next/dynamic'

const CookieConsent = dynamic(
  () => import('@/components/layout/CookieConsent').then(m => ({ default: m.CookieConsent })),
  { ssr: false }
)

const CustomCursor = dynamic(
  () => import('@/components/animations/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

export function ClientShells({ locale }: { locale?: 'en' | 'el' }) {
  return (
    <>
      <CustomCursor />
      <CookieConsent locale={locale} />
    </>
  )
}
