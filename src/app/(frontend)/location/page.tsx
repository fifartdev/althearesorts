import React from 'react'
import { LocationPage } from '@/components/pages/LocationPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('location', 'en', '/location')
}

export default function Page() {
  return <LocationPage locale="en" />
}
