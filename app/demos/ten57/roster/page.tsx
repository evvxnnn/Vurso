'use client'

import { useState, useMemo } from 'react'

type SortKey = 'name' | 'genre' | 'signed'

interface Artist {
  name: string
  genre: string
  signed: string // YYYY-MM-DD for sorting
  signedLabel: string
  image?: string // Spotify profile image URL
  spotifyUrl?: string
}

const ARTISTS: Artist[] = [
  {
    name: 'Dreezy',
    genre: 'Hip-Hop / R&B',
    signed: '2023-06-01',
    signedLabel: 'Jun 2023',
    image: 'https://i.scdn.co/image/ab6761610000e5eb7e4ce6fbd012d0b1260ea5fa',
    spotifyUrl: 'https://open.spotify.com/artist/7gWumE1wMALHXANLSIt054',
  },
  {
    name: 'DIRTYXAN',
    genre: 'Hip-Hop',
    signed: '2022-09-15',
    signedLabel: 'Sep 2022',
    image: 'https://i.scdn.co/image/ab6761610000e5eb8be89d75890d7d39c45e7c6c',
    spotifyUrl: 'https://open.spotify.com/artist/5BEGUGWpPDPKXCgqubqnLB',
  },
  {
    name: 'Kayo Genesis',
    genre: 'Hip-Hop',
    signed: '2022-03-10',
    signedLabel: 'Mar 2022',
  },
  {
    name: 'Sola Vega',
    genre: 'R&B / Soul',
    signed: '2023-01-20',
    signedLabel: 'Jan 2023',
  },
  {
    name: 'PXRVNO',
    genre: 'Hip-Hop / Trap',
    signed: '2023-04-08',
    signedLabel: 'Apr 2023',
  },
  {
    name: 'Nia Monsoon',
    genre: 'R&B / Soul',
    signed: '2023-08-14',
    signedLabel: 'Aug 2023',
  },
  {
    name: 'Yunø',
    genre: 'Latin / Reggaeton',
    signed: '2023-11-02',
    signedLabel: 'Nov 2023',
  },
  {
    name: 'CVLT45',
    genre: 'Hip-Hop / Trap',
    signed: '2024-02-19',
    signedLabel: 'Feb 2024',
  },
  {
    name: 'Jade Valor',
    genre: 'Pop / Alternative',
    signed: '2024-05-30',
    signedLabel: 'May 2024',
  },
  {
    name: 'BLKSMTH',
    genre: 'Hip-Hop',
    signed: '2024-08-22',
    signedLabel: 'Aug 2024',
  },
  {
    name: 'Rosa Veneno',
    genre: 'Latin / Reggaeton',
    signed: '2024-11-10',
    signedLabel: 'Nov 2024',
  },
  {
    name: 'Axiom',
    genre: 'Pop / Alternative',
    signed: '2025-01-15',
    signedLabel: 'Jan 2025',
  },
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
          {filtered.map((artist, i) => {
            const Card = (
              <div className="group overflow-hidden rounded-lg border border-zinc-800 hover:border-red-600/50 transition-colors">
                <div className="aspect-square bg-zinc-900 flex items-center justify-center overflow-hidden">
                  {artist.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl font-bold text-zinc-800 group-hover:text-red-600/30 transition-colors">
                      {artist.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-1">{artist.name}</h3>
                  <p className="text-red-500 text-sm mb-1">{artist.genre}</p>
                  <p className="text-zinc-600 text-xs">Signed {artist.signedLabel}</p>
                </div>
              </div>
            )

            if (artist.spotifyUrl) {
              return (
                <a key={i} href={artist.spotifyUrl} target="_blank" rel="noopener noreferrer">
                  {Card}
                </a>
              )
            }
            return <div key={i}>{Card}</div>
          })}
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
