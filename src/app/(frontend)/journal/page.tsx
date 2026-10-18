import React from 'react'
import { JournalListPage } from '@/components/pages/JournalListPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('journal', 'en', '/journal')
}

export default function Page() {
  return <JournalListPage locale="en" />
}
