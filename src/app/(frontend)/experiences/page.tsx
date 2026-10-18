import React from 'react'
import { ExperiencesPage } from '@/components/pages/ExperiencesPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('experiences', 'en', '/experiences')
}

export default function Page() {
  return <ExperiencesPage locale="en" />
}
