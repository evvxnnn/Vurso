import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div
      className={`
        bg-white/95 dark:bg-slate-800/95
        border border-gray-100 dark:border-slate-700/50
        rounded-2xl shadow-xl
        p-6
        ${hover ? 'hover:scale-[1.02] hover:shadow-[0_25px_50px_-12px_rgba(0,102,255,0.15)] transition-transform' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
