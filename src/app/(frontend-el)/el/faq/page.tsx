import React from 'react'
import { FaqPage } from '@/components/pages/FaqPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('faq', 'el', '/el/faq')
}

export default function GreekFAQPage() {
  return <FaqPage locale="el" />
}
