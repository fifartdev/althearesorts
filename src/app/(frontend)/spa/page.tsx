import React from 'react'
import { SpaPage } from '@/components/pages/SpaPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('spa', 'en', '/spa')
}

export default function Page() {
  return <SpaPage locale="en" />
}
