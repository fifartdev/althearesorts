import React from 'react'
import { GalleryPage } from '@/components/pages/GalleryPage'
import { pageMetadata } from '@/lib/wp/metadata'

export async function generateMetadata() {
  return pageMetadata('gallery', 'el', '/el/gallery')
}

export default function GreekGalleryPage() {
  return <GalleryPage locale="el" />
}
