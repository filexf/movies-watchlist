'use client'

import { useDispatch, useSelector } from 'react-redux'
import { AddIcon, RemoveIcon } from '../../icons/ActionIcons'
import type { AppDispatch, RootState } from '../../store'
import type { Movie } from '../../store/slices/moviesSlice'
import { removeFromWatchlist } from '../../store/slices/watchlistSlice'

interface AddToWatchlistButtonProps {
  movie: Movie
  onAdd: (movie: Movie) => void
}

const AddToWatchlistButton = ({ movie, onAdd }: AddToWatchlistButtonProps) => {
  const dispatch = useDispatch<AppDispatch>()
  const watchlist = useSelector((state: RootState) => state.watchlist.items)
  const isInWatchlist = watchlist.some(m => m.id === movie.id)

  const handleClick = () => {
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id))
    } else {
      onAdd(movie)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`text-sm flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ${
        isInWatchlist
          ? 'bg-green-600/20 text-green-400 hover:bg-red-600/20 hover:text-red-400'
          : 'bg-sky-600 text-white hover:bg-sky-700'
      }`}
    >
      {isInWatchlist ? (
        <>
          <RemoveIcon className="w-4 h-4" />
          Retirer
        </>
      ) : (
        <>
          <AddIcon className="w-4 h-4" />
          Ajouter
        </>
      )}
    </button>
  )
}

export default AddToWatchlistButton
