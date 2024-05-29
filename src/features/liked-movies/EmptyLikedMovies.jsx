//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const EmptyLikedMovies = () => {
  return (
    <div className="emptyPage">
      <FontAwesomeIcon icon={faFaceSadTear} className="emptyPageIcon" />
      <p className="emptyPageText">Liked movies list is empty.</p>
      <p>Start add some movies that you like</p>
    </div>
  );
};

export default EmptyLikedMovies;
