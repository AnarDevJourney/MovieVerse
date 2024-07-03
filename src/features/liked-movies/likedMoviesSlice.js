import { createSlice } from "@reduxjs/toolkit";

// Initial state for liked movies
const initialState = {
  likedMovies: loadLikedMoviesFromLocalStorage(), // Load liked movies from localStorage on initial load
};

// Function to load liked movies from localStorage
function loadLikedMoviesFromLocalStorage() {
  const storedMovies = localStorage.getItem("likedMovies");
  return storedMovies ? JSON.parse(storedMovies) : [];
}

// Function to save liked movies to localStorage
function saveLikedMoviesToLocalStorage(movies) {
  localStorage.setItem("likedMovies", JSON.stringify(movies));
}

// Creating a slice for managing liked movies
const likedMoviesSlice = createSlice({
  name: "likedMovies",
  initialState,
  reducers: {
    // Reducer function to add a movie to liked movies
    addLikedMovies: (state, action) => {
      state.likedMovies.push(action.payload);
      saveLikedMoviesToLocalStorage(state.likedMovies);
    },
    // Reducer function to remove a movie from liked movies
    removeLikedMovies: (state, action) => {
      state.likedMovies = state.likedMovies.filter(
        (movie) => movie.imdbID !== action.payload
      );
      saveLikedMoviesToLocalStorage(state.likedMovies);
    },
    // Reducer function to remove all movies from liked movies list
    removeAllLikedMovies: (state) => {
      state.likedMovies = [];
      saveLikedMoviesToLocalStorage(state.likedMovies);
    },
  },
});

// Selector to check if a movie is in the liked list
export const selectIsMovieLiked = (state, imdbID) =>
  state.likedMovies.likedMovies.some((movie) => movie.imdbID === imdbID);

// Extracting action creators and reducer
export const { addLikedMovies, removeLikedMovies, removeAllLikedMovies } =
  likedMoviesSlice.actions;

const likedMoviesReducer = likedMoviesSlice.reducer;
export default likedMoviesReducer;
