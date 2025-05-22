import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWatchlistWithNotification,
  removeFromWatchlist,
} from "../store/slices/watchlistSlice";

const AddToWatchlistButton = ({ movie }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.items);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (isInWatchlist) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlistWithNotification(movie));
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group relative inline-flex items-center gap-2
        ${
          isInWatchlist
            ? "bg-red-600 hover:bg-red-700"
            : "bg-sky-600 hover:bg-sky-700"
        }
        text-white font-medium px-4 py-2 rounded-lg transition-all duration-200
        ${isAnimating ? "scale-95" : "scale-100"}
      `}
    >
      <span
        className={`
        transition-transform duration-300
        ${isAnimating ? "scale-110" : "scale-100"}
      `}
      >
        {isInWatchlist ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
      <span className="relative">
        {isInWatchlist ? "Retirer" : "Ajouter"}
        <span
          className={`
          absolute left-0 -bottom-4 w-full text-xs text-gray-300 opacity-0
          group-hover:opacity-100 group-hover:-translate-y-1
          transition-all duration-200
        `}
        >
          {isInWatchlist ? "de la watchlist" : "à la watchlist"}
        </span>
      </span>
    </button>
  );
};

export default AddToWatchlistButton;
