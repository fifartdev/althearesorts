import React from 'react'
import { ArticlePage, articleMetadata, articleStaticParams } from '@/components/pages/ArticlePage'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return articleStaticParams('en')
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  return articleMetadata(slug, 'en')
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params
  return <ArticlePage slug={slug} locale="en" />
}
