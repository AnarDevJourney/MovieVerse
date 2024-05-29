import { useSelector } from "react-redux";

//Importing EmptyWatchedMovies component to show there is no watched movie
import EmptyWatchedMovies from "./EmptyWatchedMovies";

//Importing ListItems component to show watched movies
import ListItems from "../search/ListItems";

const WatchedMovies = () => {
  //Selecting watched movies array from Redux
  const watchedMovies = useSelector(
    (state) => state.watchedMovies.watchedMovies
  );

  //Showing EmptyWatchedMovies component if there is no watched movies
  if (watchedMovies.length === 0) {
    return (
      <div className="emptyPageContainer">
        <EmptyWatchedMovies />
      </div>
    );
  }

  //Showing watched movies
  return (
    <div className="listContainer">
      <ul className="listStyle">
        {watchedMovies.map((item) => (
          <li key={item.imdbID}>
            <ListItems item={item} />
            <hr className="thinLine"></hr>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchedMovies;
