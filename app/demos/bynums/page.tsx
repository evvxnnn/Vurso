'use client'

import { useCallback, useEffect, useRef } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Star, Phone, MapPin, Clock, ChevronRight, Facebook, UtensilsCrossed } from 'lucide-react'

/* ── Scroll animation hook ── */
function useInView<T extends HTMLElement>(): [React.RefCallback<T>] {
  const observerRef = useRef<IntersectionObserver | null>(null)
  useEffect(() => { return () => { observerRef.current?.disconnect() } }, [])
  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) node.classList.add('in-view') },
      { threshold: 0.15 }
    )
    observerRef.current.observe(node)
  }, [])
  return [ref]
}

/* ── Data ── */
const HIGHLIGHTS = [
  {
    name: 'Prime Rib',
    description: '32oz bone-in, slow roasted and served with horseradish sauce and au jus.',
    price: '$78',
    tag: 'Signature',
  },
  {
    name: 'Bone-In Ribeye',
    description: 'Well-marbled Angus beef, wet-aged 21 days and hand-cut thick.',
    price: '$68',
    tag: 'Popular',
  },
  {
    name: 'Lobster Tail',
    description: 'Cold water lobster tail with drawn butter. 8oz to 24oz+.',
    price: 'Market',
    tag: 'From the Deep',
  },
  {
    name: 'Surf & Turf',
    description: '7oz filet paired with an 8oz lobster tail.',
    price: 'Market',
    tag: "Chef's Pick",
  },
  {
    name: "Bynum's BBQ Ribs",
    description: 'Full rack, slow roasted until fall-off-the-bone tender.',
    price: '$39',
    tag: 'House Favorite',
  },
  {
    name: 'Lobster Voodoo',
    description: 'Fried lobster tail tossed in our spicy voodoo sauce.',
    price: '$29',
    tag: 'Must Try',
  },
]

const TESTIMONIALS = [
  {
    name: 'Mike S.',
    quote: 'Best prime rib in Indianapolis, hands down. The 32oz bone-in is absolutely incredible. Been coming here for 15 years and it never disappoints.',
    stars: 5,
  },
  {
    name: 'Jennifer L.',
    quote: 'Amazing steaks at great prices. The atmosphere is relaxed and the service is always top-notch. Our go-to spot for date night.',
    stars: 5,
  },
  {
    name: 'David R.',
    quote: 'The lobster tail was perfectly cooked — sweet, tender, and enormous. Combined with the onion soup and house salad, it was an unbelievable meal.',
    stars: 5,
  },
  {
    name: 'Sarah M.',
    quote: 'We tried the porterhouse and the filet — both cooked exactly as ordered. You can tell they take pride in what they do. A real Southside gem.',
    stars: 5,
  },
]

