import AddToWatchlistButton from "./AddToWatchlistButton";

const SearchSection = ({
  query,
  setQuery,
  searchMovies,
  category,
  categories,
  fetchCategoryMovies,
  results,
  categoryMovies,
  loadingCategory,
  fetchMovieDetails,
}) => {
  return (
    <>
      {/* Catégories */}
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        {categories.map((cat) => (
          <button
            key={cat.value}
            type="button"
            className={`px-3 py-1 rounded-full border text-sm font-medium transition-colors duration-150 ${
              category === cat.value
                ? "bg-sky-600 text-white border-sky-600"
                : "bg-neutral-800 text-gray-200 border-neutral-700 hover:bg-sky-900 hover:text-white"
            }`}
            onClick={() => fetchCategoryMovies(cat.value)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Section catégories populaires */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-2 text-sky-400 text-center">
          Explorer par catégorie
        </h3>
        {loadingCategory && (
          <div className="text-center text-sky-400">Chargement...</div>
        )}
        {!loadingCategory && categoryMovies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categoryMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-neutral-800 rounded-lg shadow p-3 flex flex-col items-center border border-sky-900 relative group"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt=""
                  className="w-24 h-36 object-cover rounded mb-2 cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => fetchMovieDetails(movie)}
                />
                <div className="font-semibold text-center text-sm mb-3 text-gray-100">
                  {movie.title}
                </div>
                <div className="mt-auto w-full">
                  <AddToWatchlistButton movie={movie} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recherche */}
      <form onSubmit={searchMovies} className="flex gap-2 mb-6">
        <input
          className="border rounded px-2 py-1 flex-1 bg-neutral-800 text-gray-100 placeholder-gray-400 border-neutral-700 focus:border-sky-600 focus:ring-0"
          placeholder="Rechercher un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-sky-600 text-white px-4 py-1 rounded hover:bg-sky-700"
          type="submit"
        >
          Rechercher
        </button>
      </form>

      {/* Résultats */}
      <div className="mb-8">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="flex items-center gap-4 mb-2 border-b pb-2 border-neutral-800"
          >
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt=""
              className="w-12 h-16 object-cover rounded shadow cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => fetchMovieDetails(movie)}
            />
            <div className="flex-1">
              <div className="font-semibold text-gray-100 mb-2">
                {movie.title} ({movie.release_date?.split("-")[0]})
              </div>
              <AddToWatchlistButton movie={movie} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchSection;
