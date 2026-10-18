import React from 'react'
import { LegalPage } from '@/components/pages/LegalPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('privacy-policy', 'en', '/privacy-policy')
}

export default function PrivacyPolicyPage() {
  return <LegalPage slug="privacy-policy" />
}
