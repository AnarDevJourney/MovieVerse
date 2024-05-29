import { createSlice } from "@reduxjs/toolkit";

// Initial state for watched movies
const initialState = {
  watchedMovies: [],
};

// Creating a slice for managing watched movies
const watchedMoviesSlice = createSlice({
  name: "watchedMovies",
  initialState,
  reducers: {
    // Reducer function to add a movie to watched movies
    addWatchedMovies: (state, action) => {
      state.watchedMovies.push(action.payload);
    },
    // Reducer function to remove a movie from watched list
    removeWatchedMovies: (state, action) => {
      state.watchedMovies = state.watchedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

// Selector to check if a movie is in the watched list
export const selectIsMovieWatched = (state, imdbID) =>
  state.watchedMovies.watchedMovies.some((movie) => movie.imdbID === imdbID);

// Extracting action creators and reducer
export const { addWatchedMovies, removeWatchedMovies } =
  watchedMoviesSlice.actions;

const watchedMoviesReducer = watchedMoviesSlice.reducer;
export default watchedMoviesReducer;
