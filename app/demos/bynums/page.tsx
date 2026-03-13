'use client'

import { useCallback, useEffect, useRef } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Star, Phone, MapPin, Clock, ChevronRight } from 'lucide-react'

/* ── Scroll animation hook ── */
function useInView<T extends HTMLElement>(): [React.RefCallback<T>] {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    return () => { observerRef.current?.disconnect() }
  }, [])

  const ref = useCallback((node: T | null) => {
    observerRef.current?.disconnect()
    if (!node) return
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.classList.add('in-view')
      },
      { threshold: 0.15 }
    )
    observerRef.current.observe(node)
  }, [])

  return [ref]
}

/* ── Data ── */
const FEATURED_MENU = [
  {
    name: 'Prime Rib',
    description: '32oz bone-in, slow roasted and served with horseradish sauce and au jus. Our signature cut.',
    price: '$78',
    tag: 'Signature',
  },
  {
    name: 'Bone-In Ribeye',
    description: 'Well-marbled Angus beef, wet-aged 21 days. Hand-cut 1.5–2 inches thick.',
    price: '$68',
    tag: 'Popular',
  },
  {
    name: 'Lobster Tail',
    description: 'Cold water lobster tail with drawn butter. Available from 8oz to 24oz+.',
    price: 'Market',
    tag: 'From the Deep',
  },
  {
    name: 'Surf & Turf',
    description: '7oz filet paired with an 8oz lobster tail. The best of both worlds.',
    price: 'Market',
    tag: 'Chef\'s Pick',
  },
  {
    name: 'NY Strip',
    description: '20oz hand-cut Angus strip, wet-aged 21 days for peak tenderness and flavor.',
    price: '$54',
    tag: 'Classic',
  },
  {
    name: 'Filet Mignon',
    description: 'The most tender cut. Available in regular or hearty portions.',
    price: '$54',
    tag: 'Premium',
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
    quote: 'We tried the porterhouse and the filet — both were cooked exactly as ordered. You can tell they take pride in what they do. A real gem on the Southside.',
    stars: 5,
  },
]

const STATS = [
  { value: '20+', label: 'Years Serving Indianapolis' },
  { value: '#1', label: 'Voted Southside\'s Best' },
  { value: '21', label: 'Days Wet-Aged' },
  { value: 'Top 10', label: 'City Restaurant' },
]

