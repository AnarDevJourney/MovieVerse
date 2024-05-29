import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { routes } from "../Routes/routes";

//Importing Search bar
import SearchMovies from "../features/search/SearchMovies";

//Importing font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faHeart,
  faClock,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  //State to controll dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const location = useLocation();

  // Closing menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 z-10 flex w-full items-center justify-between border-b-gray-800 bg-darker-gray bg-fixed px-6 py-6">
      {/* Big screen menu */}
      <div className="flex w-full items-center justify-between lg:w-auto">
        {/* Logo */}
        <Link to={routes.home}>
          <h1 className="text-xl font-extrabold tracking-wider text-gray-100 md:text-3xl">
            MovieVerse
          </h1>
        </Link>
        {/* Dropdown menu button (hidden in the big screens) */}
        <button
          className="text-2xl text-soft-gray lg:hidden"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
        </button>
      </div>
      {/* Search Bar */}
      <div className="hidden lg:block">
        <SearchMovies />
      </div>
      {/* Nav items (watched , liked , watch-list) */}
      <div className="hidden text-soft-gray lg:flex lg:items-center lg:gap-10">
        {/*  Watched */}
        <Link
          to={routes.watchedMovies}
          className="navItems hover:text-custom-green"
        >
          <FontAwesomeIcon icon={faEye} />
          <p>Watched</p>
        </Link>
        {/* Liked */}
        <Link
          to={routes.likedMovies}
          className="navItems hover:text-custom-orange"
        >
          <FontAwesomeIcon icon={faHeart} />
          <p>Liked</p>
        </Link>
        {/* Watch List */}
        <Link to={routes.watchList} className="navItems hover:text-custom-blue">
          <FontAwesomeIcon icon={faClock} />
          <p>Watch-List</p>
        </Link>
      </div>
      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-16 flex flex-col items-center gap-6 border-t border-gray-800 bg-darker-gray py-4 text-soft-gray lg:hidden">
          {/* Search bar */}
          <SearchMovies />
          {/* Watched */}
          <Link
            to={routes.watchedMovies}
            className="navItemsSmallScren hover:text-custom-green"
          >
            <FontAwesomeIcon icon={faEye} />
            <p>Watched</p>
          </Link>
          {/* Liked */}
          <Link
            to={routes.likedMovies}
            className="navItemsSmallScren hover:text-custom-orange"
          >
            <FontAwesomeIcon icon={faHeart} />
            <p>Liked</p>
          </Link>
          {/* Watch-list */}
          <Link
            to={routes.watchList}
            className="navItemsSmallScren hover:text-custom-blue"
          >
            <FontAwesomeIcon icon={faClock} />
            <p>Watch-List</p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
