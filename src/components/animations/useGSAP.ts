'use client'

import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

type GSAPCallback = (gsap: typeof import('gsap').default, container: HTMLElement) => void | (() => void)

export function useGSAP(callback: GSAPCallback, deps: unknown[] = []): RefObject<HTMLDivElement | null> {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let cleanup: (() => void) | void

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger)
        if (containerRef.current) {
          cleanup = callback(gsap, containerRef.current)
        }
      })
    })

    return () => {
      if (typeof cleanup === 'function') cleanup()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}
