'use client'

import { useState } from 'react'
import Nav from '../Nav'

type Category = 'all' | 'news' | 'releases' | 'press' | 'culture'

interface Post {
  title: string
  excerpt: string
  date: string
  category: Category
  categoryLabel: string
  readTime: string
  featured?: boolean
}

const POSTS: Post[] = [
  {
    title: 'Dreezy x T-Pain Drop New Collab Under TEN57 Music',
    excerpt:
      'The highly anticipated single brings together two powerhouse voices for a track that blends R&B soul with T-Pain\'s signature style — and it\'s a TEN57 exclusive.',
    date: 'Mar 1, 2026',
    category: 'releases',
    categoryLabel: 'New Release',
    readTime: '3 min',
    featured: true,
  },
  {
    title: 'DIRTYXAN Crosses 500K Monthly Listeners on Spotify',
    excerpt:
      'A major milestone for one of TEN57\'s flagship artists. DIRTYXAN\'s consistent output and growing fanbase have pushed him past half a million monthly listeners.',
    date: 'Feb 18, 2026',
    category: 'news',
    categoryLabel: 'Label News',
    readTime: '2 min',
    featured: true,
  },
  {
    title: 'How TEN57 Music Is Rethinking Artist Development',
    excerpt:
      'Most labels sign artists and hope for the best. TEN57 takes a different approach — investing in branding, strategy, and long-term career planning from day one.',
    date: 'Feb 10, 2026',
    category: 'culture',
    categoryLabel: 'Culture',
    readTime: '5 min',
  },
  {
    title: 'TEN57 Music Featured in LA Weekly\'s Indie Label Spotlight',
    excerpt:
      'The Woodland Hills-based label was highlighted as one of Southern California\'s emerging independent labels to watch in 2026.',
    date: 'Jan 28, 2026',
    category: 'press',
    categoryLabel: 'Press',
    readTime: '2 min',
  },
  {
    title: 'New Signing: Introducing the Latest Addition to the Roster',
    excerpt:
      'TEN57 continues to expand with a new artist signing that pushes the label further into genre-blending territory. Details and first single coming soon.',
    date: 'Jan 15, 2026',
    category: 'news',
    categoryLabel: 'Label News',
    readTime: '3 min',
  },
  {
    title: 'Why Independent Labels Are Winning in 2026',
    excerpt:
      'Major labels still dominate market share, but independent labels like TEN57 are offering something the majors can\'t: flexibility, creative freedom, and real relationships.',
    date: 'Jan 5, 2026',
    category: 'culture',
    categoryLabel: 'Culture',
    readTime: '6 min',
  },
  {
    title: 'Dreezy\'s Year in Review: Streams, Shows, and What\'s Next',
    excerpt:
      'A look back at a breakout year for Dreezy under TEN57 — from streaming milestones to live performances and upcoming projects.',
    date: 'Dec 20, 2025',
    category: 'news',
    categoryLabel: 'Label News',
    readTime: '4 min',
  },
  {
    title: 'TEN57 Music Playlist: How We Curate and Why It Matters',
    excerpt:
      'Our official Spotify playlist isn\'t just a collection of tracks — it\'s a window into the label\'s sound and direction. Here\'s how we build it.',
    date: 'Dec 8, 2025',
    category: 'culture',
    categoryLabel: 'Culture',
    readTime: '3 min',
  },
]

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'news', label: 'Label News' },
  { key: 'releases', label: 'Releases' },
  { key: 'press', label: 'Press' },
  { key: 'culture', label: 'Culture' },
]

const CATEGORY_COLORS: Record<Category, string> = {
  all: '',
  news: 'text-red-500',
  releases: 'text-emerald-500',
  press: 'text-amber-500',
  culture: 'text-sky-500',
}

export default function BlogPage() {
  const [filter, setFilter] = useState<Category>('all')

  const featured = POSTS.filter((p) => p.featured)
  const filtered = filter === 'all' ? POSTS : POSTS.filter((p) => p.category === filter)

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Nav backLabel="Back to Home" backHref="/demos/ten57" />

      {/* Header */}
      <section className="pt-24 pb-10 md:py-20 px-6 text-center">
        <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold">
          Blog
        </p>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          News & Culture
        </h1>
        <p className="text-zinc-500 max-w-xl mx-auto">
          Label news, new releases, press coverage, and stories from the TEN57 world.
        </p>
      </section>

      {/* Featured Posts */}
      <section className="max-w-5xl mx-auto px-6 mb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {featured.map((post) => (
            <article
              key={post.title}
              className="group border border-zinc-800 rounded-lg overflow-hidden hover:border-red-600/50 transition-colors cursor-pointer"
            >
              <div className="h-40 sm:h-48 bg-zinc-900 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-12 h-12 text-zinc-800 group-hover:text-red-600/30 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${CATEGORY_COLORS[post.category]}`}>
                    {post.categoryLabel}
                  </span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-zinc-600 text-xs">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h2>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-zinc-900" />
      </div>

      {/* Category Filter */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2.5 text-sm rounded transition-colors ${
                filter === cat.key
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* All Posts */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="space-y-4">
          {filtered.map((post) => (
            <article
              key={post.title}
              className="group flex items-start gap-6 border border-zinc-800 rounded-lg p-6 hover:border-red-600/50 transition-colors cursor-pointer"
            >
              <div className="hidden sm:flex w-20 h-20 rounded bg-zinc-900 flex-shrink-0 items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-8 h-8 text-zinc-800 group-hover:text-red-600/30 transition-colors">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-semibold uppercase tracking-wider ${CATEGORY_COLORS[post.category]}`}>
                    {post.categoryLabel}
                  </span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-zinc-600 text-xs">{post.date}</span>
                  <span className="text-zinc-700">·</span>
                  <span className="text-zinc-600 text-xs">{post.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold mb-1 group-hover:text-red-500 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-zinc-600 text-center py-12">
            No posts in this category yet.
          </p>
        )}
      </section>
    </div>
  )
}
