'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/cn'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  variant?: 'fade' | 'left' | 'image'
  delay?: number
}

export function ScrollReveal({
  children,
  className,
  variant = 'fade',
  delay = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) { element.classList.add('is-visible'); return }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) } }),
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const variantClass = { fade: 'reveal-fade', left: 'reveal-left', image: 'image-reveal' }[variant]

  return (
    <div
      ref={ref}
      className={cn(variantClass, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
