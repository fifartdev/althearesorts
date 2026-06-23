import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/cn'

interface RoomCardProps {
  slug: string
  href?: string
  title: string
  size: string
  shortDesc: string
  view: string
  image: string
  className?: string
  priority?: boolean
  locale?: 'en' | 'el'
}

export function RoomCard({
  slug,
  href,
  title,
  size,
  shortDesc,
  view,
  image,
  className,
  priority,
  locale = 'en',
}: RoomCardProps) {
  return (
    <Link
      href={href ?? `/accommodation/${slug}`}
      className={cn(
        'group block relative overflow-hidden bg-[#f2f8fb]',
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-105"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#102027]/0 transition-colors duration-500 group-hover:bg-[#102027]/20" />
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <div className="flex items-baseline justify-between gap-4 mb-3">
          <h3 className="font-editorial text-xl font-light text-[#102027] leading-tight">
            {title}
          </h3>
          <span className="text-label-upper text-[#ad8b27] shrink-0">{size}</span>
        </div>

        <p className="text-sm font-light text-[#6b6b6b] leading-relaxed mb-4 line-clamp-2">
          {shortDesc}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider text-[#ad8b27] font-light">
            {view}
          </span>
          <span
            className="text-xs uppercase tracking-widest text-[#102027] font-light
                       flex items-center gap-2 transition-gap duration-300
                       group-hover:gap-3"
          >
            {locale === 'el' ? 'Ανακαλύψτε' : 'Discover'}
            <svg width="20" height="8" viewBox="0 0 20 8" fill="none" aria-hidden="true">
              <path d="M0 4h18M14 1l4 3-4 3" stroke="currentColor" strokeWidth="0.75" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}
