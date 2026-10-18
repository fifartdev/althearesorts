import React from 'react'
import { FaqPage } from '@/components/pages/FaqPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('faq', 'en', '/faq')
}

export default function Page() {
  return <FaqPage locale="en" />
}
