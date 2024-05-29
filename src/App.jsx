import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./Routes/routes";

//Importing pages
import Login from "./features/authentication/Login";
import Home from "./ui/Home";
import Search from "./features/search/Search";
import Movie from "./features/movie/Movie";
import WatchedMovies from "./features/watched-movies/WatchedMovies";
import LikedMovies from "./features/liked-movies/LikedMovies";
import WatchList from "./features/watchList/WatchList";
import SignUp from "./features/authentication/SignUp";
import AppLayout from "./ui/AppLayout";
import RoutingError from "./ui/RoutingError";

const router = createBrowserRouter([
  {
    path: routes.signUp,
    element: <SignUp />,
    errorElement: <RoutingError />,
  },
  {
    path: routes.login,
    element: <Login />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: routes.home,
        element: <Home />,
      },
      {
        path: routes.search,
        element: <Search />,
      },
      {
        path: routes.movie,
        element: <Movie />,
      },
      {
        path: routes.watchedMovies,
        element: <WatchedMovies />,
      },
      {
        path: routes.likedMovies,
        element: <LikedMovies />,
      },
      {
        path: routes.watchList,
        element: <WatchList />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
