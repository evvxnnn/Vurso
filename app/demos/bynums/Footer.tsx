'use client'

import { Phone, MapPin, Clock, Facebook } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-bn-dark border-t border-bn-gold/10">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-[var(--font-playfair)] text-2xl text-bn-gold mb-3">
              Bynum&apos;s Steakhouse
            </h3>
            <p className="text-bn-cream/40 text-sm leading-relaxed">
              Voted #1 on Indianapolis&apos; Southside. Serving hand-cut Angus beef,
              prime rib, and lobster tails for over 20 years.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-bn-cream/80 mb-4">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <a href="/demos/bynums/menu" className="text-sm text-bn-cream/40 hover:text-bn-gold transition-colors">
                Full Menu
              </a>
              <a href="/demos/bynums/order" className="text-sm text-bn-cream/40 hover:text-bn-gold transition-colors">
                Order Online
              </a>
              <a href="/demos/bynums/menu#wine" className="text-sm text-bn-cream/40 hover:text-bn-gold transition-colors">
                Wine List
              </a>
              <a href="/demos/bynums/menu#bourbon" className="text-sm text-bn-cream/40 hover:text-bn-gold transition-colors">
                Bourbons
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-bn-cream/80 mb-4">
              Visit Us
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:317-784-9880"
                className="flex items-center gap-2 text-sm text-bn-cream/40 hover:text-bn-gold transition-colors"
              >
                <Phone className="w-4 h-4 flex-shrink-0" /> (317) 784-9880
              </a>
              <div className="flex items-center gap-2 text-sm text-bn-cream/40">
                <MapPin className="w-4 h-4 flex-shrink-0" /> 3850 S. Meridian St, Indianapolis, IN 46217
              </div>
              <div className="flex items-start gap-2 text-sm text-bn-cream/40">
                <Clock className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p>Sun–Thu: 11 AM – 9 PM</p>
                  <p>Fri–Sat: 11 AM – 10 PM</p>
                </div>
              </div>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-bn-cream/40 hover:text-bn-gold transition-colors"
              >
                <Facebook className="w-4 h-4 flex-shrink-0" /> Facebook
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-bn-gold/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-bn-cream/30">
            &copy; {new Date().getFullYear()} Bynum&apos;s Steakhouse. All rights reserved.
          </p>
          <p className="text-xs text-bn-cream/30">
            Visa &middot; Mastercard &middot; Amex &middot; Discover
          </p>
        </div>
      </div>
    </footer>
  )
}
