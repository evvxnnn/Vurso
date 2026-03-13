'use client'

import { useEffect } from 'react'

export default function OrderRedirect() {
  useEffect(() => {
    window.location.replace('/demos/bynums/menu')
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-bn-bg">
      <p className="text-bn-text-mid text-sm">Redirecting to menu...</p>
    </div>
  )
}
