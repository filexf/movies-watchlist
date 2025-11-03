'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MovieDetails from './components/MovieDetails'
import SavedNotification from './components/ui/SavedNotification'
import Footer from './layouts/Footer'
import Navbar from './layouts/Navbar'
import CategoryPage from './page-components/CategoryPage'
import SearchPage from './page-components/SearchPage'
import WatchlistPage from './page-components/WatchlistPage'
import type { AppDispatch, RootState } from './store'
import {
  clearSelectedMovie,
  fetchCategoryMovies,
  fetchMovieDetails,
  searchMovies,
  setCategory,
  setQuery,
} from './store/slices/moviesSlice'
import {
  addToWatchlistWithTimeout,
  removeFromWatchlist,
  setSearchTerm,
  setSortBy,
  updateMovie,
} from './store/slices/watchlistSlice'

const categories = [
  { label: 'Tous', value: '' },
  { label: 'Action', value: 'Action' },
  { label: 'Comédie', value: 'Comedy' },
  { label: 'Drame', value: 'Drama' },
  { label: 'Science-fiction', value: 'Science Fiction' },
  { label: 'Animation', value: 'Animation' },
  { label: 'Horreur', value: 'Horror' },
  { label: 'Romance', value: 'Romance' },
  { label: 'Documentaire', value: 'Documentary' },
]

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const [page, setPage] = useState('categories')

  // Load popular movies on startup
  useEffect(() => {
    dispatch(fetchCategoryMovies(''))
  }, [dispatch])

  const {
    query,
    results,
    category,
    categoryMovies,
    loadingCategory,
    selectedMovie,
    movieDetails,
    loadingDetails,
  } = useSelector((state: RootState) => state.movies)

  const {
    items: watchlist,
    sortBy,
    searchTerm: searchWatchlist,
  } = useSelector((state: RootState) => state.watchlist)

  // Event handlers
  const handleSearch = (e: { preventDefault?: () => void }) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }
    if (query.length >= 1) {
      dispatch(searchMovies({ query, category }))
    }
  }

  const handleCategorySelect = (cat: string) => {
    dispatch(setCategory(cat))
    dispatch(fetchCategoryMovies(cat))
  }

  const handleMovieSelect = (movie: { id: number }) => {
    dispatch(fetchMovieDetails(movie.id))
  }

  return (
    <main className="min-h-screen bg-neutral-900 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="max-w-5xl mx-auto p-4 bg-neutral-900/95 rounded-xl shadow-xl min-h-[80vh] border border-neutral-800">
        <h1 className="font-bold text-6xl text-center mt-8 mb-10 text-sky-100 drop-shadow-sm tracking-tight">
          The Movie Watchlist
        </h1>
        <Navbar page={page} setPage={setPage} />

        {page === 'categories' && (
          <CategoryPage
            categories={categories}
            category={category}
            fetchCategoryMovies={handleCategorySelect}
            categoryMovies={categoryMovies}
            loadingCategory={loadingCategory}
            fetchMovieDetails={handleMovieSelect}
            addToWatchlist={movie => dispatch(addToWatchlistWithTimeout(movie))}
          />
        )}

        {page === 'search' && (
          <SearchPage
            query={query}
            setQuery={q => dispatch(setQuery(q))}
            searchMovies={handleSearch}
            results={results}
            fetchMovieDetails={handleMovieSelect}
            addToWatchlist={movie => dispatch(addToWatchlistWithTimeout(movie))}
          />
        )}

        {page === 'watchlist' && (
          <WatchlistPage
            watchlist={watchlist}
            fetchMovieDetails={handleMovieSelect}
            sortBy={sortBy}
            setSortBy={sort => dispatch(setSortBy(sort))}
            searchWatchlist={searchWatchlist}
            setSearchWatchlist={term => dispatch(setSearchTerm(term))}
            updateMovie={(id, updates) => dispatch(updateMovie({ id, updates }))}
            removeFromWatchlist={id => dispatch(removeFromWatchlist(id))}
          />
        )}

        {selectedMovie && movieDetails && (
          <MovieDetails
            movieDetails={movieDetails}
            selectedMovie={selectedMovie}
            loadingDetails={loadingDetails}
            setSelectedMovie={() => dispatch(clearSelectedMovie())}
            watchlist={watchlist}
            addToWatchlist={movie => dispatch(addToWatchlistWithTimeout(movie))}
            removeFromWatchlist={id => dispatch(removeFromWatchlist(id))}
            updateMovie={(id, updates) => dispatch(updateMovie({ id, updates }))}
          />
        )}

        <SavedNotification />
      </div>
      <Footer />
    </main>
  )
}

export default App
