import React from 'react'
import { ExperiencesPage } from '@/components/pages/ExperiencesPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('experiences', 'el', '/el/experiences')
}

export default function GreekExperiencesPage() {
  return <ExperiencesPage locale="el" />
}
