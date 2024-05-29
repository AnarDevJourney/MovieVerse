import { useState } from "react";
import { useNavigate } from "react-router-dom";

//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const SearchMovies = () => {
  const [query, setQuery] = useState("");
  function handleSearchChange(e) {
    setQuery(e.target.value);
  }

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Checkng if the search query is not empty or just whitespace
    if (query.trim()) {
      // navigating to the search page with query parametr
      navigate(`/search?query=${query}`);
    }
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-5">
      <input
        type="text"
        placeholder="Search movie"
        onChange={handleSearchChange}
        value={query}
        className="rounded-xl bg-soft-gray px-2 py-1 transition-all duration-200 placeholder:text-sm placeholder:text-gray-100 placeholder:opacity-70 focus:scale-105 focus:bg-white focus:text-soft-gray focus:outline-none focus:ring focus:ring-soft-gray focus:ring-opacity-50"
      />
      <button type="submit">
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="text-xl text-soft-gray transition-all duration-200 hover:scale-125 hover:text-custom-green"
        />
      </button>
    </form>
  );
};

export default SearchMovies;
