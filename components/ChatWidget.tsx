'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    Tawk_API?: object
    Tawk_LoadStart?: Date
  }
}

export default function ChatWidget() {
  useEffect(() => {
    // Tawk.to integration
    // Replace 'YOUR_PROPERTY_ID' and 'YOUR_WIDGET_ID' with your actual Tawk.to IDs
    const s1 = document.createElement('script')
    s1.async = true
    s1.src = 'https://embed.tawk.to/697f4efe2eff4e1c3ce8a1d7/1jgckp4eo'
    s1.charset = 'UTF-8'
    s1.setAttribute('crossorigin', '*')

    const s0 = document.getElementsByTagName('script')[0]
    if (s0 && s0.parentNode) {
      s0.parentNode.insertBefore(s1, s0)
    }

    window.Tawk_API = window.Tawk_API || {}
    window.Tawk_LoadStart = new Date()

    return () => {
      // Cleanup script on unmount
      if (s1.parentNode) {
        s1.parentNode.removeChild(s1)
      }
    }
  }, [])

  return null // This component only loads the Tawk.to script
}
