import { useNavigate } from "react-router-dom";

const PopularMovies = ({ movie }) => {
  const navigate = useNavigate();

  function handleClick() {
    // Navigating to movie page for show clicked movie's details
    navigate(`/movie/${movie.imdb_id}`);
  }

  return (
    <div className="flex-none" onClick={handleClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt={movie.title}
        className="h-48 w-32 transition-all duration-200 hover:scale-105"
      />
    </div>
  );
};

export default PopularMovies;
