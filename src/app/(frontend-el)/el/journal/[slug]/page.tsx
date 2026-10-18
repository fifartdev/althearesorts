import React from 'react'
import { ArticlePage, articleMetadata, articleStaticParams } from '@/components/pages/ArticlePage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articleStaticParams('el')
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return articleMetadata(slug, 'el')
}

export default async function GreekJournalArticlePage({ params }: Props) {
  const { slug } = await params
  return <ArticlePage slug={slug} locale="el" />
}
