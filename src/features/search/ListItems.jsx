import { useNavigate } from "react-router-dom";

const SearchItems = ({ item }) => {
  const navigate = useNavigate();

  function handleClickMovie() {
    // Navigating to movie page for show clicked movie's details
    navigate(`/movie/${item.imdbID}`);
  }
  return (
    <div className="flex items-start gap-4 text-left">
      {/* Poster */}

      <div className="flex-shrink-0">
        <img
          src={item.Poster}
          alt={item.Title}
          className=" h-30 w-32 object-cover transition-all duration-200 hover:scale-105"
          style={{ cursor: "pointer" }}
          onClick={handleClickMovie}
        />
      </div>

      <div className="space-y-2">
        <p className="text-soft-gray">
          {/* Title */}
          <span
            className="text-lg font-bold text-gray-100 transition-all duration-200 hover:text-custom-blue"
            style={{ cursor: "pointer" }}
            onClick={handleClickMovie}
          >
            {item.Title}{" "}
          </span>{" "}
          {/* Year */}
          {item.Year} directed by {/* Director */}
          <span className="font-bold">{item.Director}</span>{" "}
        </p>
        {/* Plot */}
        <p className="hidden text-sm text-soft-gray md:block">{item.Plot}</p>
        {/* Genre , runtime , imdb rating */}
        <p className="text-gray-100">{item.Genre}</p>
        <p className="text-gray-100">{item.Runtime}</p>
        <p className="text-gray-100">{item.imdbRating} ⭐</p>
      </div>
    </div>
  );
};

export default SearchItems;
