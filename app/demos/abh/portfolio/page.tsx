'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Nav from '../Nav'
import Footer from '../Footer'
import { X } from 'lucide-react'

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

interface PortfolioItem {
  id: string
  caption: string
  tags: string[]
  image: string
}

const ITEMS: PortfolioItem[] = [
  { id: 'p1', caption: 'Lived-in balayage on brunette base — effortless dimension.', tags: ['balayage', 'brunette', 'color'], image: '/demos/abh/portfolio/balayage-brunette.webp' },
  { id: 'p2', caption: 'Icy platinum transformation — 3 sessions to perfection.', tags: ['platinum', 'blonde', 'color'], image: '/demos/abh/portfolio/icy-platinum.webp' },
  { id: 'p3', caption: 'Curtain bangs + layers for that perfect frame.', tags: ['cut', 'bangs', 'layers'], image: '/demos/abh/portfolio/curtain-bangs.webp' },
  { id: 'p4', caption: 'Rich copper tones for fall — warm and dimensional.', tags: ['color', 'copper', 'fall'], image: '/demos/abh/portfolio/copper-tones.webp' },
  { id: 'p5', caption: 'Bridal updo — romantic and effortless.', tags: ['styling', 'bridal', 'updo'], image: '/demos/abh/portfolio/bridal-updo.webp' },
  { id: 'p6', caption: 'Keratin smoothing on thick curly hair — frizz-free for weeks.', tags: ['treatment', 'keratin', 'smooth'], image: '/demos/abh/portfolio/keratin-smoothing.webp' },
  { id: 'p7', caption: 'Face-framing highlights on dark hair — subtle glow.', tags: ['highlights', 'color', 'brunette'], image: '/demos/abh/portfolio/face-framing-highlights.webp' },
  { id: 'p8', caption: 'Textured bob with shadow root — low maintenance, high style.', tags: ['cut', 'bob', 'color'], image: '/demos/abh/portfolio/textured-bob.webp' },
  { id: 'p9', caption: 'Vivid rose gold — custom formula, one of a kind.', tags: ['color', 'vivid', 'rose-gold'], image: '/demos/abh/portfolio/rose-gold.webp' },
]

export default function PortfolioPage() {
  const [ref] = useInView<HTMLElement>()
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const allTags = Array.from(new Set(ITEMS.flatMap(p => p.tags))).sort()
  const filtered = activeTag ? ITEMS.filter(p => p.tags.includes(activeTag)) : ITEMS
  const expandedItem = expanded ? ITEMS.find(p => p.id === expanded) : null

  return (
    <div className="min-h-screen bg-cream">
      <Nav />
      <section ref={ref} className="animate-on-scroll animate-fade-up pt-28 pb-20 bg-cream min-h-screen">
        <div className="section-container">
          <div className="text-center mb-10">
            <h1 className="font-script text-5xl sm:text-6xl text-charcoal mb-3">Portfolio</h1>
            <p className="text-charcoal/50 max-w-lg mx-auto">Browse transformations and find your inspiration.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                !activeTag ? 'bg-rose text-white' : 'bg-white text-charcoal/60 border border-rose/[0.15] hover:border-rose/30'
              }`}
            >
              All
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-1.5 rounded-full text-sm capitalize transition-colors ${
                  activeTag === tag ? 'bg-rose text-white' : 'bg-white text-charcoal/60 border border-rose/[0.15] hover:border-rose/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map(item => (
              <button
                key={item.id}
                onClick={() => setExpanded(item.id)}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer w-full"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.caption} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="text-left">
                    <p className="text-white text-sm leading-snug">{item.caption}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-charcoal/40 py-12">No items match that filter.</p>
          )}
        </div>

        {/* Lightbox */}
        {expandedItem && (
          <div className="fixed inset-0 z-50 bg-charcoal/70 flex items-center justify-center p-4" onClick={() => setExpanded(null)}>
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="bg-charcoal/5 flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={expandedItem.image} alt={expandedItem.caption} className="max-w-full max-h-[70vh] object-contain" />
              </div>
              <div className="p-6">
                <p className="text-charcoal/70 leading-relaxed mb-4">{expandedItem.caption}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {expandedItem.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-blush text-rose capitalize">{tag}</span>
                  ))}
                </div>
                <button onClick={() => setExpanded(null)} className="flex items-center gap-1 text-sm text-charcoal/40 hover:text-charcoal transition-colors">
                  <X className="w-4 h-4" /> Close
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </div>
  )
}
