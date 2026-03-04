'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  once?: boolean
  margin?: string
  threshold?: number
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
): [React.RefCallback<T>, boolean] {
  const { once = true, margin = '0px', threshold = 0 } = options
  const nodeRef = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = nodeRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin, threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, margin, threshold])

  const ref = useCallback((node: T | null) => {
    nodeRef.current = node
  }, [])

  return [ref, inView]
}
