"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToWatchlistButton from "../components/ui/AddToWatchlistButton";
import Button from "../components/ui/Button";
import { AppDispatch, RootState } from "../store";
import { loadMoreMovies, Movie } from "../store/slices/moviesSlice";

interface Category {
  label: string;
  value: string;
}

interface CategoryPageProps {
  categories: Category[];
  category: string;
  fetchCategoryMovies: (cat: string) => void;
  categoryMovies: Movie[];
  loadingCategory: boolean;
  fetchMovieDetails: (movie: Movie) => void;
  addToWatchlist: (movie: Movie) => void;
}

const CategoryPage = ({
  categories,
  category,
  fetchCategoryMovies,
  categoryMovies,
  loadingCategory,
  fetchMovieDetails,
  addToWatchlist,
}: CategoryPageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentPage, totalPages, loadingMore } = useSelector(
    (state: RootState) => state.movies
  );
  const observer = useRef<IntersectionObserver | null>(null);

  const lastMovieElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loadingCategory || loadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && currentPage < totalPages) {
          dispatch(loadMoreMovies({ category, page: currentPage + 1 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingCategory, loadingMore, currentPage, totalPages, category, dispatch]
  );

  return (
    <div className="mb-8">
      <div className="sticky top-[72px] z-30 py-4 bg-neutral-900/95 backdrop-blur-sm border-b border-neutral-800 shadow-lg">
        <div className="flex flex-wrap gap-2 pt-3 pb-1 justify-center max-w-5xl mx-auto px-4">
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
      </div>

      <div className="mt-8">
        {loadingCategory && (
          <div className="text-center text-sky-400">Chargement...</div>
        )}

        {!loadingCategory && categoryMovies.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryMovies.map((movie, index) => (
              <div
                key={movie.id}
                ref={
                  index === categoryMovies.length - 1
                    ? lastMovieElementRef
                    : null
                }
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
        )}

        {loadingMore && (
          <div className="text-center text-sky-400 mt-4">
            Chargement de plus de films...
          </div>
        )}

        {!loadingCategory && categoryMovies.length === 0 && category && (
          <div className="text-center text-gray-400">
            Aucun film trouvé dans cette catégorie
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
