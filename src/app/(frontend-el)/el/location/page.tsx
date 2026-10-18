import React from 'react'
import { LocationPage } from '@/components/pages/LocationPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('location', 'el', '/el/location')
}

export default function GreekLocationPage() {
  return <LocationPage locale="el" />
}
