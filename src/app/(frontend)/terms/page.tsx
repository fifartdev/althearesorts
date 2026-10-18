import React from 'react'
import { LegalPage } from '@/components/pages/LegalPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('terms', 'en', '/terms')
}

export default function TermsPage() {
  return <LegalPage slug="terms" />
}
