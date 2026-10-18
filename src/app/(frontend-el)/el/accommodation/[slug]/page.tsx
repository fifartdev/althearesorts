import React from 'react'
import { RoomPage, roomMetadata, roomStaticParams } from '@/components/pages/RoomPage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return roomStaticParams()
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return roomMetadata(slug, 'el')
}

export default async function GreekRoomPage({ params }: Props) {
  const { slug } = await params
  return <RoomPage slug={slug} locale="el" />
}
