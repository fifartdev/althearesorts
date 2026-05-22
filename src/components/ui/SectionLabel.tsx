import React from 'react'
import { cn } from '@/lib/cn'

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
  light?: boolean
}

export function SectionLabel({ children, className, light }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span
        className={cn(
          'block w-6 h-px',
          light ? 'bg-white/60' : 'bg-[#ad8b27]'
        )}
      />
      <span
        className={cn(
          'text-label-upper',
          light ? 'text-white/70' : 'text-[#ad8b27]'
        )}
      >
        {children}
      </span>
    </div>
  )
}
