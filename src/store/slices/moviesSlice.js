import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const searchMovies = createAsyncThunk(
  "movies/search",
  async ({ query, category }) => {
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
  async (category) => {
    let url;
    const page = 1; // Start with first page
    let results;

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
    results = {
      movies: data.results || [],
      totalPages: Math.min(data.total_pages, 10), // Limit to 10 pages max
      currentPage: page,
    };

    return results;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movies/fetchDetails",
  async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=videos,credits`
    );
    const data = await res.json();
    return data;
  }
);

export const loadMoreMovies = createAsyncThunk(
  "movies/loadMore",
  async ({ category, page }) => {
    let url;

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
  },
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
        state.error = action.error.message;
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
        state.error = action.error.message;
        state.loadingMore = false;
      });
  },
});

export const { setQuery, setCategory, clearSelectedMovie } =
  moviesSlice.actions;
export default moviesSlice.reducer;
