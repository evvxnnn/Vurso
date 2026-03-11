'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/demos/abh/services', label: 'Services' },
  { href: '/demos/abh/portfolio', label: 'Portfolio' },
  { href: '/demos/abh/about', label: 'About' },
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
          ? 'bg-cream/95 backdrop-blur-sm shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 sm:h-20">
        <a href="/demos/abh" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/abh/logo.png"
            alt="Andrea Burton Hair"
            className="h-10 sm:h-12 w-auto"
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="text-charcoal/70 hover:text-rose transition-colors text-sm tracking-wide"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/demos/abh/book"
            className="bg-rose text-white px-5 py-2 rounded-full text-sm hover:bg-rose-dark transition-colors"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-charcoal/70 hover:text-rose transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-cream/98 backdrop-blur-sm border-t border-rose/10">
          <div className="section-container py-4 flex flex-col gap-3">
            {links.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-charcoal/70 hover:text-rose transition-colors py-2 text-base"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/demos/abh/book"
              onClick={() => setMenuOpen(false)}
              className="bg-rose text-white px-5 py-2.5 rounded-full text-center text-sm hover:bg-rose-dark transition-colors mt-1"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
