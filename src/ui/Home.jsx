import { useQuery } from "@tanstack/react-query";

import { routes } from "../Routes/routes";

//Importing function for fetching popular movies in this week
import { fetchPopularMovies } from "../services/apiMovies";

//Importing Error component to show fetching errors
import FetchingErrors from "./FethchingErrors";

//Importing Loader component to show users that data is still loading
import Loader from "./Loader";
import PopularMovies from "./PopularMovies";

//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faClock,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Home = () => {
  // Fetching popular movies in this week with using React Query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["popularMovies"],
    queryFn: fetchPopularMovies,
  });

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

  return (
    <div className="min-h-screen space-y-10 bg-dark-gray px-2 pb-6 pt-10 md:space-y-16 lg:pt-20">
      {/* Description */}
      <div className="flex flex-col items-center gap-4">
        <p className="max-w-sm text-center text-xl font-bold text-gray-100 sm:max-w-lg md:text-2xl lg:text-3xl">
          Track films you’ve watched.Mark the ones you like. Save those you want
          to see.
        </p>
        <button className="submitButton text-gray-100" type="button">
          <Link to={routes.search}>Get started</Link>
        </button>
      </div>
      {/* Weekly popular movies */}
      <div className="mx-auto max-w-4xl space-y-1 lg:space-y-2">
        <h1 className="text-xl font-bold text-gray-100 lg:hidden">
          Popular this week
        </h1>
        <div className="flex w-full items-center overflow-y-hidden overflow-x-scroll lg:overflow-x-hidden">
          <div className="flex flex-nowrap gap-4 lg:flex-wrap lg:items-center lg:justify-center">
            {data.length > 0 ? (
              data.slice(0, 12).map((movie) => (
                // Rendering each weekly popular movies
                <PopularMovies key={movie.id} movie={movie} />
              ))
            ) : (
              <p>No popular movies found.</p>
            )}
          </div>
        </div>
      </div>
      {/* Features */}
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
        {/* Watched and liked list */}
        <div className="space-y-2 md:space-y-4">
          {/* Watched */}
          <Link
            to={routes.watchedMovies}
            className="homeIconContainer transition-all duration-200 hover:bg-custom-green"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faEye} className="text-3xl" />
            <p>
              You can add the movies you watched to your watched movies list.
            </p>
          </Link>
          {/* Liked */}
          <Link
            to={routes.likedMovies}
            className="homeIconContainer transition-all duration-200 hover:bg-custom-orange"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faHeart} className="text-3xl" />
            <p>You can add the movies you liked to your liked movies list.</p>
          </Link>
        </div>
        {/* watch-list and searching */}
        <div className="space-y-2 md:space-y-4">
          {/* watch-list */}
          <Link
            to={routes.watchList}
            className="homeIconContainer transition-all duration-200 hover:bg-custom-blue"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faClock} className="text-3xl" />
            <p>You can add the movies you want to watch to your watch list.</p>
          </Link>
          {/* searchiing */}
          <Link
            to={routes.search}
            className="homeIconContainer transition-all duration-200 hover:bg-darker-gray"
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} className="text-3xl" />
            <p>
              You can search for the movie you want from the search section.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
