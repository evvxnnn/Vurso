'use client'

import { useState } from 'react'

interface NavLink {
  label: string
  href: string
}

export default function Nav({
  links,
  backLabel,
  backHref,
}: {
  links?: NavLink[]
  backLabel?: string
  backHref?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/demos/ten57">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/ten57/logo-nav.webp"
            alt="TEN57 MUSIC"
            className="h-10 sm:h-14 w-auto"
          />
        </a>

        {/* Desktop links */}
        {links && (
          <ul className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop back link (subpages) */}
        {backLabel && backHref && (
          <a
            href={backHref}
            className="hidden md:block text-zinc-400 hover:text-red-500 transition-colors text-sm tracking-widest uppercase"
          >
            {backLabel}
          </a>
        )}

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
              open ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${
              open ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
              open ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-md">
          <ul className="flex flex-col px-6 py-4 gap-1">
            {links?.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-zinc-300 hover:text-red-500 transition-colors text-sm tracking-widest uppercase"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {backLabel && backHref && (
              <li>
                <a
                  href={backHref}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-zinc-300 hover:text-red-500 transition-colors text-sm tracking-widest uppercase"
                >
                  {backLabel}
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  )
}
