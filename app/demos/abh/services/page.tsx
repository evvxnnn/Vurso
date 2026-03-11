'use client'

import { useCallback, useEffect, useRef } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { Clock, DollarSign } from 'lucide-react'

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

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
}

const SERVICES: Service[] = [
  { id: 'color-1', name: 'Full Color', description: 'Root-to-tip single-process color for a fresh, even look.', duration: 120, price: 150, category: 'color' },
  { id: 'color-2', name: 'Balayage', description: 'Hand-painted highlights for a natural, sun-kissed finish.', duration: 180, price: 250, category: 'color' },
  { id: 'color-3', name: 'Highlights', description: 'Traditional foil highlights for dimension and brightness.', duration: 150, price: 200, category: 'color' },
  { id: 'color-4', name: 'Root Touch-Up', description: 'Quick root refresh to blend regrowth seamlessly.', duration: 60, price: 85, category: 'color' },
  { id: 'color-5', name: 'Color Correction', description: 'Fix uneven color, banding, or unwanted tones. Consultation required.', duration: 240, price: 350, category: 'color' },
  { id: 'cut-1', name: "Women's Haircut", description: 'Precision cut tailored to your face shape and lifestyle.', duration: 45, price: 65, category: 'cut' },
  { id: 'cut-2', name: 'Haircut & Blowout', description: 'Cut followed by a professional blowout and style.', duration: 60, price: 85, category: 'cut' },
  { id: 'cut-3', name: 'Bang Trim', description: 'Quick trim to keep your bangs looking fresh.', duration: 15, price: 15, category: 'cut' },
  { id: 'treat-1', name: 'Deep Conditioning', description: 'Intensive moisture treatment to restore softness and shine.', duration: 30, price: 45, category: 'treatment' },
  { id: 'treat-2', name: 'Keratin Treatment', description: 'Smooth frizz and add shine that lasts for weeks.', duration: 150, price: 300, category: 'treatment' },
  { id: 'treat-3', name: 'Scalp Treatment', description: 'Exfoliating scalp therapy for a healthy foundation.', duration: 30, price: 55, category: 'treatment' },
  { id: 'style-1', name: 'Blowout', description: 'Wash and professional blowout for a polished look.', duration: 45, price: 55, category: 'styling' },
  { id: 'style-2', name: 'Special Occasion Style', description: 'Updo or styled look for weddings, proms, and events.', duration: 60, price: 95, category: 'styling' },
]

const CATEGORY_LABELS: Record<string, string> = {
  color: 'Color',
  cut: 'Cut',
  treatment: 'Treatment',
  styling: 'Styling',
}

const CATEGORY_ORDER = ['color', 'cut', 'treatment', 'styling']

export default function ServicesPage() {
  const [ref] = useInView<HTMLElement>()

  const grouped = CATEGORY_ORDER
    .map(cat => ({
      category: cat,
      label: CATEGORY_LABELS[cat],
      items: SERVICES.filter(s => s.category === cat),
    }))
    .filter(g => g.items.length > 0)

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <section ref={ref} className="animate-on-scroll animate-fade-up pt-28 pb-20 bg-cream min-h-screen">
        <div className="section-container">
          <div className="text-center mb-14">
            <h1 className="font-script text-5xl sm:text-6xl text-charcoal mb-3">Services &amp; Pricing</h1>
            <p className="text-charcoal/50 max-w-lg mx-auto">
              Everything I offer, with transparent pricing. All services include a consultation.
            </p>
          </div>
          <div className="space-y-12">
            {grouped.map(group => (
              <div key={group.category}>
                <h2 className="font-script text-3xl text-charcoal mb-5 border-b border-rose/[0.15] pb-2">{group.label}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.items.map(svc => (
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
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
