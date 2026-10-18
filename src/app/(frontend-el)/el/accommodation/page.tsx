import React from 'react'
import { AccommodationPage } from '@/components/pages/AccommodationPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('accommodation', 'el', '/el/accommodation')
}

export default function GreekAccommodationPage() {
  return <AccommodationPage locale="el" />
}
