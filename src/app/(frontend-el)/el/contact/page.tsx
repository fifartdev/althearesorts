import React from 'react'
import { ContactPage } from '@/components/pages/ContactPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('contact', 'el', '/el/contact')
}

export default function GreekContactPage() {
  return <ContactPage locale="el" />
}
