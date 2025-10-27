"use client";

import Image from "next/image";
import { useEffect } from "react";
import AddToWatchlistButton from "../components/ui/AddToWatchlistButton";
import { ClearIcon } from "../icons/NavIcons";
import { Movie } from "../store/slices/moviesSlice";

interface SearchSuggestion {
  category: string;
  items: Array<{ text: string; emoji: string }>;
}

const searchSuggestions: SearchSuggestion[] = [
  {
    category: "Science-Fiction",
    items: [
      { text: "Star Wars", emoji: "🚀" },
      { text: "Matrix", emoji: "🕶" },
      { text: "Blade Runner", emoji: "🌆" },
      { text: "Interstellar", emoji: "🌌" },
      { text: "Dune", emoji: "🏜️" },
      { text: "Alien", emoji: "👽" },
    ],
  },
  {
    category: "Super-héros",
    items: [
      { text: "Marvel", emoji: "🦸‍♂️" },
      { text: "Batman", emoji: "🦇" },
      { text: "Spider-Man", emoji: "🕷️" },
      { text: "Wonder Woman", emoji: "⚡" },
      { text: "Black Panther", emoji: "🐆" },
      { text: "Avengers", emoji: "🛡️" },
    ],
  },
  {
    category: "Animation",
    items: [
      { text: "Miyazaki", emoji: "✨" },
      { text: "Pixar", emoji: "🪄" },
      { text: "Dragon", emoji: "🐉" },
      { text: "Toy Story", emoji: "🤠" },
      { text: "Disney", emoji: "🏰" },
      { text: "Frozen", emoji: "❄️" },
    ],
  },
  {
    category: "Fantastique",
    items: [
      { text: "Harry Potter", emoji: "⚡️" },
      { text: "Seigneur des Anneaux", emoji: "💍" },
      { text: "Pirates des Caraïbes", emoji: "🏴‍☠️" },
      { text: "Narnia", emoji: "🦁" },
      { text: "Avatar", emoji: "🌳" },
      { text: "Game of Thrones", emoji: "🐲" },
    ],
  },
  {
    category: "Films Cultes",
    items: [
      { text: "Inception", emoji: "🌀" },
      { text: "Fight Club", emoji: "👊" },
      { text: "Pulp Fiction", emoji: "🕴️" },
      { text: "Retour vers le Futur", emoji: "⏰" },
      { text: "Shawshank", emoji: "🔒" },
      { text: "Godfather", emoji: "🎭" },
    ],
  },
  {
    category: "Thriller",
    items: [
      { text: "Seven", emoji: "🔍" },
      { text: "Silence des Agneaux", emoji: "🦋" },
      { text: "Gone Girl", emoji: "📓" },
      { text: "Memento", emoji: "📷" },
      { text: "Shutter Island", emoji: "🏝️" },
      { text: "Prestige", emoji: "🎩" },
    ],
  },
  {
    category: "Comédie",
    items: [
      { text: "Hangover", emoji: "🎲" },
      { text: "Superbad", emoji: "🎉" },
      { text: "Bridesmaids", emoji: "👰" },
      { text: "OSS 117", emoji: "🕵️" },
      { text: "La Cité de la Peur", emoji: "🎪" },
      { text: "Les Visiteurs", emoji: "⚔️" },
    ],
  },
  {
    category: "Romance",
    items: [
      { text: "Titanic", emoji: "🚢" },
      { text: "La La Land", emoji: "🎹" },
      { text: "Notebook", emoji: "📔" },
      { text: "Amélie Poulain", emoji: "💝" },
      { text: "Pretty Woman", emoji: "👠" },
      { text: "Love Actually", emoji: "🎄" },
    ],
  },
];

interface SearchPageProps {
  query: string;
  setQuery: (query: string) => void;
  searchMovies: (e: { preventDefault: () => void }) => void;
  results: Movie[];
  fetchMovieDetails: (movie: Movie) => void;
  addToWatchlist: (movie: Movie) => void;
}

const SearchPage = ({
  query,
  setQuery,
  searchMovies,
  results,
  fetchMovieDetails,
  addToWatchlist,
}: SearchPageProps) => {
  // Search automatically when user types
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.length >= 1) {
        searchMovies({ preventDefault: () => {} });
      }
    }, 300); // 300ms delay to avoid too many API calls

    return () => clearTimeout(timeoutId);
  }, [query, searchMovies]);

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <input
            className="w-full border rounded px-4 py-2 bg-neutral-800 text-gray-100 placeholder-gray-400 border-neutral-700 focus:border-sky-600 focus:ring-0 pr-10"
            placeholder="Rechercher un film..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 p-1.5 rounded-full hover:bg-neutral-700/50 transition-colors"
              aria-label="Effacer la recherche"
            >
              <ClearIcon />
            </button>
          )}
        </div>
      </div>

      {!query && (
        <div className="mb-8">
          <div className="text-lg md:text-xl text-gray-100 font-semibold mb-6">
            Découvrez des films par catégorie :
          </div>
          <div className="space-y-6">
            {searchSuggestions.map((category) => (
              <div key={category.category}>
                <div className="text-sky-400 text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
                  {category.category}
                  <div className="h-px flex-1 bg-sky-900/30"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map(({ text, emoji }) => (
                    <button
                      key={text}
                      onClick={() => setQuery(text)}
                      className="px-3 py-1.5 bg-neutral-800/50 rounded-full text-sm text-gray-300 hover:bg-neutral-700/50 hover:text-white transition-all flex items-center gap-1.5 group border border-neutral-700/50 hover:border-sky-900"
                    >
                      <span className="transform group-hover:scale-110 transition-transform duration-200">
                        {emoji}
                      </span>
                      <span>{text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((movie) => (
          <div
            key={movie.id}
            className="bg-neutral-800 rounded-lg shadow p-3 flex flex-col items-center border border-sky-900/30 hover:border-sky-900 transition-colors duration-200"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              width={160}
              height={224}
              unoptimized
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

      {results.length === 0 && query && (
        <div className="text-center text-gray-400 py-8">
          Aucun film trouvé pour cette recherche
        </div>
      )}
    </div>
  );
};

export default SearchPage;
