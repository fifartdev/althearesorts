'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'

interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
  strength?: number
  priority?: boolean
}

export function ParallaxImage({
  src,
  alt,
  className,
  strength = 0.15,
  priority = false,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    let rafId: number

    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height)
        const offset = (progress - 0.5) * strength * rect.height
        image.style.transform = `translateY(${offset}px)`
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [strength])

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className ?? ''}`}>
      <div ref={imageRef} className="absolute inset-0" style={{ margin: '-10%' }}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, 100vw"
        />
      </div>
    </div>
  )
}
