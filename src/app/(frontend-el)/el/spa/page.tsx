import React from 'react'
import { SpaPage } from '@/components/pages/SpaPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('spa', 'el', '/el/spa')
}

export default function GreekSpaPage() {
  return <SpaPage locale="el" />
}
