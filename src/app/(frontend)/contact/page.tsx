import React from 'react'
import { ContactPage } from '@/components/pages/ContactPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('contact', 'en', '/contact')
}

export default function Page() {
  return <ContactPage locale="en" />
}
