'use client'

import { Phone, MapPin, Clock, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bn-text text-white/80">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/bynums/logo.png"
                alt="Bynum's Steakhouse"
                className="h-10 w-auto brightness-[2] contrast-75"
              />
              <div className="leading-tight">
                <span className="font-[var(--font-playfair)] text-lg font-bold block">Bynum&apos;s</span>
                <span className="text-white/50 text-[11px] tracking-[0.15em] uppercase">Steakhouse</span>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Voted #1 on Indianapolis&apos; Southside. Serving hand-cut Angus beef
              and lobster tails for over 20 years. Come as you are.
            </p>
            {/* Social */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/Bynums-Steakhouse-123899140981873/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 hover:text-white transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white/90 mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <a href="/demos/bynums/menu" className="text-sm text-white/40 hover:text-white transition-colors">
                Menu &amp; Ordering
              </a>
              <a href="/demos/bynums/menu#steaks" className="text-sm text-white/40 hover:text-white transition-colors">
                Steaks &amp; Entr&eacute;es
              </a>
              <a href="/demos/bynums/menu#wine" className="text-sm text-white/40 hover:text-white transition-colors">
                Wine List
              </a>
              <a href="/demos/bynums/menu#bourbon" className="text-sm text-white/40 hover:text-white transition-colors">
                Bourbons
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold tracking-wider uppercase text-white/90 mb-4">
              Visit Us
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:317-784-9880"
                className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" /> (317) 784-9880
              </a>
              <div className="flex items-center gap-2 text-sm text-white/40">
                <MapPin className="w-4 h-4 flex-shrink-0" /> 3850 S. Meridian St, Indianapolis, IN
              </div>
              <div className="flex items-start gap-2 text-sm text-white/40">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Sun–Thu: 11 AM – 9 PM</p>
                  <p>Fri–Sat: 11 AM – 10 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Bynum&apos;s Steakhouse. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Visa &middot; Mastercard &middot; Amex &middot; Discover
          </p>
        </div>
      </div>
    </footer>
  )
}
