'use client'

import { useCallback, useEffect, useRef } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'

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

const BIO = [
  "Hair has always been more than a job for me — it's how I connect with people. I started behind the chair over 8 years ago, and I fell in love with the way a great color or cut can completely change how someone feels about themselves.",
  "I specialize in lived-in color techniques like balayage, dimensional highlights, and custom formulations that look natural and grow out beautifully. I also love a good precision cut — whether it's a textured bob, long layers, or curtain bangs that frame your face just right.",
  "My philosophy is simple: listen first, then create. Every head of hair is different, and every client has a different lifestyle. I take the time to understand what you want, what works for your texture and maintenance level, and then deliver something you'll love walking out the door — and love even more as it grows.",
  "When I'm not at the salon, you can find me exploring Austin coffee shops, spending time with my dog, or testing out new color techniques on willing friends and family.",
]

const SPECIALTIES = [
  'Balayage & Highlights',
  'Color Correction',
  'Precision Cuts',
  'Keratin Treatments',
  'Bridal & Event Styling',
  'Textured Hair',
]

export default function AboutPage() {
  const [ref] = useInView<HTMLElement>()

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <section ref={ref} className="animate-on-scroll animate-fade-up pt-28 pb-20 bg-cream min-h-screen">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-rose/20 via-blush to-gold/10 flex items-center justify-center sticky top-28 overflow-hidden">
                <span className="text-7xl">💇‍♀️</span>
              </div>
              <div>
                <h1 className="font-script text-5xl sm:text-6xl text-charcoal mb-6">About Andrea</h1>
                <div className="space-y-4 text-charcoal/60 leading-relaxed">
                  {BIO.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-10 p-6 bg-blush rounded-xl border border-rose/10">
                  <h3 className="font-script text-2xl text-charcoal mb-2">Specialties</h3>
                  <ul className="grid grid-cols-2 gap-2 text-sm text-charcoal/60">
                    {SPECIALTIES.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <a
                    href="/demos/abh/book"
                    className="inline-block bg-rose text-white px-8 py-3 rounded-full text-base hover:bg-rose-dark transition-colors shadow-lg shadow-rose/20"
                  >
                    Book an Appointment
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
