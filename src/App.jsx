import { useEffect, useState } from "react";
import WatchlistPage from "./WatchlistPage";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Utilise la clé depuis .env

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [page, setPage] = useState("search");
  const [sortBy, setSortBy] = useState("date");
  const [searchWatchlist, setSearchWatchlist] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [category, setCategory] = useState("");
  const [categoryMovies, setCategoryMovies] = useState([]);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const categories = [
    { label: "Tous", value: "" },
    { label: "Action", value: "Action" },
    { label: "Comédie", value: "Comedy" },
    { label: "Drame", value: "Drama" },
    { label: "Science-fiction", value: "Science Fiction" },
    { label: "Animation", value: "Animation" },
    { label: "Horreur", value: "Horror" },
    { label: "Romance", value: "Romance" },
    { label: "Documentaire", value: "Documentary" },
  ];

  // Persistance locale
  useEffect(() => {
    const saved = localStorage.getItem("watchlist");
    if (saved) setWatchlist(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Recherche TMDB
  const searchMovies = async (e) => {
    e.preventDefault();
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}`;
    if (category) {
      url += `&with_genres=${getGenreId(category)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setResults(data.results || []);
  };

  // Fonction pour charger les films d'une catégorie
  const fetchCategoryMovies = async (cat) => {
    setLoadingCategory(true);
    setCategory(cat);
    setQuery("");
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}`;
    if (cat) {
      url += `&with_genres=${getGenreId(cat)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    setCategoryMovies(data.results || []);
    setLoadingCategory(false);
  };

  // Fonction pour charger les détails d'un film
  const fetchMovieDetails = async (movie) => {
    setSelectedMovie(movie);
    setLoadingDetails(true);
    setMovieDetails(null);
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
    );
    const data = await res.json();
    setMovieDetails(data);
    setLoadingDetails(false);
  };

  // Utilitaire pour convertir le nom de catégorie en ID de genre TMDB
  function getGenreId(cat) {
    const genreMap = {
      Action: 28,
      Comedy: 35,
      Drama: 18,
      "Science Fiction": 878,
      Animation: 16,
      Horror: 27,
      Romance: 10749,
      Documentary: 99,
    };
    return genreMap[cat] || "";
  }

  // Ajouter à la watchlist
  const addToWatchlist = (movie) => {
    if (!watchlist.find((m) => m.id === movie.id)) {
      setWatchlist([...watchlist, { ...movie, comment: "", rating: 0 }]);
      setShowSaved(true);
      setTimeout(() => setShowSaved(false), 2000);
    }
  };

  // Modifier commentaire/note
  const updateMovie = (id, updates) => {
    setWatchlist(
      watchlist.map((m) => (m.id === id ? { ...m, ...updates } : m))
    );
  };

  // Supprimer un film
  const removeFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((m) => m.id !== id));
  };

  // Trier la watchlist
  const getSortedWatchlist = () => {
    let filtered = watchlist.filter((m) =>
      m.title.toLowerCase().includes(searchWatchlist.toLowerCase())
    );
    if (sortBy === "note") {
      return [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "alpha") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }
    return filtered; // par défaut, ordre d'ajout
  };

  return (
    <div className="min-h-screen bg-neutral-900 bg-gradient-to-b from-neutral-900 to-neutral-800">
      <div className="max-w-2xl mx-auto p-4 bg-neutral-900/95 rounded-xl shadow-xl min-h-[80vh] border border-neutral-800">
        <nav className="sticky top-0 z-30 bg-neutral-900/90 backdrop-blur border-b border-sky-900 flex justify-center gap-8 mb-8 pb-4 shadow-sm">
          <button
            className={`font-semibold px-6 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
              page === "search"
                ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
                : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
            }`}
            onClick={() => setPage("search")}
          >
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                />
              </svg>
              Recherche de films
            </span>
          </button>
          <button
            className={`font-semibold px-6 py-2 rounded-t-lg transition-all duration-200 tracking-wide text-lg shadow-sm border-b-4 ${
              page === "watchlist"
                ? "bg-sky-600 text-white border-sky-600 scale-105 drop-shadow-lg"
                : "bg-neutral-800 text-gray-200 border-transparent hover:bg-sky-900 hover:text-white"
            }`}
            onClick={() => setPage("watchlist")}
          >
            <span className="inline-flex items-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 6h14M5 12h14M5 18h14"
                />
              </svg>
              Ma Watchlist
            </span>
          </button>
        </nav>
        <h1 className="font-bold text-4xl text-center mt-8 mb-10 text-sky-400 drop-shadow-sm tracking-tight">
          Movie Watchlist
        </h1>
        {page === "search" && (
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
                  onClick={() => setCategory(cat.value)}
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
              <div className="flex flex-wrap gap-3 justify-center mb-4">
                {categories
                  .filter((c) => c.value)
                  .map((cat) => (
                    <button
                      key={cat.value}
                      className={`px-4 py-2 rounded-lg border text-base font-medium shadow-sm transition-colors duration-150 ${
                        category === cat.value
                          ? "bg-sky-600 text-white border-sky-600"
                          : "bg-neutral-800 text-sky-200 border-neutral-700 hover:bg-sky-900 hover:text-white"
                      }`}
                      onClick={() => fetchCategoryMovies(cat.value)}
                    >
                      {cat.label}
                    </button>
                  ))}
              </div>
              {loadingCategory && (
                <div className="text-center text-sky-400">Chargement...</div>
              )}
              {!loadingCategory && categoryMovies.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categoryMovies.map((movie) => (
                    <div
                      key={movie.id}
                      className="bg-neutral-800 rounded-lg shadow p-2 flex flex-col items-center border border-sky-900"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt=""
                        className="w-24 h-36 object-cover rounded mb-2 cursor-pointer hover:scale-105 transition-transform duration-200"
                        onClick={() => fetchMovieDetails(movie)}
                      />
                      <div className="font-semibold text-center text-sm mb-1 text-gray-100">
                        {movie.title}
                      </div>
                      <button
                        className="text-xs text-green-400 underline"
                        onClick={() => addToWatchlist(movie)}
                      >
                        Ajouter à la watchlist
                      </button>
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
                    <div className="font-semibold text-gray-100">
                      {movie.title} ({movie.release_date?.split("-")[0]})
                    </div>
                    <button
                      className="text-sm text-green-400 underline"
                      onClick={() => addToWatchlist(movie)}
                    >
                      Ajouter à la watchlist
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {page === "watchlist" && (
          <WatchlistPage
            watchlist={getSortedWatchlist()}
            updateMovie={updateMovie}
            removeFromWatchlist={removeFromWatchlist}
            sortBy={sortBy}
            setSortBy={setSortBy}
            searchWatchlist={searchWatchlist}
            setSearchWatchlist={setSearchWatchlist}
          />
        )}
        {showSaved && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded shadow-lg z-50 animate-fade-in">
            Film ajouté à la watchlist !
          </div>
        )}
        {selectedMovie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-neutral-900 rounded-xl shadow-2xl max-w-lg w-full p-6 relative border border-sky-900 text-gray-100">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl"
                onClick={() => {
                  setSelectedMovie(null);
                  setMovieDetails(null);
                }}
                aria-label="Fermer"
              >
                ×
              </button>
              {loadingDetails || !movieDetails ? (
                <div className="text-center text-sky-400 py-10">
                  Chargement...
                </div>
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
                        {movieDetails.release_date?.split("-")[0]} •{" "}
                        {movieDetails.runtime} min
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-yellow-400 font-bold">
                          ★ {movieDetails.vote_average?.toFixed(1)}
                        </span>
                        <span className="text-xs text-gray-400">
                          ({movieDetails.vote_count} votes)
                        </span>
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
                  <div className="mb-3">
                    <div className="font-semibold mb-1">Synopsis</div>
                    <div className="text-gray-300 text-sm">
                      {movieDetails.overview || "Aucun synopsis."}
                    </div>
                  </div>
                  {movieDetails.videos?.results?.length > 0 && (
                    <div className="mb-3">
                      <div className="font-semibold mb-1">Trailer</div>
                      <a
                        href={`https://www.youtube.com/watch?v=${movieDetails.videos.results[0].key}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-sky-100 bg-sky-600 hover:bg-sky-700 font-semibold px-5 py-2 rounded-lg shadow text-base transition-colors duration-200 mt-1"
                      >
                        Voir le trailer
                      </a>
                    </div>
                  )}
                  {movieDetails.credits?.cast?.length > 0 && (
                    <div className="mb-2">
                      <div className="font-semibold mb-1">
                        Acteurs principaux
                      </div>
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
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
