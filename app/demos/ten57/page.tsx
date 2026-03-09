'use client'

import { useEffect, useRef, useState, useCallback, type ReactNode } from 'react'
import Nav from './Nav'

/* ─── Scroll reveal hook ─── */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true
          const duration = 1500
          const start = performance.now()
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.floor(eased * target))
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          obs.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target])

  return <span ref={ref}>{value}{suffix}</span>
}

/* ─── Hero slideshow ─── */
const HERO_IMAGES = [
  '/demos/ten57/hero/studio.webp',
  '/demos/ten57/hero/perform.webp',
  '/demos/ten57/hero/mixer.webp',
  '/demos/ten57/hero/mic.webp',
  '/demos/ten57/hero/hallway.webp',
  '/demos/ten57/hero/guy.webp',
  '/demos/ten57/hero/laptop.webp',
  '/demos/ten57/hero/song-writer.webp',
]

function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % HERO_IMAGES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute inset-0">
      {HERO_IMAGES.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms] ${
            i === current ? 'opacity-30' : 'opacity-0'
          }`}
          style={{
            animation: i === current ? 'kenBurns 6s ease-in-out forwards' : undefined,
          }}
        />
      ))}
    </div>
  )
}

/* ─── Data ─── */
const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Roster', href: '#roster' },
  { label: 'Listen', href: '#listen' },
  { label: 'Blog', href: '/demos/ten57/blog' },
  { label: 'Contact', href: '#contact' },
]

const SPOTLIGHT = [
  {
    name: 'Dreezy',
    role: 'Hip-Hop / R&B',
    spotifyId: '7gWumE1wMALHXANLSIt054',
    image: 'https://i.scdn.co/image/ab6761610000e5eb7e4ce6fbd012d0b1260ea5fa',
    highlight: 'Collab with T-Pain on TEN57',
  },
  {
    name: 'DIRTYXAN',
    role: 'Hip-Hop',
    spotifyId: '5BEGUGWpPDPKXCgqubqnLB',
    image: 'https://i.scdn.co/image/ab6761610000e5eb8be89d75890d7d39c45e7c6c',
    highlight: '500K+ monthly listeners',
  },
]

const STATS = [
  { value: 50, suffix: '+', label: 'Releases' },
  { value: 10, suffix: 'M+', label: 'Total Streams' },
  { value: 12, suffix: '', label: 'Artists' },
  { value: 4, suffix: '', label: 'Genres' },
]

const SERVICES = [
  {
    title: 'Production',
    desc: 'World-class studio sessions and production across every genre.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />,
  },
  {
    title: 'Distribution',
    desc: 'Every major platform — Spotify, Apple Music, Tidal, and more.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
  },
  {
    title: 'Marketing',
    desc: 'Strategic campaigns, playlist pitching, and brand partnerships.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />,
  },
  {
    title: 'Artist Development',
    desc: 'Mentorship, branding, and career strategy to build lasting legacies.',
    icon: <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />,
  },
]

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/ten57music',
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
  },
  {
    label: 'X / Twitter',
    href: 'https://twitter.com/ten57music',
    icon: <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />,
  },
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/playlist/1eBIOk9cR9QVUszAR58z5b',
    icon: <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />,
  },
  {
    label: 'YouTube',
    href: '#',
    icon: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
]

/* ─── Contact form ─── */
function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1500)
  }, [])

  const inputClass =
    'w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600/30 transition-all'

  if (status === 'sent') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-red-600/20 flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-red-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-2">Message Sent</h3>
        <p className="text-zinc-500">We&apos;ll be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-2">Name</label>
          <input type="text" required placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-2">Email</label>
          <input type="email" required placeholder="you@email.com" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-2">Topic</label>
        <select required className={`${inputClass} text-zinc-400`}>
          <option value="">Select a topic</option>
          <option>Artist Submissions</option>
          <option>Business / Partnerships</option>
          <option>Press / Media</option>
          <option>General Inquiry</option>
        </select>
      </div>
      <div>
        <label className="block text-zinc-500 text-xs uppercase tracking-wider mb-2">Message</label>
        <textarea
          rows={5}
          required
          placeholder="What's on your mind?"
          className={`${inputClass} resize-none`}
        />
      </div>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-3.5 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white font-semibold tracking-wider uppercase text-sm rounded-lg transition-all flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}

/* ─── Page ─── */
export default function Ten57Demo() {
  return (
    <div className="min-h-screen bg-black text-white font-[family-name:var(--font-body)]">
      <Nav links={NAV_LINKS} />

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20">
        {/* Slideshow background */}
        <HeroSlideshow />
        {/* Gradient overlay on top of images */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 hero-gradient opacity-40" />
        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/demos/ten57/logo-nav.webp"
            alt="TEN57 MUSIC"
            className="h-28 md:h-40 w-auto mx-auto mb-8 animate-fade-in"
          />
          <p className="font-[family-name:var(--font-display)] text-2xl md:text-4xl text-zinc-200 mb-4 tracking-wide uppercase animate-fade-in-delay-1">
            Soundtrack to the Future
          </p>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-delay-2">
            Multi-genre record label committed to excellence, creativity, and
            integrity. Every release reflects an unwavering dedication to the
            culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay-3">
            <a
              href="#listen"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wider uppercase text-sm rounded transition-colors"
            >
              Listen Now
            </a>
            <a
              href="#contact"
              className="px-8 py-3.5 border border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-white font-semibold tracking-wider uppercase text-sm rounded transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── About ── */}
      <section id="about" className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <Reveal>
            <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold">
              About
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold mb-6 leading-none uppercase">
              Quality is the heartbeat of everything we do.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Based in Woodland Hills, California, TEN57 Music is a
              forward-thinking record label built on a simple principle: every
              piece of music that carries our name must reflect excellence,
              creativity, and integrity.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We work across genres — hip-hop, R&B, pop, electronic, Latin, and
              beyond — to find and develop the artists shaping what comes next.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 100}>
                <div className="border border-zinc-800 rounded-lg p-5 sm:p-6 text-center hover:border-red-600/50 transition-colors">
                  <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent font-[family-name:var(--font-display)]">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-16 md:py-24 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
              What We Do
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 uppercase">
              Full-service label, zero compromise.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={i * 100}>
                <div className="group border border-zinc-800 rounded-lg p-6 hover:border-red-600/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-red-500 mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
                      {s.icon}
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artist Spotlight ── */}
      <section id="roster" className="py-16 md:py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
              Spotlight
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 uppercase">
              The artists building the future.
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto">
            {SPOTLIGHT.map((artist, i) => (
              <Reveal key={artist.name} delay={i * 150}>
                <a
                  href={`https://open.spotify.com/artist/${artist.spotifyId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-lg border border-zinc-800 hover:border-red-600/50 transition-all"
                >
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="aspect-square w-full object-cover bg-zinc-900 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-1 uppercase">{artist.name}</h3>
                    <p className="text-red-500 text-sm mb-2">{artist.role}</p>
                    <p className="text-zinc-600 text-xs">{artist.highlight}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="text-center mt-12">
              <a
                href="/demos/ten57/roster"
                className="inline-block px-8 py-3.5 border border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-white font-semibold tracking-wider uppercase text-sm rounded transition-colors"
              >
                See Full Roster
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Listen ── */}
      <section id="listen" className="py-16 md:py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
              Listen
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-center mb-10 md:mb-16 uppercase">
              Latest Releases.
            </h2>
          </Reveal>
          <Reveal>
            <div className="rounded-lg overflow-hidden border border-zinc-800">
              <iframe
                style={{ borderRadius: '12px' }}
                src="https://open.spotify.com/embed/playlist/1eBIOk9cR9QVUszAR58z5b?utm_source=generator&theme=0"
                width="100%"
                height="352"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="TEN57 Music Playlist"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-16 md:py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
              Contact
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-center mb-4 uppercase">
              Let&apos;s work together.
            </h2>
            <p className="text-zinc-500 text-center mb-12">
              Submissions, partnerships, press — drop us a line.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-900">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/demos/ten57/logo-nav.webp"
                alt="TEN57 MUSIC"
                className="h-10 w-auto mb-4 opacity-80"
              />
              <p className="text-zinc-600 text-sm leading-relaxed">
                Multi-genre record label based in Woodland Hills, CA. Soundtrack to the future.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wider mb-4">Navigate</h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-zinc-500 hover:text-red-500 transition-colors text-sm">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Listen On */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wider mb-4">Listen On</h4>
              <ul className="space-y-2.5">
                {['Spotify', 'Apple Music', 'Tidal', 'YouTube Music', 'SoundCloud'].map((p) => (
                  <li key={p}>
                    <a href="#" className="text-zinc-500 hover:text-red-500 transition-colors text-sm">{p}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-wider mb-4">Follow</h4>
              <div className="flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex items-center justify-center w-11 h-11 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-500 hover:border-red-600/50 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">{s.icon}</svg>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-zinc-700 text-sm">
              &copy; {new Date().getFullYear()} TEN57 Music. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-700 hover:text-zinc-400 text-sm transition-colors">Privacy</a>
              <a href="#" className="text-zinc-700 hover:text-zinc-400 text-sm transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Animations CSS ── */}
      <style jsx>{`
        .hero-gradient {
          background:
            radial-gradient(ellipse at 30% 20%, rgba(220,38,38,.3) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(220,38,38,.15) 0%, transparent 50%);
          animation: heroShift 8s ease-in-out infinite alternate;
        }
        @keyframes heroShift {
          0% { transform: scale(1) translate(0, 0); }
          100% { transform: scale(1.1) translate(-2%, 3%); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease both;
        }
        .animate-fade-in-delay-1 {
          animation: fadeIn 0.8s ease 0.2s both;
        }
        .animate-fade-in-delay-2 {
          animation: fadeIn 0.8s ease 0.4s both;
        }
        .animate-fade-in-delay-3 {
          animation: fadeIn 0.8s ease 0.6s both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: none; }
        }
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </div>
  )
}
