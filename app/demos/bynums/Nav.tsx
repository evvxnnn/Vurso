'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Phone } from 'lucide-react'

const links = [
  { href: '/demos/bynums', label: 'Home' },
  { href: '/demos/bynums/menu', label: 'Menu & Order' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="/demos/bynums" className="flex items-center gap-3 flex-shrink-0" onClick={() => setMenuOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/bynums/logo-new.webp"
            alt="Bynum's Steakhouse"
            className="h-12 sm:h-14 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-bn-text-mid hover:text-bn-red transition-colors text-sm font-medium"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:317-784-9880"
            className="flex items-center gap-2 bg-bn-red text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            (317) 784-9880
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-bn-text-mid hover:text-bn-red transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-sm border-t border-bn-border">
          <div className="section-container py-4 flex flex-col gap-3">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-bn-text-mid hover:text-bn-red transition-colors py-2 text-base font-medium"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:317-784-9880"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-bn-red text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors mt-1"
            >
              <Phone className="w-3.5 h-3.5" />
              (317) 784-9880
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
