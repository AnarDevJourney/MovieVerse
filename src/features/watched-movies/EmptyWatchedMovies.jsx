//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const EmptyWatchedMovies = () => {
  return (
    <div className="emptyPage">
      <FontAwesomeIcon icon={faFaceSadTear} className="emptyPageIcon" />
      <p className="emptyPageText">Watched movies list is empty.</p>
      <p>Start add some movies that you watched</p>
    </div>
  );
};

export default EmptyWatchedMovies;
