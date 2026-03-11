'use client'

import { useCallback, useEffect, useRef } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Clock, DollarSign, Star, Phone, Mail, MapPin, Clock as ClockIcon, Instagram } from 'lucide-react'

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
const FEATURED_SERVICES = [
  { id: 'color-2', name: 'Balayage', description: 'Hand-painted highlights for a natural, sun-kissed finish.', duration: 180, price: 250 },
  { id: 'cut-2', name: 'Haircut & Blowout', description: 'Cut followed by a professional blowout and style.', duration: 60, price: 85 },
  { id: 'treat-2', name: 'Keratin Treatment', description: 'Smooth frizz and add shine that lasts for weeks.', duration: 150, price: 300 },
  { id: 'color-1', name: 'Full Color', description: 'Root-to-tip single-process color for a fresh, even look.', duration: 120, price: 150 },
  { id: 'style-2', name: 'Special Occasion Style', description: 'Updo or styled look for weddings, proms, and events.', duration: 60, price: 95 },
  { id: 'cut-1', name: "Women's Haircut", description: 'Precision cut tailored to your face shape and lifestyle.', duration: 45, price: 65 },
]

const PORTFOLIO = [
  { id: 'p1', caption: 'Lived-in balayage on brunette base — effortless dimension.', tags: ['balayage', 'brunette'], image: '/demos/abh/portfolio/balayage-brunette.webp' },
  { id: 'p2', caption: 'Icy platinum transformation — 3 sessions to perfection.', tags: ['platinum', 'blonde'], image: '/demos/abh/portfolio/icy-platinum.webp' },
  { id: 'p3', caption: 'Curtain bangs + layers for that perfect frame.', tags: ['cut', 'bangs'], image: '/demos/abh/portfolio/curtain-bangs.webp' },
  { id: 'p4', caption: 'Rich copper tones for fall — warm and dimensional.', tags: ['color', 'copper'], image: '/demos/abh/portfolio/copper-tones.webp' },
  { id: 'p5', caption: 'Bridal updo — romantic and effortless.', tags: ['styling', 'bridal'], image: '/demos/abh/portfolio/bridal-updo.webp' },
  { id: 'p6', caption: 'Keratin smoothing on thick curly hair — frizz-free for weeks.', tags: ['treatment', 'keratin'], image: '/demos/abh/portfolio/keratin-smoothing.webp' },
]

const TESTIMONIALS = [
  { id: 't1', name: 'Jessica M.', quote: "Andrea completely transformed my hair. I went from box-dye damage to the most gorgeous balayage I've ever had. She truly listens and delivers.", stars: 5 },
  { id: 't2', name: 'Sarah K.', quote: "Best colorist I've ever been to. She takes her time and the results are always perfect. I won't trust anyone else with my hair.", stars: 5 },
  { id: 't3', name: 'Maria R.', quote: 'I was nervous about going platinum but Andrea walked me through every step. The result was better than I imagined. So professional and talented.', stars: 5 },
  { id: 't4', name: 'Lauren D.', quote: "Finally found my person! Andrea's cuts are always exactly what I want, even when I can't explain it. She just gets it.", stars: 5 },
]

