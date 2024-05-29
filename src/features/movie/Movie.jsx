import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

//Importing function for fetching movie data by id
import { fetchMoviesByID } from "../../services/apiMovies";

//Importing our Error component to show fetching errors
import FetchingErrors from "../../ui/FethchingErrors";

//Importing our Loader component
import Loader from "../../ui/Loader";

//Importing action creators and selector from watched movies slice
import {
  addWatchedMovies,
  removeWatchedMovies,
  selectIsMovieWatched,
} from "../watched-movies/watchedMoviesSlice";

//Importing action creators and selector from liked movies slice
import {
  addLikedMovies,
  removeLikedMovies,
  selectIsMovieLiked,
} from "../liked-movies/likedMoviesSlice";

//Importing action creators and selector from watch-list slice
import {
  addWatchList,
  removeWatchList,
  selectIsInWatchList,
} from "../watchList/watchListSlice";

// Importing helper function for generate youtube link
import { generateYouTubeLink } from "../../utils/helpers";

//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

//Importing movie information components
import Cast from "./Cast";
import Details from "./Details";
import Ratings from "./Ratings";
import Released from "./Released";

// Fake movie data
/* const movieData = {
  Title: "Guardians of the Galaxy Vol. 2",
  Year: "2017",
  Rated: "PG-13",
  Released: "05 May 2017",
  Runtime: "136 min",
  Genre: "Action, Adventure, Comedy",
  Director: "James Gunn",
  Writer: "James Gunn, Dan Abnett, Andy Lanning",
  Actors: "Chris Pratt, Zoe Saldana, Dave Bautista",
  Plot: "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
  Language: "English",
  Country: "United States",
  Awards: "Nominated for 1 Oscar. 15 wins & 60 nominations total",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
  Ratings: [
    {
      Source: "Internet Movie Database",
      Value: "7.6/10",
    },
    {
      Source: "Rotten Tomatoes",
      Value: "85%",
    },
    {
      Source: "Metacritic",
      Value: "67/100",
    },
  ],
  Metascore: "67",
  imdbRating: "7.6",
  imdbVotes: "757,026",
  imdbID: "tt3896198",
  Type: "movie",
  DVD: "10 Jul 2017",
  BoxOffice: "$389,813,101",
  Production: "N/A",
  Website: "N/A",
  Response: "True",
}; */

