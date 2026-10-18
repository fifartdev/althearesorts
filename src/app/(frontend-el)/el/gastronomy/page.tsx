import React from 'react'
import { GastronomyPage } from '@/components/pages/GastronomyPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('gastronomy', 'el', '/el/gastronomy')
}

export default function GreekGastronomyPage() {
  return <GastronomyPage locale="el" />
}
