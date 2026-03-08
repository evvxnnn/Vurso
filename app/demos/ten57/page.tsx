import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TEN57 MUSIC | Soundtrack to the Future',
  description:
    'Multi-genre record label committed to excellence, creativity, and integrity in music.',
}

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Roster', href: '#roster' },
  { label: 'Listen', href: '#listen' },
  { label: 'Contact', href: '#contact' },
]

const ROSTER = [
  {
    name: 'Artist Name',
    role: 'Hip-Hop / R&B',
    placeholder: 'A',
  },
  {
    name: 'Artist Name',
    role: 'Pop / Electronic',
    placeholder: 'B',
  },
  {
    name: 'Artist Name',
    role: 'Latin / Reggaeton',
    placeholder: 'C',
  },
  {
    name: 'Artist Name',
    role: 'Alternative / Indie',
    placeholder: 'D',
  },
]

const SERVICES = [
  {
    title: 'Production',
    description:
      'World-class studio sessions and production across every genre.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
  },
  {
    title: 'Distribution',
    description:
      'Get your music on every major platform — Spotify, Apple Music, Tidal, and more.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    title: 'Marketing',
    description:
      'Strategic campaigns, playlist pitching, and brand partnerships that move the needle.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
  },
  {
    title: 'Artist Development',
    description:
      'Mentorship, branding, and career strategy to build lasting legacies.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
]

export default function Ten57Demo() {
  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* ── Navigation ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://durable.sfo3.cdn.digitaloceanspaces.com/blocks/34hzDNUa6NMkPbG9irLyXmvgwhBw20neZubJwtUGM8WeS46U54nYe0eb0FvjmVDr.png"
            alt="TEN57 MUSIC"
            className="h-10 w-auto"
          />
          <ul className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-zinc-400 hover:text-red-500 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Mobile: just show the logo — nav links scroll naturally */}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex items-center justify-center min-h-screen overflow-hidden pt-20">
        {/* Radial glow */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              'radial-gradient(ellipse at 50% 30%, rgba(220,38,38,.35) 0%, transparent 70%)',
          }}
        />
        {/* Noise / texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1IiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://durable.sfo3.cdn.digitaloceanspaces.com/blocks/34hzDNUa6NMkPbG9irLyXmvgwhBw20neZubJwtUGM8WeS46U54nYe0eb0FvjmVDr.png"
            alt="TEN57 MUSIC"
            className="h-24 md:h-32 w-auto mx-auto mb-8"
          />
          <p className="text-lg md:text-2xl text-zinc-300 mb-4 tracking-wide">
            Soundtrack to the Future
          </p>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Multi-genre record label committed to excellence, creativity, and
            integrity. Every release reflects an unwavering dedication to the
            culture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#listen"
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wider uppercase text-sm rounded transition-colors"
            >
              Listen Now
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-zinc-700 hover:border-red-600 text-zinc-300 hover:text-white font-semibold tracking-wider uppercase text-sm rounded transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* ── About ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold">
              About
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
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
          </div>
          {/* Stats / social proof */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { value: '50+', label: 'Releases' },
              { value: '10M+', label: 'Total Streams' },
              { value: '12', label: 'Artists' },
              { value: '4', label: 'Genres' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-zinc-800 rounded-lg p-6 text-center hover:border-red-600/50 transition-colors"
              >
                <p className="text-3xl font-bold bg-gradient-to-b from-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-zinc-500 text-sm mt-1 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-24 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Full-service label, zero compromise.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group border border-zinc-800 rounded-lg p-6 hover:border-red-600/50 transition-colors"
              >
                <div className="text-red-500 mb-4">{s.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Artist Roster ── */}
      <section id="roster" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
            Roster
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            The artists building the future.
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ROSTER.map((artist, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-lg border border-zinc-800 hover:border-red-600/50 transition-colors"
              >
                {/* Placeholder image area */}
                <div className="aspect-square bg-zinc-900 flex items-center justify-center">
                  <span className="text-5xl font-bold text-zinc-800 group-hover:text-red-600/30 transition-colors">
                    {artist.placeholder}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">{artist.name}</h3>
                  <p className="text-zinc-500 text-sm">{artist.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listen ── */}
      <section id="listen" className="py-24 px-6 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
            Listen
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Latest releases.
          </h2>
          {/* Spotify embed placeholder */}
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="flex items-center gap-4 border border-zinc-800 rounded-lg p-4 hover:border-red-600/50 transition-colors"
              >
                <div className="w-16 h-16 rounded bg-zinc-900 flex-shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500">
                    <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="font-semibold truncate">Track Title {n}</p>
                  <p className="text-zinc-500 text-sm">Artist Name</p>
                </div>
                <span className="ml-auto text-zinc-600 text-sm">3:45</span>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-600 text-sm mt-8">
            Spotify / Apple Music embeds can be placed here for real tracks.
          </p>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold text-center">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Let&apos;s work together.
          </h2>
          <p className="text-zinc-500 text-center mb-12">
            Submissions, partnerships, press — drop us a line.
          </p>
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-zinc-400 focus:outline-none focus:border-red-600 transition-colors">
              <option>Select a topic</option>
              <option>Artist Submissions</option>
              <option>Business / Partnerships</option>
              <option>Press / Media</option>
              <option>General Inquiry</option>
            </select>
            <textarea
              rows={5}
              placeholder="Your message..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-red-600 transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold tracking-wider uppercase text-sm rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-900 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://durable.sfo3.cdn.digitaloceanspaces.com/blocks/34hzDNUa6NMkPbG9irLyXmvgwhBw20neZubJwtUGM8WeS46U54nYe0eb0FvjmVDr.png"
            alt="TEN57 MUSIC"
            className="h-8 w-auto opacity-60"
          />
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/ten57music"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-red-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a
              href="https://twitter.com/ten57music"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-red-500 transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
          <p className="text-zinc-700 text-sm">
            &copy; {new Date().getFullYear()} TEN57 Music. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
