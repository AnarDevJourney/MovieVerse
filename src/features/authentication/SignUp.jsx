import { useEffect, useState } from "react";
import { validateUsername } from "./validations";
import { validateEmail } from "./validations";
import { validatePassword } from "./validations";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../Routes/routes";
import Loader from "../../ui/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { removeAllWatchedMovies } from "../watched-movies/watchedMoviesSlice";
import { removeAllLikedMovies } from "../liked-movies/likedMoviesSlice";
import { removeAllMoviesFromWatchList } from "../watchList/watchListSlice";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData && userData.isLoggedIn) {
      navigate(routes.home);
    }
  }, [navigate]);

  function handleUsernameChange(e) {
    setUsername(e.target.value);
    if (usernameError) {
      setUsernameError(""); // Clear the username error
    }
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError(""); // Clear the email error
    }
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (passwordError) {
      setPasswordError(""); // Clear the password error
    }
  }
  // Function to toggle password visibility
  function handleShowingPassword() {
    setShowPassword(!showPassword);
  }
  function handleSubmit(e) {
    e.preventDefault();

    // Validation checks
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isUsernameValid) {
      setUsernameError(
        "Username can only consist of letters, numbers, underscores, and dashes\n Also the length must be between 3 and 16 characters."
      );
      return;
    }

    if (!isEmailValid) {
      setEmailError("Email is not valid");
      return;
    }

    if (!isPasswordValid) {
      setPasswordError(
        "The password must contain at least 8 characters\n and you must use at least one uppercase,one lowercase and one number"
      );
      return;
    }

    // All inputs are valid
    setSuccesMessage("Account created successfully");

    // Saving user data to localStorage
    const userData = {
      username: username,
      email: email,
      password: password,
      isLoggedIn: false, // Mark user as not logged in
    };
    localStorage.setItem("userData", JSON.stringify(userData));

    //Clearing all saved movies from previous account
    localStorage.removeItem("watchList");
    localStorage.removeItem("likedMovies");
    localStorage.removeItem("watchedMovies");

    dispatch(removeAllWatchedMovies());
    dispatch(removeAllLikedMovies());
    dispatch(removeAllMoviesFromWatchList());

    // Clearing all previous error messages
    setUsernameError("");
    setEmailError("");
    setPasswordError("");

    // Redirecting to the login page
    // Adding little bit delay before redirecting to the login page becuase of succes message
    setTimeout(() => {
      navigate(routes.login);
    }, 2000);
  }

  return (
    <div className="flex h-[100svh] items-center justify-center bg-darker-gray">
      <Link>
        <h1 className="absolute left-4 top-4 text-2xl font-extrabold tracking-wider text-gray-100 md:text-3xl">
          MovieVerse
        </h1>
      </Link>

      {succesMessage ? (
        <div className="space-y-2 text-center">
          <p className="text-2xl font-semibold text-gray-100 sm:text-3xl">
            {succesMessage}
          </p>
          <div className="flex flex-col items-center justify-center gap-6">
            <span className="text-lg text-gray-400">
              Redirecting to Login page ...
            </span>
            <Loader />
          </div>
        </div>
      ) : (
        <div className="max-h-full max-w-3xl rounded-2xl bg-dark-gray px-10 py-6 text-gray-100 shadow-2xl sm:px-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="inputContainer">
              <label className="label">Username</label>
              {usernameError && (
                <div className="signUpError">
                  <p className="text-sm">{usernameError}</p>
                </div>
              )}
              <input
                type="text"
                required
                onChange={handleUsernameChange}
                value={username}
                className="input"
              />
            </div>

            {/* Email */}
            <div className="inputContainer">
              <label className="label">Email</label>
              {emailError && (
                <div className="signUpError">
                  <p className="text-sm">{emailError}</p>
                </div>
              )}
              <input
                type="text"
                required
                onChange={handleEmailChange}
                value={email}
                className="input"
              />
            </div>

            {/* Password */}
            <div className="inputContainer relative">
              <label className="label">Password</label>
              {passwordError && (
                <div className="signUpError">
                  <p className="text-sm">{passwordError}</p>
                </div>
              )}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggling input type based on showPassword state
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  className="input"
                />
                <button
                  type="button"
                  onClick={handleShowingPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-lg text-custom-green transition-all duration-300 hover:scale-125"
                  />
                </button>
              </div>
            </div>
            <div className="mt-3 text-center">
              <button type="submit" className="submitButton">
                Sign Up
              </button>
            </div>
          </form>
          <hr className="mt-4 border-t border-gray-600"></hr>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              {
                <Link
                  to={routes.login}
                  className="font-bold text-custom-green transition-all duration-300 hover:opacity-50"
                >
                  Login
                </Link>
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