/* ── Page ── */
export default function ABHHome() {
  const [aboutRef] = useInView<HTMLElement>()
  const [servicesRef] = useInView<HTMLElement>()
  const [portfolioRef] = useInView<HTMLElement>()
  const [testimonialsRef] = useInView<HTMLElement>()
  const [contactRef] = useInView<HTMLElement>()

  return (
    <div className="min-h-screen bg-cream">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-b from-blush via-cream to-cream overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-rose/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold/5 rounded-full blur-3xl" />
        <div className="section-container text-center relative z-10 py-32">
          <h1 className="font-script text-6xl sm:text-7xl md:text-8xl text-charcoal anim-fade-up">
            Andrea Burton
          </h1>
          <p className="text-rose text-lg sm:text-xl tracking-[0.3em] uppercase mt-2 anim-fade-up delay-100">
            Hair
          </p>
          <p className="text-charcoal/60 text-lg sm:text-xl max-w-xl mx-auto mt-6 anim-fade-up delay-200">
            Color specialist &amp; stylist creating beautiful, lived-in hair tailored to you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 anim-fade-up delay-300">
            <a href="/demos/abh/book" className="bg-rose text-white px-8 py-3 rounded-full text-base hover:bg-rose-dark transition-colors shadow-lg shadow-rose/20">
              Book an Appointment
            </a>
            <a href="/demos/abh/services" className="border border-rose/30 text-charcoal/70 px-8 py-3 rounded-full text-base hover:border-rose hover:text-rose transition-colors">
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section ref={aboutRef} className="animate-on-scroll animate-fade-up py-20 sm:py-24 bg-cream">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="aspect-[3/4] max-w-sm mx-auto md:mx-0 rounded-2xl bg-gradient-to-br from-rose/20 via-blush to-gold/10 flex items-center justify-center overflow-hidden">
              <span className="text-6xl">💇‍♀️</span>
            </div>
            <div>
              <h2 className="font-script text-4xl sm:text-5xl text-charcoal mb-4">Meet Andrea</h2>
              <p className="text-charcoal/60 leading-relaxed mb-4">
                With over 8 years behind the chair, I specialize in creating beautiful, wearable color that grows out gracefully and cuts that work with your natural texture. Every client gets my full attention — no double-booking, no rushing.
              </p>
              <p className="text-charcoal/60 leading-relaxed mb-6">
                I believe great hair starts with a real conversation. Tell me what you love, what you hate, and how much time you actually want to spend styling — and I&apos;ll make it happen.
              </p>
              <a href="/demos/abh/about" className="text-rose hover:text-rose-dark transition-colors font-medium inline-flex items-center gap-1">
                Learn More <span className="text-lg">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section ref={servicesRef} className="animate-on-scroll animate-fade-up py-20 sm:py-24 bg-blush">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-script text-4xl sm:text-5xl text-charcoal mb-3">Services</h2>
            <p className="text-charcoal/50 max-w-lg mx-auto">
              From color transformations to precision cuts — here&apos;s a look at what I offer.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURED_SERVICES.map(svc => (
              <div key={svc.id} className="bg-white rounded-xl p-5 shadow-sm border border-rose/[0.08] hover:shadow-md hover:border-rose/20 transition-all">
                <h3 className="font-medium text-charcoal text-base mb-1.5">{svc.name}</h3>
                <p className="text-charcoal/50 text-sm leading-relaxed mb-3">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-charcoal/50">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {svc.duration} min
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      ${svc.price}
                    </span>
                  </div>
                  <a
                    href={`/demos/abh/book?service=${svc.id}`}
                    className="text-xs text-rose hover:text-rose-dark transition-colors font-medium"
                  >
                    Book This &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/demos/abh/services" className="inline-flex items-center gap-1 text-rose hover:text-rose-dark transition-colors font-medium">
              View All Services &amp; Pricing <span className="text-lg">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section ref={portfolioRef} className="animate-on-scroll animate-fade-up py-20 sm:py-24 bg-cream">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-script text-4xl sm:text-5xl text-charcoal mb-3">Recent Work</h2>
            <p className="text-charcoal/50 max-w-lg mx-auto">
              A few recent transformations from the chair.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {PORTFOLIO.map(item => (
              <div key={item.id} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-left">
                    <p className="text-white text-sm leading-snug">{item.caption}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="/demos/abh/portfolio" className="inline-flex items-center gap-1 text-rose hover:text-rose-dark transition-colors font-medium">
              View Full Gallery <span className="text-lg">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsRef} className="animate-on-scroll animate-fade-up py-20 sm:py-24 bg-blush">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="font-script text-4xl sm:text-5xl text-charcoal mb-3">Kind Words</h2>
            <p className="text-charcoal/50 max-w-lg mx-auto">What my clients are saying.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-white rounded-xl p-6 shadow-sm border border-rose/[0.08]">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-charcoal/60 text-sm leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
                <p className="text-charcoal font-medium text-sm">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={contactRef} className="animate-on-scroll animate-fade-up py-20 sm:py-24 bg-cream">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-script text-4xl sm:text-5xl text-charcoal mb-3">Get In Touch</h2>
            <p className="text-charcoal/50 mb-10 max-w-lg mx-auto">Ready to book or have questions? I&apos;d love to hear from you.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-left max-w-xl mx-auto">
              <a href="tel:+15551234567" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-rose/[0.08] hover:border-rose/20 transition-colors">
                <Phone className="w-5 h-5 text-rose flex-shrink-0" />
                <div>
                  <p className="text-xs text-charcoal/40">Phone</p>
                  <p className="text-sm text-charcoal">(555) 123-4567</p>
                </div>
              </a>
              <a href="mailto:andrea@andreaburtonhair.com" className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-rose/[0.08] hover:border-rose/20 transition-colors">
                <Mail className="w-5 h-5 text-rose flex-shrink-0" />
                <div>
                  <p className="text-xs text-charcoal/40">Email</p>
                  <p className="text-sm text-charcoal">andrea@andreaburtonhair.com</p>
                </div>
              </a>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-rose/[0.08]">
                <MapPin className="w-5 h-5 text-rose flex-shrink-0" />
                <div>
                  <p className="text-xs text-charcoal/40">Location</p>
                  <p className="text-sm text-charcoal">Austin, TX</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm border border-rose/[0.08]">
                <ClockIcon className="w-5 h-5 text-rose flex-shrink-0" />
                <div>
                  <p className="text-xs text-charcoal/40">Hours</p>
                  <p className="text-sm text-charcoal">Tue–Sat · 9 AM – 6 PM</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-10">
              <a href="#" className="text-charcoal/40 hover:text-rose transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
            <a href="/demos/abh/book" className="inline-block bg-rose text-white px-8 py-3 rounded-full text-base hover:bg-rose-dark transition-colors shadow-lg shadow-rose/20">
              Book an Appointment
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
