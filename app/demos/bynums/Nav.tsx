'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/demos/bynums', label: 'Home' },
  { href: '/demos/bynums/menu', label: 'Menu' },
  { href: '/demos/bynums/order', label: 'Order Online' },
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
          ? 'bg-bn-dark/95 backdrop-blur-sm shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 sm:h-20">
        <a href="/demos/bynums" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <span className="font-[var(--font-playfair)] text-xl sm:text-2xl tracking-wide">
            <span className="text-bn-gold">BYNUM&apos;S</span>
            <span className="text-bn-cream/60 font-light ml-2 text-sm sm:text-base tracking-[0.2em] uppercase">Steakhouse</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-bn-cream/60 hover:text-bn-gold transition-colors text-sm tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:317-784-9880"
            className="border border-bn-gold/40 text-bn-gold px-5 py-2 text-sm tracking-wider uppercase hover:bg-bn-gold hover:text-bn-dark transition-all"
          >
            Call Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-bn-cream/70 hover:text-bn-gold transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-bn-dark/98 backdrop-blur-sm border-t border-bn-gold/10">
          <div className="section-container py-4 flex flex-col gap-3">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-bn-cream/60 hover:text-bn-gold transition-colors py-2 text-base tracking-wider uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:317-784-9880"
              onClick={() => setMenuOpen(false)}
              className="border border-bn-gold/40 text-bn-gold px-5 py-2.5 text-center text-sm tracking-wider uppercase hover:bg-bn-gold hover:text-bn-dark transition-all mt-1"
            >
              Call Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
