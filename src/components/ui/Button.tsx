import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/cn'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'ghost' | 'outline' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  external?: boolean
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  'aria-label'?: string
}

const base =
  'inline-flex items-center justify-center gap-3 font-ui tracking-[0.18em] uppercase text-xs transition-all duration-500 cursor-pointer select-none'

const variants = {
  primary:
    'bg-[#102027] text-white border border-[#102027] hover:bg-transparent hover:text-[#102027]',
  ghost:
    'bg-transparent text-[#102027] border border-[#102027] hover:bg-[#102027] hover:text-white',
  outline:
    'bg-transparent text-white border border-white hover:bg-white hover:text-[#102027]',
  gold:
    'bg-[#ad8b27] text-white border border-[#ad8b27] hover:bg-transparent hover:text-[#ad8b27]',
}

const sizes = {
  sm: 'h-9 px-5 text-[10px]',
  md: 'h-11 px-7',
  lg: 'h-13 px-10 text-xs',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  external,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}
