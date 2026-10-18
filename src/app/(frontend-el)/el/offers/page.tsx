import React from 'react'
import { OffersPage } from '@/components/pages/OffersPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('offers', 'el', '/el/offers')
}

export default function GreekOffersPage() {
  return <OffersPage locale="el" />
}
