import { useSelector } from "react-redux";

//Importing EmptyLikedMovies component to show  there is no liked movies
import EmptyLikedMovies from "./EmptyLikedMovies";

//Importing ListItems component to show liked movies
import ListItems from "../search/ListItems";

const LikedMovies = () => {
  //Selecting liked movies array from Redux
  const likedMovies = useSelector((state) => state.likedMovies.likedMovies);

  // Showing EmptyLikedMovies component if there is no liked movies
  if (likedMovies.length === 0) {
    return (
      <div className="emptyPageContainer">
        <EmptyLikedMovies />
      </div>
    );
  }

  //Showing liked movies
  return (
    <div className="listContainer">
      <ul className="listStyle">
        {likedMovies.map((item) => (
          <li key={item.imdbID}>
            <ListItems item={item} />
            <hr className="thinLine"></hr>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikedMovies;
