'use client'

import dynamic from 'next/dynamic'
import type { CookieTexts } from '@/components/layout/CookieConsent'
import type { OfferPopupData } from '@/lib/wp/site'

const CookieConsent = dynamic(
  () => import('@/components/layout/CookieConsent').then(m => ({ default: m.CookieConsent })),
  { ssr: false }
)

// Client-only: whether to show it depends on the visitor's browser storage.
const OfferPopup = dynamic(
  () => import('@/components/layout/OfferPopup').then(m => ({ default: m.OfferPopup })),
  { ssr: false }
)

const CustomCursor = dynamic(
  () => import('@/components/animations/CustomCursor').then(m => ({ default: m.CustomCursor })),
  { ssr: false }
)

export function ClientShells({ cookie, popup }: { cookie: CookieTexts; popup?: OfferPopupData | null }) {
  return (
    <>
      <CustomCursor />
      <CookieConsent texts={cookie} />
      {popup && <OfferPopup offer={popup} />}
    </>
  )
}
