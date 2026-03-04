'use client'

import { ReactNode } from 'react'
import { useInView } from '@/lib/useInView'

interface SectionWrapperProps {
  children: ReactNode
  id?: string
  className?: string
  bgColor?: 'white' | 'light' | 'gradient'
}

export default function SectionWrapper({
  children,
  id,
  className = '',
  bgColor = 'white',
}: SectionWrapperProps) {
  const bgStyles = {
    white: 'bg-white dark:bg-slate-950',
    light: 'bg-light-gray dark:bg-slate-900',
    gradient: 'gradient-bg text-white',
  }

  const [ref, inView] = useInView({ once: true, margin: '-100px' })

  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${bgStyles[bgColor]} ${className}`}
    >
      <div
        ref={ref}
        className={`container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl animate-on-scroll animate-fade-up${inView ? ' in-view' : ''}`}
      >
        {children}
      </div>
    </section>
  )
}
