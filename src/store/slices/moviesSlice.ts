import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
  runtime?: number;
  homepage?: string;
  backdrop_path?: string;
  credits?: {
    cast: Array<{
      cast_id: number;
      name: string;
      character?: string;
    }>;
    crew: Array<{
      name: string;
      job: string;
    }>;
  };
  videos?: {
    results: Array<{
      key: string;
      name: string;
    }>;
  };
}

interface MoviesState {
  query: string;
  results: Movie[];
  categoryMovies: Movie[];
  selectedMovie: Movie | null;
  movieDetails: Movie | null;
  category: string;
  loadingCategory: boolean;
  loadingMore: boolean;
  loadingDetails: boolean;
  currentPage: number;
  totalPages: number;
  error: string | null;
}

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, category }: { query: string; category: string }) => {
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}`;
    if (category) {
      url += `&with_genres=${getGenreId(category)}`;
    }
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  }
);

export const fetchCategoryMovies = createAsyncThunk(
  "movies/fetchCategory",
  async (category: string) => {
    let url: string;
    const page = 1; // Start with first page

    if (category === "") {
      // For "All" category, use popular movies endpoint
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`;
    } else {
      // For specific categories
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`;
      url += `&with_genres=${getGenreId(category)}&sort_by=popularity.desc`;
    }

    const res = await fetch(url);
    const data = await res.json();
    const results = {
      movies: data.results || [],
      totalPages: Math.min(data.total_pages, 10), // Limit to 10 pages max
      currentPage: page,
    };

    return results;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (movieId: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
    );
    const data = await res.json();
    return data;
  }
);

export const loadMoreMovies = createAsyncThunk(
  "movies/loadMore",
  async ({ category, page }: { category: string; page: number }) => {
    let url: string;

    if (category === "") {
      url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=fr-FR&page=${page}`;
      url += `&with_genres=${getGenreId(category)}&sort_by=popularity.desc`;
    }

    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  }
);

function getGenreId(cat: string): string {
  const genreMap: { [key: string]: number } = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    "Science Fiction": 878,
    Animation: 16,
    Horror: 27,
    Romance: 10749,
    Documentary: 99,
  };
  return genreMap[cat]?.toString() || "";
}

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    query: "",
    results: [],
    categoryMovies: [],
    selectedMovie: null,
    movieDetails: null,
    category: "",
    loadingCategory: false,
    loadingMore: false,
    loadingDetails: false,
    currentPage: 1,
    totalPages: 1,
    error: null,
  } as MoviesState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    clearSelectedMovie: (state) => {
      state.selectedMovie = null;
      state.movieDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.results = action.payload;
        state.loadingCategory = false;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loadingCategory = false;
      })
      .addCase(fetchCategoryMovies.pending, (state) => {
        state.loadingCategory = true;
      })
      .addCase(fetchCategoryMovies.fulfilled, (state, action) => {
        state.categoryMovies = action.payload.movies;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
        state.loadingCategory = false;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loadingDetails = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        state.selectedMovie = action.payload;
        state.loadingDetails = false;
      })
      .addCase(loadMoreMovies.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(loadMoreMovies.fulfilled, (state, action) => {
        state.categoryMovies = [...state.categoryMovies, ...action.payload];
        state.currentPage += 1;
        state.loadingMore = false;
      })
      .addCase(loadMoreMovies.rejected, (state, action) => {
        state.error = action.error.message || "An error occurred";
        state.loadingMore = false;
      });
  },
});

export const { setQuery, setCategory, clearSelectedMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;
