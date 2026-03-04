'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]'

  const variants = {
    primary: 'bg-accent-purple text-white hover:bg-purple-800 shadow-lg shadow-accent-purple/25',
    secondary: 'bg-primary-navy text-white hover:bg-slate-800',
    outline: 'border-2 border-primary-navy dark:border-white text-primary-navy dark:text-white hover:bg-primary-navy dark:hover:bg-white hover:text-white dark:hover:text-primary-navy',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={classes}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      onClick={onClick}
      type={type}
      className={classes}
    >
      {children}
    </button>
  )
}
