'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isMobile = window.matchMedia('(hover: none)').matches
    if (isMobile) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0
    let rafId: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animate = () => {
      followerX += (mouseX - followerX) * 0.1
      followerY += (mouseY - followerY) * 0.1
      follower.style.left = `${followerX}px`
      follower.style.top = `${followerY}px`
      rafId = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      follower.style.transform = 'translate(-50%, -50%) scale(2.5)'
      follower.style.opacity = '0.3'
    }

    const onMouseLeaveLink = () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)'
      follower.style.opacity = '0.6'
    }

    document.addEventListener('mousemove', onMouseMove)
    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor" aria-hidden="true" />
      <div ref={followerRef} className="cursor-follower" aria-hidden="true" />
    </>
  )
}
