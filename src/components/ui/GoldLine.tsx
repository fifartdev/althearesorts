import React from 'react'
import { cn } from '@/lib/cn'

export function GoldLine({ className }: { className?: string }) {
  return (
    <span
      className={cn('block w-10 h-px bg-[#ad8b27]', className)}
      aria-hidden="true"
    />
  )
}
