'use client'

import dynamic from 'next/dynamic'
import type { CookieTexts } from '@/components/layout/CookieConsent'

const CookieConsent = dynamic(
  () => import('@/components/layout/CookieConsent').then(m => ({ default: m.CookieConsent })),
  { ssr: false }
)

const CustomCursor = dynamic(
  () => import('@/components/animations/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

export function ClientShells({ cookie }: { cookie: CookieTexts }) {
  return (
    <>
      <CustomCursor />
      <CookieConsent texts={cookie} />
    </>
  )
}
