import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { Movie } from './moviesSlice'

export interface WatchlistMovie extends Movie {
  comment: string
  rating: number
}

interface WatchlistState {
  items: WatchlistMovie[]
  sortBy: 'date' | 'note' | 'alpha'
  searchTerm: string
  showSaved: boolean
}

// Function to load watchlist from localStorage
const loadFromLocalStorage = (): WatchlistMovie[] => {
  if (typeof window === 'undefined') return []
  try {
    const saved = localStorage.getItem('watchlist')
    return saved ? JSON.parse(saved) : []
  } catch (error) {
    console.error('Error loading watchlist:', error)
    return []
  }
}

// Function to save watchlist to localStorage
const saveToLocalStorage = (items: WatchlistMovie[]) => {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem('watchlist', JSON.stringify(items))
  } catch (error) {
    console.error('Error saving watchlist:', error)
  }
}

export const addToWatchlistWithTimeout = createAsyncThunk(
  'watchlist/addWithTimeout',
  async (movie: Movie, { dispatch }) => {
    dispatch(addToWatchlist(movie))
    await new Promise(resolve => setTimeout(resolve, 3700))
    dispatch(setShowSaved(false))
    return movie
  },
)

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: loadFromLocalStorage(),
    sortBy: 'date' as const,
    searchTerm: '',
    showSaved: false,
  } as WatchlistState,
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload
      if (!state.items.find(m => m.id === movie.id)) {
        state.items.push({ ...movie, comment: '', rating: 0 })
        state.showSaved = true
        saveToLocalStorage(state.items)
      }
    },
    removeFromWatchlist: (state, action) => {
      state.items = state.items.filter(movie => movie.id !== action.payload)
      saveToLocalStorage(state.items)
    },
    updateMovie: (state, action) => {
      const { id, updates } = action.payload
      const movie = state.items.find(m => m.id === id)
      if (movie) {
        Object.assign(movie, updates)
        saveToLocalStorage(state.items)
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setShowSaved: (state, action) => {
      state.showSaved = action.payload
    },
    initializeWatchlist: (state, action) => {
      state.items = action.payload
      saveToLocalStorage(state.items)
    },
  },
})

export const {
  addToWatchlist,
  removeFromWatchlist,
  updateMovie,
  setSortBy,
  setSearchTerm,
  setShowSaved,
  initializeWatchlist,
} = watchlistSlice.actions
export default watchlistSlice.reducer
