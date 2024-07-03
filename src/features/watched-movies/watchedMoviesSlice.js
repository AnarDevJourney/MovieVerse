import { createSlice } from "@reduxjs/toolkit";

// Initial state for watched movies
const initialState = {
  watchedMovies: loadWatchedMoviesFromLocalStorage(), // Load watched movies from localStorage on initial load
};

// Function to load watched movies from localStorage
function loadWatchedMoviesFromLocalStorage() {
  const storedMovies = localStorage.getItem("watchedMovies");
  return storedMovies ? JSON.parse(storedMovies) : [];
}

// Function to save watched movies to localStorage
function saveWatchedMoviesToLocalStorage(movies) {
  localStorage.setItem("watchedMovies", JSON.stringify(movies));
}

// Creating a slice for managing watched movies
const watchedMoviesSlice = createSlice({
  name: "watchedMovies",
  initialState,
  reducers: {
    // Reducer function to add a movie to watched movies
    addWatchedMovies: (state, action) => {
      state.watchedMovies.push(action.payload);
      saveWatchedMoviesToLocalStorage(state.watchedMovies);
    },
    // Reducer function to remove a movie from watched list
    removeWatchedMovies: (state, action) => {
      state.watchedMovies = state.watchedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      saveWatchedMoviesToLocalStorage(state.watchedMovies);
    },
    //Reducer function to remove all movies from watched movies list
    removeAllWatchedMovies: (state) => {
      state.watchedMovies = [];
      saveWatchedMoviesToLocalStorage(state.watchedMovies);
    },
  },
});

// Selector to check if a movie is in the watched list
export const selectIsMovieWatched = (state, imdbID) =>
  state.watchedMovies.watchedMovies.some((movie) => movie.imdbID === imdbID);

// Extracting action creators and reducer
export const { addWatchedMovies, removeWatchedMovies, removeAllWatchedMovies } =
  watchedMoviesSlice.actions;

const watchedMoviesReducer = watchedMoviesSlice.reducer;
export default watchedMoviesReducer;
