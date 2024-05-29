import { createSlice } from "@reduxjs/toolkit";

// Initial state for liked movies
const initialState = {
  likedMovies: [],
};

// Creating a slice for managing liked movies
const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    // Reducer function to add a movie to liked movies
    addLikedMovies: (state, action) => {
      state.likedMovies.push(action.payload);
    },
    // Reducer function to remove a movie from liked movies
    removeLikedMovies: (state, action) => {
      state.likedMovies = state.likedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

// Selector to check if a movie is in the liked list
export const selectIsMovieLiked = (state, imdbID) =>
  state.likedMovies.likedMovies.some((movie) => movie.imdbID === imdbID);

// Extracting action creators and reducer
export const { addLikedMovies, removeLikedMovies } = likedMoviesSlice.actions;

const likedMoviesReducer = likedMoviesSlice.reducer;
export default likedMoviesReducer;