/* ── Page ── */
export default function BynumsHome() {
  const [aboutRef] = useInView<HTMLElement>()
  const [menuRef] = useInView<HTMLElement>()
  const [includedRef] = useInView<HTMLElement>()
  const [testimonialsRef] = useInView<HTMLElement>()
  const [locationRef] = useInView<HTMLElement>()

  return (
    <div className="min-h-screen bg-bn-bg">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden bg-bn-text">
        {/* Background image placeholder */}
        <div className="absolute inset-0 bg-gradient-to-r from-bn-text via-bn-text/90 to-bn-text/70" />
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <div className="h-full bg-gradient-to-br from-[#3d2b1f] to-[#1a0e08] flex items-center justify-center">
            <span className="text-8xl opacity-20">🥩</span>
          </div>
        </div>

        <div className="section-container relative z-10 py-24 sm:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 anim-fade-up">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/bynums/logo.png"
                alt=""
                className="h-14 sm:h-16 w-auto brightness-[2] contrast-75"
              />
            </div>
            <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-white leading-tight anim-fade-up delay-100">
              Indianapolis&apos; <span className="text-bn-red-light">#1</span> Southside Steakhouse
            </h1>
            <p className="text-white/60 text-lg sm:text-xl mt-4 max-w-lg anim-fade-up delay-200">
              Hand-cut Angus steaks, prime rib, and lobster tails. Great food, great value — come as you are.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 anim-fade-up delay-300">
              <a
                href="/demos/bynums/menu"
                className="inline-flex items-center justify-center gap-2 bg-bn-red text-white px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors"
              >
                <UtensilsCrossed className="w-4 h-4" />
                View Menu &amp; Order
              </a>
              <a
                href="tel:317-784-9880"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white px-7 py-3.5 rounded-lg text-sm font-medium hover:border-white/40 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call for Reservations
              </a>
            </div>
            <div className="flex items-center gap-6 mt-8 anim-fade-up delay-400">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-bn-gold text-bn-gold" />
                ))}
              </div>
              <span className="text-white/40 text-sm">Voted #1 &middot; Top 10 City Restaurant</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick info bar */}
      <section className="bg-white border-b border-bn-border">
        <div className="section-container py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2 text-bn-text-mid">
              <MapPin className="w-4 h-4 text-bn-red" />
              3850 S. Meridian St, Indianapolis
            </div>
            <div className="flex items-center gap-2 text-bn-text-mid">
              <Clock className="w-4 h-4 text-bn-red" />
              Open Daily &middot; 11 AM
            </div>
            <div className="flex items-center gap-2 text-bn-text-mid">
              <Phone className="w-4 h-4 text-bn-red" />
              (317) 784-9880
            </div>
            <a
              href="https://www.facebook.com/Bynums-Steakhouse-123899140981873/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-bn-text-mid hover:text-bn-red transition-colors"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="animate-on-scroll animate-fade-up py-16 sm:py-24 bg-bn-bg">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="aspect-[4/3] rounded-2xl bg-bn-bg-alt flex items-center justify-center border border-bn-border overflow-hidden order-2 lg:order-1">
              <div className="text-center p-8">
                <span className="text-7xl">🍽️</span>
                <p className="text-bn-text-light text-sm mt-4">Photo Coming Soon</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">Since 2000+</p>
              <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text mb-5">
                A Southside Tradition
              </h2>
              <p className="text-bn-text-mid leading-relaxed mb-4">
                Just 3&frac12; miles south of the circle on Meridian Street, Bynum&apos;s
                Steakhouse has been serving Indianapolis for over 20 years. Now under
                second-generation ownership with Ritchie Curry, we keep it simple: great
                steaks, great service, and great value.
              </p>
              <p className="text-bn-text-mid leading-relaxed mb-4">
                Our steaks are hand-cut from Angus beef, wet-aged 21 days, and cut
                1&frac12; to 2 inches thick. We&apos;re a come-as-you-are kind of place —
                relaxed atmosphere, plenty of free parking, and a full-service bar.
              </p>
              <p className="text-bn-text-mid leading-relaxed mb-6">
                Named one of the city&apos;s Top 10 Restaurants, we invite you to see
                what keeps our guests coming back.
              </p>
              <a
                href="/demos/bynums/menu"
                className="inline-flex items-center gap-2 text-bn-red hover:text-bn-red-dark transition-colors text-sm font-bold"
              >
                See Our Full Menu <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section ref={includedRef} className="animate-on-scroll animate-fade-up py-14 sm:py-16 bg-bn-text">
        <div className="section-container">
          <div className="text-center mb-8">
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-white">
              Every Dinner Entr&eacute;e Includes
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: '🍲', name: "Bynum's Onion Soup" },
              { icon: '🥗', name: 'Garden Salad' },
              { icon: '🍞', name: 'Fresh Warm Bread' },
              { icon: '🥔', name: 'Choice of Side' },
            ].map((item, i) => (
              <div key={i} className="text-center py-4">
                <span className="text-4xl">{item.icon}</span>
                <p className="text-white/60 text-sm mt-2">{item.name}</p>
                <p className="text-white/30 text-xs mt-0.5">with house-made dressings</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section ref={menuRef} className="animate-on-scroll animate-fade-up py-16 sm:py-24 bg-bn-bg-alt">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">From the Butcher&apos;s Block</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text mb-3">
              What We&apos;re Known For
            </h2>
            <p className="text-bn-text-mid max-w-lg mx-auto">
              Hand-cut Angus beef, wet-aged 21 days. Fresh seafood. Full-service bar.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-bn-border hover:shadow-md hover:border-bn-red/20 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-bn-red bg-bn-red/5 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <span className="font-[var(--font-playfair)] text-xl text-bn-text font-bold">{item.price}</span>
                </div>
                <h3 className="font-[var(--font-playfair)] text-xl text-bn-text group-hover:text-bn-red transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-bn-text-mid text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="/demos/bynums/menu"
              className="inline-flex items-center gap-2 bg-bn-red text-white px-7 py-3 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Full Menu &amp; Online Ordering
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="animate-on-scroll animate-fade-up py-16 sm:py-24 bg-bn-bg">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">What Guests Say</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text">
              Don&apos;t Take Our Word for It
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-bn-border"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-bn-gold text-bn-gold" />
                  ))}
                </div>
                <p className="text-bn-text-mid text-sm leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-bn-text font-bold text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section ref={locationRef} className="animate-on-scroll animate-fade-up py-16 sm:py-24 bg-bn-bg-alt">
        <div className="section-container">
          <div className="text-center mb-10">
            <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">Come See Us</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text">
              Visit Bynum&apos;s
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-bn-border text-center">
              <MapPin className="w-6 h-6 text-bn-red mx-auto mb-3" />
              <h3 className="text-bn-text font-bold mb-2">Location</h3>
              <p className="text-bn-text-mid text-sm leading-relaxed">
                3850 S. Meridian Street<br />
                Indianapolis, IN 46217
              </p>
              <p className="text-bn-text-light text-xs mt-2">
                3&frac12; miles south of the circle &middot; Free parking
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-bn-border text-center">
              <Clock className="w-6 h-6 text-bn-red mx-auto mb-3" />
              <h3 className="text-bn-text font-bold mb-2">Hours</h3>
              <p className="text-bn-text-mid text-sm">Sunday – Thursday</p>
              <p className="text-bn-text text-sm font-medium mb-1">11:00 AM – 9:00 PM</p>
              <p className="text-bn-text-mid text-sm">Friday – Saturday</p>
              <p className="text-bn-text text-sm font-medium">11:00 AM – 10:00 PM</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-bn-border text-center">
              <Phone className="w-6 h-6 text-bn-red mx-auto mb-3" />
              <h3 className="text-bn-text font-bold mb-2">Reservations</h3>
              <a href="tel:317-784-9880" className="text-bn-red text-lg font-bold hover:text-bn-red-dark transition-colors">
                (317) 784-9880
              </a>
              <p className="text-bn-text-light text-xs mt-2">
                Walk-ins always welcome
              </p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a
              href="/demos/bynums/menu"
              className="inline-flex items-center gap-2 bg-bn-red text-white px-7 py-3 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors"
            >
              Order Online for Pickup
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
