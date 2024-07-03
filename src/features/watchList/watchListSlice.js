import { createSlice } from "@reduxjs/toolkit";

// Initial state for watchlist
const initialState = {
  watchList: loadWatchListFromLocalStorage(), // Load watchlist from localStorage on initial load
};

// Function to load watchlist from localStorage
function loadWatchListFromLocalStorage() {
  const storedWatchList = localStorage.getItem("watchList");
  return storedWatchList ? JSON.parse(storedWatchList) : [];
}

// Function to save watchlist to localStorage
function saveWatchListToLocalStorage(watchList) {
  localStorage.setItem("watchList", JSON.stringify(watchList));
}

// Creating a slice for managing watchlist
const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    // Reducer function to add a movie to watch list
    addWatchList: (state, action) => {
      state.watchList.push(action.payload);
      saveWatchListToLocalStorage(state.watchList);
    },
    // Reducer function to remove a movie from watch list
    removeWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.imdbID !== action.payload
      );
      saveWatchListToLocalStorage(state.watchList);
    },
    // Reducer function to remove all movies from watchlist
    removeAllMoviesFromWatchList: (state) => {
      state.watchList = [];
      saveWatchListToLocalStorage(state.watchList);
    },
  },
});

// Selector to check if a movie is in the watch list
export const selectIsInWatchList = (state, imdbID) =>
  state.watchList.watchList.some((movie) => movie.imdbID === imdbID);

// Extracting action creators and reducer
export const { addWatchList, removeWatchList, removeAllMoviesFromWatchList } =
  watchListSlice.actions;

const watchListReducer = watchListSlice.reducer;
export default watchListReducer;
