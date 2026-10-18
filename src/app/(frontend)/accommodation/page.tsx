import React from 'react'
import { AccommodationPage } from '@/components/pages/AccommodationPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('accommodation', 'en', '/accommodation')
}

export default function Page() {
  return <AccommodationPage locale="en" />
}
