//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons";

const EmptyWatchList = () => {
  return (
    <div className="emptyPage">
      <FontAwesomeIcon icon={faFaceSadTear} className="emptyPageIcon" />
      <p className="emptyPageText">Watch-List is empty.</p>
      <p>Start add some movies that you want to watch</p>
    </div>
  );
};

export default EmptyWatchList;
