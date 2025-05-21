import { PlayIcon } from "./icons/ActionIcons";
import RatingStars from "./ui/RatingStars";

const MovieDetails = ({
  movieDetails,
  selectedMovie,
  loadingDetails,
  setSelectedMovie,
  watchlist,
  addToWatchlist,
  removeFromWatchlist,
}) => {
  const watchlistMovie = watchlist.find((m) => m.id === selectedMovie.id);
  const isInWatchlist = !!watchlistMovie;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-neutral-900 rounded-xl shadow-2xl max-w-lg w-full p-6 relative border border-sky-900 text-gray-100">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
          onClick={() => {
            setSelectedMovie(null);
          }}
          aria-label="Fermer"
        >
          ×
        </button>

        {loadingDetails || !movieDetails ? (
          <div className="text-center text-sky-400 py-10">Chargement...</div>
        ) : (
          <>
            <div className="flex gap-4 mb-4">
              <img
                src={`https://image.tmdb.org/t/p/w200${movieDetails.poster_path}`}
                alt=""
                className="w-28 h-40 object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="font-bold text-2xl mb-1">
                  {movieDetails.title}
                </h2>
                <div className="text-sm text-gray-400 mb-2">
                  {new Date(movieDetails.release_date).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}{" "}
                  • {movieDetails.runtime} min
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-400 font-bold">
                      ★ {movieDetails.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">
                      ({movieDetails.vote_count} votes)
                    </span>
                  </div>
                  {isInWatchlist && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Ma note :</span>
                      <RatingStars
                        rating={watchlistMovie.rating}
                        onRate={(rating) =>
                          removeFromWatchlist(selectedMovie.id) ||
                          addToWatchlist({ ...selectedMovie, rating })
                        }
                      />
                    </div>
                  )}
                </div>
                {movieDetails.homepage && (
                  <a
                    href={movieDetails.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 underline text-sm"
                  >
                    Site officiel
                  </a>
                )}
              </div>
            </div>

            {movieDetails.credits?.crew && (
              <div className="mb-3">
                <div className="font-semibold mb-1">Réalisateur</div>
                <div className="text-gray-300 text-sm">
                  {movieDetails.credits.crew.find(
                    (person) => person.job === "Director"
                  )?.name || "Non disponible"}
                </div>
              </div>
            )}

            <div className="mb-3">
              <div className="font-semibold mb-1">Synopsis</div>
              <div className="text-gray-300 text-sm">
                {movieDetails.overview || "Aucun synopsis disponible"}
              </div>
            </div>

            {movieDetails.videos?.results?.length > 0 && (
              <div className="mb-3">
                <div className="font-semibold mb-1">Bande annonce</div>
                <a
                  href={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200"
                >
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Voir la bande annonce
                </a>
              </div>
            )}

            {movieDetails.credits?.cast?.length > 0 && (
              <div className="mb-3">
                <div className="font-semibold mb-1">Acteurs principaux</div>
                <div className="flex flex-wrap gap-2 text-sm">
                  {movieDetails.credits.cast.slice(0, 5).map((actor) => (
                    <span
                      key={actor.cast_id}
                      className="bg-neutral-800 px-2 py-1 rounded-full text-gray-200"
                    >
                      {actor.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-4">
              {isInWatchlist ? (
                <button
                  onClick={() => removeFromWatchlist(selectedMovie.id)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200"
                >
                  Retirer de la watchlist
                </button>
              ) : (
                <button
                  onClick={() => addToWatchlist(selectedMovie)}
                  className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200"
                >
                  Ajouter à la watchlist
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
