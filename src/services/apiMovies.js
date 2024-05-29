const OMDB_API_KEY = "c8425e92";
const OMDB_API_URL = "https://www.omdbapi.com/";
const TMDB_API_KEY = "0431f9f62ca490f405122c714d0f1c9f";
const TMDB_API_URL = "https://api.themoviedb.org/3";

// Function to fetch movies based on search query from OMDB
export async function fetchMovies(query) {
  // Fetching movie data from the API using the search query
  const res = await fetch(`${OMDB_API_URL}?apikey=${OMDB_API_KEY}&s=${query}`);
  const data = await res.json();

  // Checking if the API response indicates an error
  if (data.Response === "False") {
    throw new Error(data.Error);
  }

  //searched movies
  const movies = data.Search;

  // Fetch full details for each movie
  const detailedMovies = await Promise.all(
    movies.map(async (movie) => {
      const res = await fetch(
        `${OMDB_API_URL}?i=${movie.imdbID}&apikey=${OMDB_API_KEY}`
      );
      const movieDetails = await res.json();
      return movieDetails;
    })
  );
  // Returning the array of detailed movie information
  return detailedMovies;
}

// Function to fetch movie details based on imdbID from OMDB
export async function fetchMoviesByID(id) {
  // Fetching movie details from the API using the imdbID
  const res = await fetch(`${OMDB_API_URL}?i=${id}&apikey=${OMDB_API_KEY}`);
  const data = await res.json();
  // Checking if the API response indicates an error
  if (data.Response === "False") {
    throw new Error(data.Error);
  }
  // Returning the detailed movie data
  return data;
}

// Function to fetch popular movies of the week from TMDB
export async function fetchPopularMovies() {
  try {
    // Fetch the list of popular movies of the week
    const res = await fetch(
      `${TMDB_API_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    const data = await res.json();
    const movies = data.results;

    // Creating an array of promises to fetch the detailed information for each movie
    const movieDetailsPromises = movies.map(async (movie) => {
      const movieDetailsRes = await fetch(
        `${TMDB_API_URL}/movie/${movie.id}?api_key=${TMDB_API_KEY}`
      );
      const movieDetailsData = await movieDetailsRes.json();
      return { ...movie, imdb_id: movieDetailsData.imdb_id }; // Merging the basic movie data with the detailed data (including imdb_id)
    });

    // Waiting for all promises to resolve and get the detailed movie data including imdb_id
    const moviesWithImdbId = await Promise.all(movieDetailsPromises);
    return moviesWithImdbId;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error; //Throwing error so React Query can handle it
  }
}
