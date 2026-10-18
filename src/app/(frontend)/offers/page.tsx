import React from 'react'
import { OffersPage } from '@/components/pages/OffersPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('offers', 'en', '/offers')
}

export default function Page() {
  return <OffersPage locale="en" />
}
