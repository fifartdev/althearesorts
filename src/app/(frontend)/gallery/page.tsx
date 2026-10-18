import React from 'react'
import { GalleryPage } from '@/components/pages/GalleryPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('gallery', 'en', '/gallery')
}

export default function Page() {
  return <GalleryPage locale="en" />
}
