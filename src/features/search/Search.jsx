import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//Importing function for fetching movies
import { fetchMovies } from "../../services/apiMovies";

//Importing Error component to show fetching errors
import FetchingErrors from "../../ui/FethchingErrors";

//Importing Loader component to show users that data is still loading
import Loader from "../../ui/Loader";

//Importing ListItems component to show searched movies
import ListItems from "./ListItems";
import EmptySearch from "./EmptySearch";

// Fake movies data
/* const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
]; */

const Search = () => {
  // Getting the current location from React Router
  const location = useLocation();

  // Extracting the search query from the URL
  const query = new URLSearchParams(location.search).get("query");

  // Fetching movies data with using React Query
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["movies", query], // Cache key for the query
    queryFn: () => fetchMovies(query), // Function to fetch the movies
    enabled: !!query, // Enable the query only if there is a search query
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

  // Rendering search results if data has been fetched
  if (data) {
    return (
      <div className="listContainer">
        <ul className="listStyle">
          {data.map((item) => (
            <li key={item.imdbID} className="w-full">
              <ListItems item={item} />
              <hr className="thinLine"></hr>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-gray">
        <EmptySearch />
      </div>
    );
  }
};

export default Search;
