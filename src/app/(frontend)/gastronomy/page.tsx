import React from 'react'
import { GastronomyPage } from '@/components/pages/GastronomyPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('gastronomy', 'en', '/gastronomy')
}

export default function Page() {
  return <GastronomyPage locale="en" />
}
