import React from 'react'
import { JournalListPage } from '@/components/pages/JournalListPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('journal', 'el', '/el/journal')
}

export default function GreekJournalPage() {
  return <JournalListPage locale="el" />
}
