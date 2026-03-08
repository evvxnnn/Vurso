'use client'

import { useState, useMemo } from 'react'

type SortKey = 'name' | 'genre' | 'signed'

interface Artist {
  name: string
  genre: string
  signed: string // YYYY-MM-DD for sorting
  signedLabel: string
  placeholder: string
}

const ARTISTS: Artist[] = [
  { name: 'Artist A', genre: 'Hip-Hop / R&B', signed: '2022-01-15', signedLabel: 'Jan 2022', placeholder: 'A' },
  { name: 'Artist B', genre: 'Pop / Electronic', signed: '2022-04-10', signedLabel: 'Apr 2022', placeholder: 'B' },
  { name: 'Artist C', genre: 'Latin / Reggaeton', signed: '2022-08-22', signedLabel: 'Aug 2022', placeholder: 'C' },
  { name: 'Artist D', genre: 'Alternative / Indie', signed: '2023-01-05', signedLabel: 'Jan 2023', placeholder: 'D' },
  { name: 'Artist E', genre: 'Hip-Hop / R&B', signed: '2023-03-18', signedLabel: 'Mar 2023', placeholder: 'E' },
  { name: 'Artist F', genre: 'Pop / Electronic', signed: '2023-06-30', signedLabel: 'Jun 2023', placeholder: 'F' },
  { name: 'Artist G', genre: 'Latin / Reggaeton', signed: '2023-09-12', signedLabel: 'Sep 2023', placeholder: 'G' },
  { name: 'Artist H', genre: 'Hip-Hop / R&B', signed: '2024-01-20', signedLabel: 'Jan 2024', placeholder: 'H' },
  { name: 'Artist I', genre: 'Alternative / Indie', signed: '2024-05-08', signedLabel: 'May 2024', placeholder: 'I' },
  { name: 'Artist J', genre: 'Pop / Electronic', signed: '2024-08-14', signedLabel: 'Aug 2024', placeholder: 'J' },
  { name: 'Artist K', genre: 'Hip-Hop / R&B', signed: '2024-11-01', signedLabel: 'Nov 2024', placeholder: 'K' },
  { name: 'Artist L', genre: 'Latin / Reggaeton', signed: '2025-02-10', signedLabel: 'Feb 2025', placeholder: 'L' },
]

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'A – Z' },
  { key: 'signed', label: 'Signing Date' },
  { key: 'genre', label: 'Genre' },
]

const GENRES = Array.from(new Set(ARTISTS.map((a) => a.genre))).sort()

export default function RosterPage() {
  const [sort, setSort] = useState<SortKey>('name')
  const [filterGenre, setFilterGenre] = useState<string>('all')

  const filtered = useMemo(() => {
    let list = ARTISTS
    if (filterGenre !== 'all') {
      list = list.filter((a) => a.genre === filterGenre)
    }
    return [...list].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      if (sort === 'signed') return a.signed.localeCompare(b.signed)
      return a.genre.localeCompare(b.genre) || a.name.localeCompare(b.name)
    })
  }, [sort, filterGenre])

  return (
    <div className="min-h-screen bg-black text-white" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/demos/ten57">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/demos/ten57/logo-nav.png"
              alt="TEN57 MUSIC"
              className="h-14 w-auto"
            />
          </a>
          <a
            href="/demos/ten57"
            className="text-zinc-400 hover:text-red-500 transition-colors text-sm tracking-widest uppercase"
          >
            Back to Home
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="py-20 px-6 text-center">
        <p className="text-red-500 uppercase tracking-widest text-sm mb-3 font-semibold">
          Roster
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Our Artists
        </h1>
        <p className="text-zinc-500 max-w-xl mx-auto">
          The full lineup shaping the future of music at TEN57.
        </p>
      </section>

      {/* Controls */}
      <div className="max-w-5xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-zinc-600 text-sm uppercase tracking-wider">Sort:</span>
            <div className="flex gap-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setSort(opt.key)}
                  className={`px-3 py-1.5 text-sm rounded transition-colors ${
                    sort === opt.key
                      ? 'bg-red-600 text-white'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-zinc-600 text-sm uppercase tracking-wider">Genre:</span>
            <select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-300 focus:outline-none focus:border-red-600 transition-colors"
            >
              <option value="all">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Artist Grid */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((artist, i) => (
            <div
              key={i}
              className="group overflow-hidden rounded-lg border border-zinc-800 hover:border-red-600/50 transition-colors"
            >
              <div className="aspect-square bg-zinc-900 flex items-center justify-center">
                <span className="text-6xl font-bold text-zinc-800 group-hover:text-red-600/30 transition-colors">
                  {artist.placeholder}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-1">{artist.name}</h3>
                <p className="text-red-500 text-sm mb-1">{artist.genre}</p>
                <p className="text-zinc-600 text-xs">Signed {artist.signedLabel}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-zinc-600 text-center py-12">
            No artists match that filter.
          </p>
        )}
      </div>
    </div>
  )
}