const Movie = () => {
  // Getting imdbID from URL parametrs
  const { id } = useParams();
  const dispatch = useDispatch();

  // State for controlling table items(cast,details,ratings,releases)
  const [activeItem, setActiveItem] = useState("cast");

  // Function for controlling active table item change
  function handleActiveItemChange(item) {
    setActiveItem(item);
  }

  // Data for checking movie is watched or not
  const isMovieWatched = useSelector((state) =>
    selectIsMovieWatched(state, id)
  );

  // Data for checking movie is liked or not
  const isMovieLiked = useSelector((state) => selectIsMovieLiked(state, id));

  // Data for checking movie is in watch list or not
  const isInWatchList = useSelector((state) => selectIsInWatchList(state, id));

  // Fetching movie data with using React Query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movie", id], // Cache key
    queryFn: () => fetchMoviesByID(id), // Function to fetch the movie data
    enabled: !!id, // Enable the query only if there is a id
  });

  // Handler to mark the movie as watched
  function handleMarkAsWatched() {
    // Dispatching action to adding the movie to watched movies
    if (!isMovieWatched) {
      dispatch(addWatchedMovies(data));
      // If the movie is in watch list, remove the movie from the watch list too.
      if (isInWatchList) {
        dispatch(removeWatchList(id));
      }
    }
  }

  // Handler to remove the movie from watched list
  function handleRemoveWatchedList() {
    // Dispatching action to removing the movie from watched movies
    if (isMovieWatched) {
      dispatch(removeWatchedMovies(id));
      // If the movie is liked, remove the movie from the liked movies too.
      if (isMovieLiked) {
        dispatch(removeLikedMovies(id));
      }
    }
  }

  // Handler to mark the movie as liked
  function handleMarkAsLiked() {
    if (!isMovieLiked) {
      dispatch(addLikedMovies(data));
      // If the movie is not watched, add the movie to the watched movies too.
      if (!isMovieWatched) {
        dispatch(addWatchedMovies(data));
      }
    }
  }

  // Handler to remove the movie from liked list
  function handleRemoveLikedList() {
    if (isMovieLiked) {
      dispatch(removeLikedMovies(id));
    }
  }

  // Handler for adding movie to watch list
  function handleAddWatchList() {
    if (!isInWatchList) {
      dispatch(addWatchList(data));
    }
  }

  // Handler for removing movie from watch list
  function handleRemoveWatchList() {
    if (isInWatchList) {
      dispatch(removeWatchList(id));
    }
  }

  // Rendering error component if there is an error
  if (error) {
    return (
      <div className="errorAndLoaderContainer">
        <FetchingErrors message={error.message} retry={refetch} />
      </div>
    );
  }

  // Rendering Loader component if data is still loading
  if (isLoading) {
    return (
      <div className="errorAndLoaderContainer">
        <div className="flex flex-col items-center gap-4">
          <p className="text-2xl font-semibold text-gray-100 sm:text-3xl">
            Searching movies...
          </p>
          <Loader />
        </div>
      </div>
    );
  }

  // Rendering movie details if data has been fetched
  return (
    <div className="min-h-screen w-full bg-dark-gray">
      {data && (
        <div className="mx-auto flex max-w-4xl flex-col gap-5 p-4 md:max-w-4xl">
          {/* Title,year ... and Poster */}
          <div className="flex items-start justify-between">
            <div className="md:space-y-3">
              {/* Title */}
              <p className="pb-3 text-2xl font-bold text-gray-100 md:text-3xl">
                {data.Title}
              </p>
              {/* Year */}
              <p className="pb-1 text-sm text-soft-gray md:text-lg">
                <span className="font-bold text-gray-500">{data.Year}</span>{" "}
                Directed by
              </p>
              {/* Director */}
              <p className="pb-3 font-semibold text-gray-100 md:text-xl">
                {data.Director}
              </p>
              {/* Trailer button and runtime */}
              <p className="space-x-6 text-sm text-soft-gray md:text-[1rem]">
                <a
                  href={generateYouTubeLink(data.Title)}
                  className="rounded-lg bg-soft-gray px-2 py-1 font-bold text-gray-100"
                >
                  &#9658; Trailer
                </a>
                <span>{data.Runtime}</span>
              </p>
            </div>
            {/* Poster */}
            <img
              src={data.Poster}
              alt={data.Title}
              className="h-30 w-24 md:w-32"
            />
          </div>
          {/* Plot */}
          <div>
            <p className="text-soft-gray">{data.Plot}</p>
          </div>
          {/* Genres and buttons */}
          <div className="flex items-center justify-between gap-2">
            {/* Genres */}
            <div className="font-semibold text-gray-100 md:text-lg">
              {data.Genre}
            </div>
            {/* Buttons */}
            <div className="flex items-center gap-8">
              {/* Watched button */}
              <div>
                <button
                  onClick={
                    isMovieWatched
                      ? handleRemoveWatchedList
                      : handleMarkAsWatched
                  }
                  className="text-4xl"
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className={`${
                      isMovieWatched
                        ? "text-custom-green transition-all duration-200 hover:scale-110"
                        : "text-soft-gray transition-all duration-200 hover:scale-110"
                    }`}
                  />
                </button>
              </div>
              {/* Liked Button */}
              <div className="text-4xl">
                <button
                  onClick={
                    isMovieLiked ? handleRemoveLikedList : handleMarkAsLiked
                  }
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`${
                      isMovieLiked
                        ? "text-custom-orange transition-all duration-200 hover:scale-110"
                        : "text-soft-gray transition-all duration-200 hover:scale-110"
                    }`}
                  />
                </button>
              </div>
              {/* Watchlist button */}
              <div className="text-4xl">
                <button
                  onClick={
                    isInWatchList ? handleRemoveWatchList : handleAddWatchList
                  }
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className={`${
                      isInWatchList
                        ? "text-custom-blue transition-all duration-200 hover:scale-110"
                        : "text-soft-gray transition-all duration-200 hover:scale-110"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
          <hr className="thinLine" />
          {/* Table about movie informations */}
          <div>
            <div className="overflow-hidden rounded-lg border border-gray-400 bg-darker-gray text-center text-sm font-semibold text-soft-gray">
              <div className="flex">
                {/* Cast */}
                <div
                  className={`tableItems ${
                    activeItem === "cast"
                      ? "bg-soft-gray text-gray-100 font-extrabold"
                      : ""
                  }`}
                  onClick={() => handleActiveItemChange("cast")}
                >
                  Cast
                </div>
                {/* Details */}
                <div
                  className={`tableItems ${
                    activeItem === "details"
                      ? "bg-soft-gray text-gray-100 font-extrabold"
                      : ""
                  }`}
                  onClick={() => handleActiveItemChange("details")}
                >
                  Details
                </div>
                {/* Ratings */}
                <div
                  className={`tableItems ${
                    activeItem === "ratings"
                      ? "bg-soft-gray text-gray-100 font-extrabold"
                      : ""
                  }`}
                  onClick={() => handleActiveItemChange("ratings")}
                >
                  Ratings
                </div>
                {/* Releases */}
                <div
                  className={`tableItems ${
                    activeItem === "released"
                      ? "bg-soft-gray text-gray-100 font-extrabold"
                      : ""
                  }`}
                  onClick={() => handleActiveItemChange("released")}
                >
                  Released
                </div>
              </div>
            </div>
          </div>
          <div className="bg- w-full">
            {/* Showing Cast component if cast is active */}
            {activeItem === "cast" && <Cast data={data} />}
            {/* Showing Details component if details is active */}
            {activeItem === "details" && <Details data={data} />}
            {/* Showing Ratings component if ratings is active */}
            {activeItem === "ratings" && <Ratings data={data} />}
            {/* Showing Releases component if releases is active */}
            {activeItem === "released" && <Released data={data} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
