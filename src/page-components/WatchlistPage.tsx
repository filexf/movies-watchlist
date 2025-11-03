'use client'

import Image from 'next/image'
import RatingStars from '../components/ui/RatingStars'
import type { WatchlistMovie } from '../store/slices/watchlistSlice'

interface WatchlistPageProps {
  watchlist: WatchlistMovie[]
  fetchMovieDetails?: (movie: { id: number }) => void
  updateMovie: (id: number, updates: Partial<WatchlistMovie>) => void
  removeFromWatchlist: (id: number) => void
  sortBy: 'date' | 'note' | 'alpha'
  setSortBy: (sort: 'date' | 'note' | 'alpha') => void
  searchWatchlist: string
  setSearchWatchlist: (term: string) => void
}

function WatchlistPage({
  watchlist,
  updateMovie,
  removeFromWatchlist,
  sortBy,
  setSortBy,
  searchWatchlist,
  setSearchWatchlist,
}: WatchlistPageProps) {
  const sortedWatchlist = [...watchlist]
    .filter(movie => (movie.title || '').toLowerCase().includes(searchWatchlist.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'note':
          return (b.rating || 0) - (a.rating || 0)
        case 'alpha':
          return (a.title || '').localeCompare(b.title || '')
        default:
          return 0
      }
    })

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="font-bold text-2xl mb-4 text-center text-sky-400">Ma Watchlist</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          className="border rounded px-2 py-1 flex-1 bg-neutral-800 text-gray-100 placeholder-gray-400 border-neutral-700 focus:border-sky-600 focus:ring-0"
          placeholder="Rechercher dans la watchlist..."
          value={searchWatchlist}
          onChange={e => setSearchWatchlist(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1 bg-neutral-800 text-gray-100 border-neutral-700 focus:border-sky-600 focus:ring-0"
          value={sortBy}
          onChange={e => setSortBy(e.target.value as 'date' | 'note' | 'alpha')}
        >
          <option value="date">Ordre d&apos;ajout</option>
          <option value="note">Note</option>
          <option value="alpha">Alphabétique</option>
        </select>
      </div>
      <div>
        {sortedWatchlist.length === 0 && (
          <div className="text-gray-500 text-center">Aucun film ajouté.</div>
        )}
        {sortedWatchlist.map(movie => (
          <div
            key={movie.id}
            className="border border-sky-900 rounded p-3 mb-4 bg-neutral-800 shadow-sm flex flex-col md:flex-row gap-4 items-center"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width={80}
              height={112}
              unoptimized
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1 w-full">
              <div className="font-semibold text-lg text-gray-100">
                {movie.title}{' '}
                <span className="text-gray-400 font-normal">
                  ({(movie.release_date || '').split('-')[0]})
                </span>
              </div>
              <div className="flex flex-wrap gap-4 items-center mt-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">Ma note :</span>
                  <RatingStars
                    rating={movie.rating || 0}
                    onRate={rating => updateMovie(movie.id, { rating })}
                  />
                </div>
                <textarea
                  className="w-full p-2 mt-2 text-sm bg-neutral-700 text-gray-100 rounded border border-neutral-600 focus:border-sky-600 focus:ring-0"
                  placeholder="Ajouter un commentaire..."
                  value={movie.comment || ''}
                  onChange={e =>
                    updateMovie(movie.id, {
                      comment: e.target.value,
                    })
                  }
                  rows={2}
                />
              </div>
              <button
                type="button"
                className="mt-2 text-red-400 hover:underline text-sm"
                onClick={() => removeFromWatchlist(movie.id)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WatchlistPage
