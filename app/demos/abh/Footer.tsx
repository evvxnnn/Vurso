'use client'

import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white/80">
      <div className="section-container py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-script text-3xl text-rose-light mb-3">Andrea Burton</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Independent hair stylist specializing in color, cuts, and transformations. Bringing your hair vision to life.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <a href="/demos/abh/services" className="text-sm text-white/60 hover:text-rose-light transition-colors">Services &amp; Pricing</a>
              <a href="/demos/abh/portfolio" className="text-sm text-white/60 hover:text-rose-light transition-colors">Portfolio</a>
              <a href="/demos/abh/about" className="text-sm text-white/60 hover:text-rose-light transition-colors">About</a>
              <a href="/demos/abh/book" className="text-sm text-white/60 hover:text-rose-light transition-colors">Book an Appointment</a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90 mb-4">Get In Touch</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+15551234567" className="flex items-center gap-2 text-sm text-white/60 hover:text-rose-light transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0" /> (555) 123-4567
              </a>
              <a href="mailto:andrea@andreaburtonhair.com" className="flex items-center gap-2 text-sm text-white/60 hover:text-rose-light transition-colors">
                <Mail className="w-4 h-4 flex-shrink-0" /> andrea@andreaburtonhair.com
              </a>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="w-4 h-4 flex-shrink-0" /> Austin, TX
              </div>
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Clock className="w-4 h-4 flex-shrink-0" /> Tue–Sat · 9 AM – 6 PM
              </div>
              <a href="#" className="flex items-center gap-2 text-sm text-white/60 hover:text-rose-light transition-colors">
                <Instagram className="w-4 h-4 flex-shrink-0" /> @andreaburtonhair
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Andrea Burton Hair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