/* ── Page ── */
export default function BynumsHome() {
  const [aboutRef] = useInView<HTMLElement>()
  const [menuRef] = useInView<HTMLElement>()
  const [testimonialsRef] = useInView<HTMLElement>()
  const [locationRef] = useInView<HTMLElement>()

  return (
    <div className="min-h-screen bg-bn-dark">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-bn-dark via-bn-warm/80 to-bn-dark" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(185,166,92,0.08)_0%,_transparent_70%)]" />
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23b9a65c\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="section-container text-center relative z-10 py-32">
          <div className="anim-fade-in">
            <div className="gold-divider mb-8" />
          </div>
          <p className="text-bn-gold tracking-[0.4em] uppercase text-sm sm:text-base anim-fade-up delay-100">
            Est. Indianapolis
          </p>
          <h1 className="font-[var(--font-playfair)] text-5xl sm:text-7xl md:text-8xl lg:text-9xl mt-4 anim-fade-up delay-200">
            <span className="text-gold-gradient">Bynum&apos;s</span>
          </h1>
          <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl md:text-4xl text-bn-cream/70 mt-2 anim-fade-up delay-300">
            Steakhouse
          </h2>
          <p className="text-bn-cream/50 text-base sm:text-lg max-w-xl mx-auto mt-6 anim-fade-up delay-400">
            Voted #1 on Indianapolis&apos; Southside. Hand-cut Angus beef, prime rib,
            and lobster tails served in a relaxed, welcoming atmosphere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 anim-fade-up delay-500">
            <a
              href="/demos/bynums/order"
              className="bg-bn-gold text-bn-dark px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors"
            >
              Order Online
            </a>
            <a
              href="/demos/bynums/menu"
              className="border border-bn-gold/40 text-bn-gold px-8 py-3.5 text-sm tracking-wider uppercase hover:bg-bn-gold/10 transition-colors"
            >
              View Menu
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 anim-fade-in delay-500">
          <div className="w-[1px] h-12 bg-gradient-to-b from-bn-gold/60 to-transparent" />
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-bn-gold/10 bg-bn-warm/40">
        <div className="section-container py-8 sm:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-bn-gold">{stat.value}</p>
                <p className="text-bn-cream/40 text-xs sm:text-sm tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={aboutRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-dark">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="aspect-[4/3] rounded-lg bg-gradient-to-br from-bn-warm via-bn-dark to-bn-warm/60 flex items-center justify-center border border-bn-gold/10 overflow-hidden">
              <div className="text-center p-8">
                <span className="text-7xl">🥩</span>
                <p className="text-bn-cream/30 text-sm mt-4 tracking-wider uppercase">Photo Coming Soon</p>
              </div>
            </div>
            <div>
              <p className="text-bn-gold tracking-[0.3em] uppercase text-xs mb-3">Our Story</p>
              <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-cream mb-6">
                A Southside Tradition
              </h2>
              <p className="text-bn-cream/50 leading-relaxed mb-4">
                Just 3&frac12; miles south of the circle on Meridian Street, Bynum&apos;s
                Steakhouse has been serving Indianapolis for over 20 years. Now under
                second-generation ownership, Ritchie Curry continues the tradition of
                great value, great service, and the finest hand-cut Angus beef.
              </p>
              <p className="text-bn-cream/50 leading-relaxed mb-4">
                Our steaks are wet-aged for 21 days and hand-cut 1&frac12; to 2 inches
                thick. Every dinner entr&eacute;e includes our famous onion soup, a fresh
                garden salad with house-made dressings, warm bread, and your choice of side.
              </p>
              <p className="text-bn-cream/50 leading-relaxed mb-8">
                Named as one of the city&apos;s Top 10 Restaurants, we invite you to experience
                our relaxed, casual atmosphere and find out why our guests keep coming back.
              </p>
              <a
                href="/demos/bynums/menu"
                className="inline-flex items-center gap-2 text-bn-gold hover:text-bn-gold-light transition-colors text-sm tracking-wider uppercase"
              >
                Explore Our Menu <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section ref={menuRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-warm/30">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-bn-gold tracking-[0.3em] uppercase text-xs mb-3">From the Butcher&apos;s Block</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-cream mb-4">
              Featured Selections
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURED_MENU.map((item, i) => (
              <div
                key={i}
                className="bg-bn-dark/80 border border-bn-gold/10 rounded-lg p-6 hover:border-bn-gold/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-[10px] tracking-wider uppercase text-bn-gold/60 border border-bn-gold/20 px-2 py-0.5">
                    {item.tag}
                  </span>
                  <span className="font-[var(--font-playfair)] text-xl text-bn-gold">{item.price}</span>
                </div>
                <h3 className="font-[var(--font-playfair)] text-xl text-bn-cream group-hover:text-bn-gold transition-colors mb-2">
                  {item.name}
                </h3>
                <p className="text-bn-cream/40 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/demos/bynums/menu"
              className="inline-flex items-center gap-2 text-bn-gold hover:text-bn-gold-light transition-colors text-sm tracking-wider uppercase"
            >
              View Full Menu <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="/demos/bynums/order"
              className="inline-flex items-center gap-2 bg-bn-gold text-bn-dark px-6 py-2.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors"
            >
              Order Online
            </a>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 sm:py-20 bg-bn-dark border-y border-bn-gold/10">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="font-[var(--font-playfair)] text-2xl sm:text-3xl text-bn-cream">
              Every Dinner Entr&eacute;e Includes
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: '🍲', label: "Bynum's Onion Soup" },
              { icon: '🥗', label: 'Garden Salad' },
              { icon: '🍞', label: 'Fresh Warm Bread' },
              { icon: '🥔', label: 'Choice of Side' },
            ].map((item, i) => (
              <div key={i} className="text-center p-4">
                <span className="text-3xl">{item.icon}</span>
                <p className="text-bn-cream/50 text-sm mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-warm/20">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-bn-gold tracking-[0.3em] uppercase text-xs mb-3">What Guests Say</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-cream mb-4">
              Guest Reviews
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="bg-bn-dark/60 border border-bn-gold/10 rounded-lg p-6"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-bn-gold text-bn-gold" />
                  ))}
                </div>
                <p className="text-bn-cream/50 text-sm leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-bn-gold text-sm font-medium">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section ref={locationRef} className="animate-on-scroll animate-fade-up py-20 sm:py-28 bg-bn-dark">
        <div className="section-container">
          <div className="text-center mb-14">
            <p className="text-bn-gold tracking-[0.3em] uppercase text-xs mb-3">Find Us</p>
            <h2 className="font-[var(--font-playfair)] text-3xl sm:text-4xl text-bn-cream mb-4">
              Visit Bynum&apos;s
            </h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            <div className="bg-bn-warm/40 border border-bn-gold/10 rounded-lg p-6 text-center">
              <MapPin className="w-6 h-6 text-bn-gold mx-auto mb-3" />
              <h3 className="text-bn-cream font-medium mb-2">Location</h3>
              <p className="text-bn-cream/40 text-sm leading-relaxed">
                3850 S. Meridian Street<br />
                Indianapolis, IN 46217
              </p>
              <p className="text-bn-cream/30 text-xs mt-2">
                3&frac12; miles south of the circle on Meridian
              </p>
            </div>
            <div className="bg-bn-warm/40 border border-bn-gold/10 rounded-lg p-6 text-center">
              <Clock className="w-6 h-6 text-bn-gold mx-auto mb-3" />
              <h3 className="text-bn-cream font-medium mb-2">Hours</h3>
              <p className="text-bn-cream/40 text-sm">Sunday – Thursday</p>
              <p className="text-bn-cream/60 text-sm mb-1">11:00 AM – 9:00 PM</p>
              <p className="text-bn-cream/40 text-sm">Friday – Saturday</p>
              <p className="text-bn-cream/60 text-sm">11:00 AM – 10:00 PM</p>
            </div>
            <div className="bg-bn-warm/40 border border-bn-gold/10 rounded-lg p-6 text-center">
              <Phone className="w-6 h-6 text-bn-gold mx-auto mb-3" />
              <h3 className="text-bn-cream font-medium mb-2">Reservations</h3>
              <a href="tel:317-784-9880" className="text-bn-gold text-lg hover:text-bn-gold-light transition-colors">
                (317) 784-9880
              </a>
              <p className="text-bn-cream/30 text-xs mt-2">
                Walk-ins always welcome<br />
                Free parking available
              </p>
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="/demos/bynums/order"
              className="inline-block bg-bn-gold text-bn-dark px-8 py-3.5 text-sm font-bold tracking-wider uppercase hover:bg-bn-gold-light transition-colors"
            >
              Order Online
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
