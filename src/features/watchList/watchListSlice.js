import { createSlice } from "@reduxjs/toolkit";

// Initial state for liked movies
const initialState = {
  watchList: [],
};

// Creating a slice for managing watchlist
const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    // Reducer function to add a movie to watch list
    addWatchList: (state, action) => {
      state.watchList.push(action.payload);
    },
    // Reducer function to remove a movie from watch list
    removeWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (movie) => movie.imdbID !== action.payload
      );
    },
  },
});

// Selector to check if a movie is in the watch list
export const selectIsInWatchList = (state, imdbID) =>
  state.watchList.watchList.some((movie) => movie.imdbID === imdbID);

// Extracting action creators and reducer
export const { addWatchList, removeWatchList } = watchListSlice.actions;

const watchListReducer = watchListSlice.reducer;
export default watchListReducer;
