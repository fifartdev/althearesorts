import React from 'react'

interface Stat {
  value: string
  label: string
}

interface StatBarProps {
  stats: Stat[]
  light?: boolean
}

export function StatBar({ stats, light }: StatBarProps) {
  return (
    <div className="flex flex-wrap gap-x-12 gap-y-6">
      {stats.map((stat, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span
            className={`font-editorial text-3xl font-light leading-none ${
              light ? 'text-white' : 'text-[#102027]'
            }`}
          >
            {stat.value}
          </span>
          <span
            className={`text-label-upper ${
              light ? 'text-white/60' : 'text-[#6b6b6b]'
            }`}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
