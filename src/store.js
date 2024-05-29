import { configureStore } from "@reduxjs/toolkit";

// Importing the reducer functions for managing the watched movies, liked movies, watchlist slice of the Redux state
import watchedMoviesReducer from "./features/watched-movies/watchedMoviesSlice";
import likedMoviesReducer from "./features/liked-movies/likedMoviesSlice";
import watchListReducer from "./features/watchList/watchListSlice";

const store = configureStore({
  reducer: {
    watchedMovies: watchedMoviesReducer,
    likedMovies: likedMoviesReducer,
    watchList: watchListReducer,
  },
});

export default store;
