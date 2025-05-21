import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Fonction pour charger la watchlist depuis le localStorage
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Erreur lors du chargement de la watchlist:", error);
    return [];
  }
};

// Fonction pour sauvegarder la watchlist dans le localStorage
const saveToLocalStorage = (items) => {
  try {
    localStorage.setItem("watchlist", JSON.stringify(items));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la watchlist:", error);
  }
};

export const addToWatchlistWithTimeout = createAsyncThunk(
  "watchlist/addWithTimeout",
  async (movie, { dispatch }) => {
    dispatch(addToWatchlist(movie));
    await new Promise((resolve) => setTimeout(resolve, 3700));
    dispatch(setShowSaved(false));
    return movie;
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    items: loadFromLocalStorage(),
    sortBy: "date",
    searchTerm: "",
    showSaved: false,
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const movie = action.payload;
      if (!state.items.find((m) => m.id === movie.id)) {
        state.items.push({ ...movie, comment: "", rating: 0 });
        state.showSaved = true;
        saveToLocalStorage(state.items);
      }
    },
    removeFromWatchlist: (state, action) => {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
      saveToLocalStorage(state.items);
    },
    updateMovie: (state, action) => {
      const { id, updates } = action.payload;
      const movie = state.items.find((m) => m.id === id);
      if (movie) {
        Object.assign(movie, updates);
        saveToLocalStorage(state.items);
      }
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setShowSaved: (state, action) => {
      state.showSaved = action.payload;
    },
    initializeWatchlist: (state, action) => {
      state.items = action.payload;
      saveToLocalStorage(state.items);
    },
  },
});

export const {
  addToWatchlist,
  removeFromWatchlist,
  updateMovie,
  setSortBy,
  setSearchTerm,
  setShowSaved,
  initializeWatchlist,
} = watchlistSlice.actions;

export default watchlistSlice.reducer;
