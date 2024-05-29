//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const EmptySearch = () => {
  return (
    <div className="emptyPage">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="emptyPageIcon" />
      <p className="emptyPageText mt-2 max-w-sm">
        Start searching by typing the movie you want into the search bar.
      </p>
    </div>
  );
};

export default EmptySearch;
