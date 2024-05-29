import { useSelector } from "react-redux";

//Importing EmptyWatchList component to show there is no movie in watch list
import EmptyWatchList from "./EmptyWatchList";

//Importing ListItems component to show movies in watch list
import ListItems from "../search/ListItems";

const WatchList = () => {
  //Selecting watch list array from Redux
  const watchList = useSelector((state) => state.watchList.watchList);

  //Showing EmptyWatchList component if there is no movie in watch list
  if (watchList.length === 0) {
    return (
      <div className="emptyPageContainer">
        <EmptyWatchList />
      </div>
    );
  }

  //Showing movies in watch list
  return (
    <div className="listContainer">
      <ul className="listStyle">
        {watchList.map((item) => (
          <li key={item.imdbID}>
            <ListItems item={item} />
            <hr className="thinLine"></hr>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
