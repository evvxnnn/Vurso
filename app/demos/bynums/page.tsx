'use client'

import { useCallback, useEffect, useRef } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Star, Phone, MapPin, Clock, ChevronRight, Facebook, UtensilsCrossed, Flame } from 'lucide-react'

/* ── Scroll animation hook ── */
function useInView<T extends HTMLElement>(): [React.RefCallback<T>] {
  const observerRef = useRef<IntersectionObserver | null>(null)
  useEffect(() => { return () => { observerRef.current?.disconnect() } }, [])
  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) node.classList.add('in-view') },
      { threshold: 0.12 }
    )
    observerRef.current.observe(node)
  }, [])
  return [ref]
}

/* ── Hero slideshow images ── */
const HERO_IMAGES = [
  '/demos/bynums/hero/1.webp',
  '/demos/bynums/hero/2.webp',
  '/demos/bynums/hero/3.webp',
  '/demos/bynums/hero/4.webp',
  '/demos/bynums/hero/5.webp',
  '/demos/bynums/hero/6.webp',
]

function HeroSlideshow() {
  const durationPerSlide = 7
  const totalDuration = durationPerSlide * HERO_IMAGES.length

  return (
    <div className="absolute inset-0">
      {HERO_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover hero-slide"
          style={{
            animationDelay: `${i * durationPerSlide}s`,
            animationDuration: `${totalDuration}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Data ── */
const HIGHLIGHTS = [
  {
    name: 'Prime Rib',
    description: '32oz bone-in, slow roasted and served with horseradish sauce and au jus.',
    price: '$78',
    tag: 'Signature',
    emoji: '🥩',
  },
  {
    name: 'Bone-In Ribeye',
    description: 'Well-marbled Angus beef, wet-aged 21 days and hand-cut thick.',
    price: '$68',
    tag: 'Popular',
    emoji: '🔥',
  },
  {
    name: 'Lobster Tail',
    description: 'Cold water lobster tail with drawn butter. 8oz to 24oz+.',
    price: 'Market',
    tag: 'From the Deep',
    emoji: '🦞',
  },
  {
    name: 'Surf & Turf',
    description: '7oz filet paired with an 8oz lobster tail.',
    price: 'Market',
    tag: "Chef's Pick",
    emoji: '👨‍🍳',
  },
  {
    name: "Bynum's BBQ Ribs",
    description: 'Full rack, slow roasted until fall-off-the-bone tender.',
    price: '$39',
    tag: 'House Favorite',
    emoji: '🍖',
  },
  {
    name: 'Lobster Voodoo',
    description: 'Fried lobster tail tossed in our spicy voodoo sauce.',
    price: '$29',
    tag: 'Must Try',
    emoji: '🌶️',
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
    quote: 'We tried the porterhouse and the filet — both cooked exactly as ordered. You can tell they take pride in what they do. A real gem.',
    stars: 5,
  },
]

/* ── Page ── */
export default function BynumsHome() {
  const [aboutRef] = useInView<HTMLElement>()
  const [includedRef] = useInView<HTMLElement>()
  const [menuRef] = useInView<HTMLElement>()
  const [testimonialsRef] = useInView<HTMLElement>()
  const [locationRef] = useInView<HTMLElement>()

  return (
    <div className="min-h-screen bg-bn-bg">
      <Nav />

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#1a0e08]">
        <HeroSlideshow />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0e08] via-[#1a0e08]/60 to-[#1a0e08]/40 z-[1]" />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bn-bg to-transparent z-[2]" />

        <div className="section-container relative z-10 py-24 sm:py-32">
          <div className="max-w-2xl">
            {/* Logo */}
            <div className="anim-fade-up">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/bynums/logo-new.webp"
                alt=""
                className="h-20 sm:h-24 w-auto mb-6"
              />
            </div>

            <h1 className="font-[var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl text-white leading-[1.15] anim-fade-up delay-100">
              Voted <span className="text-bn-red-light">#1</span> Steakhouse on Indy&apos;s South Side
            </h1>

            <p className="text-white/70 text-lg sm:text-xl mt-5 leading-relaxed max-w-lg anim-fade-up delay-200">
              Hand-cut Angus steaks, prime rib, and lobster tails. Great food, great value, great service — come as you are.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 anim-fade-up delay-300">
              <a
                href="/demos/bynums/menu"
                className="inline-flex items-center justify-center gap-2 bg-bn-red text-white px-7 py-3.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors shadow-lg shadow-bn-red/25"
              >
                <UtensilsCrossed className="w-4 h-4" />
                View Menu &amp; Order
              </a>
              <a
                href="tel:317-784-9880"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <Phone className="w-4 h-4" />
                (317) 784-9880
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 anim-fade-up delay-400">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-bn-gold text-bn-gold" />
                ))}
              </div>
              <span className="text-white/50 text-sm">Named One of the City&apos;s Top 10 Restaurants</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUICK INFO BAR ══ */}
      <section className="bg-white border-b border-bn-border relative z-10">
        <div className="section-container py-4 sm:py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm">
            <div className="flex items-center gap-2 text-bn-text-mid">
              <MapPin className="w-4 h-4 text-bn-red flex-shrink-0" />
              <span>3850 S. Meridian St, Indianapolis</span>
            </div>
            <div className="flex items-center gap-2 text-bn-text-mid">
              <Clock className="w-4 h-4 text-bn-red flex-shrink-0" />
              <span>Sun–Thu 11–9 &middot; Fri–Sat 11–10</span>
            </div>
            <a href="tel:317-784-9880" className="flex items-center gap-2 text-bn-text-mid hover:text-bn-red transition-colors">
              <Phone className="w-4 h-4 text-bn-red flex-shrink-0" />
              <span>(317) 784-9880</span>
            </a>
            <a
              href="https://www.facebook.com/Bynums-Steakhouse-123899140981873/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-bn-text-mid hover:text-bn-red transition-colors"
            >
              <Facebook className="w-4 h-4 flex-shrink-0" />
              <span>Follow Us</span>
            </a>
          </div>
        </div>
      </section>

      {/* ══ ABOUT ══ */}
      <section ref={aboutRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-bg">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Photo placeholder */}
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-bn-bg-alt border border-bn-border flex items-center justify-center order-2 lg:order-1">
              <div className="text-center p-8">
                <span className="text-7xl block mb-3">🍽️</span>
                <p className="text-bn-text-light text-sm">Restaurant Photo Coming Soon</p>
              </div>
            </div>

            {/* Copy */}
            <div className="order-1 lg:order-2">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-bn-red" />
                <p className="text-bn-red text-sm font-bold uppercase tracking-wider">Over 20 Years Strong</p>
              </div>
              <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text mb-6 leading-snug">
                A South Side Tradition
              </h2>
              <p className="text-bn-text-mid leading-relaxed mb-4">
                Just 3&frac12; miles south of the circle on Meridian Street, Bynum&apos;s
                Steakhouse has been a neighborhood favorite for over two decades. Under
                second-generation owner Ritchie Curry, we keep it simple — great steaks,
                great service, and great value.
              </p>
              <p className="text-bn-text-mid leading-relaxed mb-4">
                Our steaks are hand-cut from Angus beef, wet-aged 21 days, and cut
                1&frac12; to 2 inches thick. We&apos;ve got a full-service bar with premium
                liquors, a solid wine list, and a curated bourbon selection.
              </p>
              <p className="text-bn-text-mid leading-relaxed mb-8">
                We&apos;re a come-as-you-are kind of place. Relaxed atmosphere, plenty of
                free parking, and a staff that treats you like family. That&apos;s why
                people keep coming back.
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

      {/* ══ EVERY ENTRÉE INCLUDES ══ */}
      <section ref={includedRef} className="animate-on-scroll animate-fade-up py-16 sm:py-20 bg-[#2c1810]">
        <div className="section-container text-center">
          <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-white mb-2">
            Every Dinner Entr&eacute;e Includes
          </h2>
          <p className="text-white/40 text-sm mb-10">No hidden extras. This is how we do it.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { emoji: '🍲', name: "Bynum's Onion Soup" },
              { emoji: '🥗', name: 'Garden Salad', sub: 'House-made dressings' },
              { emoji: '🍞', name: 'Fresh Warm Bread' },
              { emoji: '🥔', name: 'Choice of Side', sub: 'Potato, fries, rice, or broccoli' },
            ].map((item, i) => (
              <div key={i} className="py-4">
                <span className="text-4xl block mb-2">{item.emoji}</span>
                <p className="text-white/80 text-sm font-medium">{item.name}</p>
                {item.sub && <p className="text-white/30 text-xs mt-0.5">{item.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED MENU ══ */}
      <section ref={menuRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-bg-alt">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-bn-red" />
              <p className="text-bn-red text-sm font-bold uppercase tracking-wider">From the Butcher&apos;s Block</p>
            </div>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text mb-3">
              What We&apos;re Known For
            </h2>
            <p className="text-bn-text-mid max-w-md mx-auto text-sm">
              Hand-cut Angus beef, wet-aged 21 days. Fresh seafood. A full-service bar. And prices that&apos;ll surprise you.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {HIGHLIGHTS.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-bn-border hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                {/* Image placeholder */}
                <div className="aspect-[16/10] bg-bn-bg-alt flex items-center justify-center relative">
                  <span className="text-5xl">{item.emoji}</span>
                  <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase text-white bg-bn-red px-2.5 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-[var(--font-playfair)] text-xl text-bn-text group-hover:text-bn-red transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-[var(--font-playfair)] text-xl text-bn-text font-bold whitespace-nowrap">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-bn-text-mid text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a
              href="/demos/bynums/menu"
              className="inline-flex items-center gap-2 bg-bn-red text-white px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors shadow-lg shadow-bn-red/20"
            >
              <UtensilsCrossed className="w-4 h-4" />
              Full Menu &amp; Online Ordering
            </a>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section ref={testimonialsRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-bg">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">What Our Guests Say</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text">
              Don&apos;t Take Our Word For It
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-bn-border hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-bn-gold text-bn-gold" />
                  ))}
                </div>
                <p className="text-bn-text-mid text-sm leading-relaxed italic mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-bn-text font-bold text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LOCATION & HOURS ══ */}
      <section ref={locationRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-bg-alt">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-bn-red text-sm font-bold uppercase tracking-wider mb-2">Come See Us</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-text">
              Visit Bynum&apos;s
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-7 border border-bn-border text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bn-red/5 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-5 h-5 text-bn-red" />
              </div>
              <h3 className="text-bn-text font-bold mb-2">Location</h3>
              <p className="text-bn-text-mid text-sm leading-relaxed">
                3850 S. Meridian Street<br />
                Indianapolis, IN 46217
              </p>
              <p className="text-bn-text-light text-xs mt-3">
                3&frac12; miles south of the circle &middot; Free parking
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-bn-border text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bn-red/5 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-5 h-5 text-bn-red" />
              </div>
              <h3 className="text-bn-text font-bold mb-2">Hours</h3>
              <div className="text-sm">
                <p className="text-bn-text-mid">Sunday – Thursday</p>
                <p className="text-bn-text font-medium mb-1.5">11:00 AM – 9:00 PM</p>
                <p className="text-bn-text-mid">Friday – Saturday</p>
                <p className="text-bn-text font-medium">11:00 AM – 10:00 PM</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-7 border border-bn-border text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-full bg-bn-red/5 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-5 h-5 text-bn-red" />
              </div>
              <h3 className="text-bn-text font-bold mb-2">Reservations</h3>
              <a href="tel:317-784-9880" className="text-bn-red text-lg font-bold hover:text-bn-red-dark transition-colors block">
                (317) 784-9880
              </a>
              <p className="text-bn-text-light text-xs mt-3">Walk-ins always welcome</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="/demos/bynums/menu"
              className="inline-flex items-center gap-2 bg-bn-red text-white px-8 py-3.5 rounded-lg text-sm font-bold hover:bg-bn-red-dark transition-colors shadow-lg shadow-bn-red/20"
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
