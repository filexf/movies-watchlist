function WatchlistPage({
  watchlist,
  updateMovie,
  removeFromWatchlist,
  sortBy,
  setSortBy,
  searchWatchlist,
  setSearchWatchlist,
}) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="font-bold text-2xl mb-4 text-center text-sky-400">
        Ma Watchlist
      </h2>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          className="border rounded px-2 py-1 flex-1 bg-neutral-800 text-gray-100 placeholder-gray-400 border-neutral-700 focus:border-sky-600 focus:ring-0"
          placeholder="Rechercher dans la watchlist..."
          value={searchWatchlist}
          onChange={(e) => setSearchWatchlist(e.target.value)}
        />
        <select
          className="border rounded px-2 py-1 bg-neutral-800 text-gray-100 border-neutral-700 focus:border-sky-600 focus:ring-0"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="date">Ordre d'ajout</option>
          <option value="note">Note</option>
          <option value="alpha">Alphabétique</option>
        </select>
      </div>
      <div>
        {watchlist.length === 0 && (
          <div className="text-gray-500 text-center">Aucun film ajouté.</div>
        )}
        {watchlist.map((movie) => (
          <div
            key={movie.id || movie.imdbID}
            className="border border-sky-900 rounded p-3 mb-4 bg-neutral-800 shadow-sm flex flex-col md:flex-row gap-4 items-center"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${
                movie.poster_path || movie.Poster
              }`}
              alt=""
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1 w-full">
              <div className="font-semibold text-lg text-gray-100">
                {movie.title || movie.Title}{" "}
                <span className="text-gray-400 font-normal">
                  ({(movie.release_date || movie.Year || "").split("-")[0]})
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <label className="text-sm text-gray-300">Note :</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={movie.rating}
                  onChange={(e) =>
                    updateMovie(movie.id || movie.imdbID, {
                      rating: Number(e.target.value),
                    })
                  }
                  className="w-16 border rounded px-1 py-0.5 bg-neutral-900 text-gray-100 border-neutral-700 focus:border-sky-600 focus:ring-0"
                />
              </div>
              <div className="mt-2">
                <textarea
                  className="w-full border rounded px-2 py-1 bg-neutral-900 text-gray-100 border-neutral-700 focus:border-sky-600 focus:ring-0"
                  placeholder="Ton commentaire..."
                  value={movie.comment}
                  onChange={(e) =>
                    updateMovie(movie.id || movie.imdbID, {
                      comment: e.target.value,
                    })
                  }
                />
              </div>
              <button
                className="mt-2 text-red-400 hover:underline text-sm"
                onClick={() => removeFromWatchlist(movie.id || movie.imdbID)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchlistPage;
