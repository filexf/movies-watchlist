import AddToWatchlistButton from "../components/ui/AddToWatchlistButton";
import Button from "../components/ui/Button";

const CategoryPage = ({
  categories,
  category,
  fetchCategoryMovies,
  categoryMovies,
  loadingCategory,
  fetchMovieDetails,
  addToWatchlist,
}) => {
  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            onClick={() => fetchCategoryMovies(cat.value)}
            active={category === cat.value}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {loadingCategory && (
        <div className="text-center text-sky-400">Chargement...</div>
      )}

      {!loadingCategory && categoryMovies.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-neutral-800 rounded-lg shadow p-3 flex flex-col items-center border border-sky-900/30 hover:border-sky-900 transition-colors duration-200"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                className="w-24 md:w-40 h-36 md:h-56 object-cover rounded mb-2 cursor-pointer hover:scale-105 transition-transform duration-200"
                onClick={() => fetchMovieDetails(movie)}
              />
              <div className="font-semibold text-center text-sm mb-1 text-gray-100">
                {movie.title}
              </div>
              <div className="text-sm text-gray-400 mb-3">
                {movie.release_date?.split("-")[0]}
              </div>
              <AddToWatchlistButton movie={movie} onAdd={addToWatchlist} />
            </div>
          ))}
        </div>
      )}

      {!loadingCategory && categoryMovies.length === 0 && category && (
        <div className="text-center text-gray-400">
          Aucun film trouvé dans cette catégorie
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
