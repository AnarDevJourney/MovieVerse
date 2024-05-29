import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../Routes/routes";
import Loader from "../../ui/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const errorMessages = {
    matchingError: "Username or password is incorrect",
    userDataError: "No user found. Please sign up.",
  };
  const [succesMessage, setSuccesMessage] = useState("");
  const navigate = useNavigate();
  function handleUsernameOrEmailChange(e) {
    setUsernameOrEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  // Function to toggle password visibility
  function handleShowingPassword() {
    setShowPassword(!showPassword);
  }
  function handleSubmit(e) {
    e.preventDefault();

    // Getting user data from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));

    // Checking if userData exist
    if (userData) {
      // Checking if username or email and password match
      if (
        (userData.username === usernameOrEmail ||
          userData.email === usernameOrEmail) &&
        userData.password === password
      ) {
        // Succes message
        setSuccesMessage("Login succesful");

        //Clearing previous error messages
        setErrorMessage("");

        // Redirect to home page
        // Adding little bit delay before redirecting to the home page becuase of succes message
        setTimeout(() => {
          navigate(routes.home);
        }, 2000);
      } else {
        // Error message if username or password is incorrect
        setErrorMessage(errorMessages.matchingError);
      }
    } else {
      // Error message if there is no user data
      setErrorMessage(errorMessages.userDataError);
    }
  }
  return (
    <div className="flex h-[100svh] items-center justify-center bg-darker-gray">
      <Link to={routes.home}>
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
              Redirecting to Home page...
            </span>
            <Loader />
          </div>
        </div>
      ) : (
        <div className="max-h-full max-w-3xl rounded-2xl bg-gray-800 px-10 py-8 text-gray-100 shadow-2xl sm:px-16">
          <h2 className="mb-6 text-center text-3xl font-bold">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="inputContainer">
              <label className="label">Username or Email</label>
              <input
                type="text"
                required
                onChange={handleUsernameOrEmailChange}
                value={usernameOrEmail}
                className="input"
              />
            </div>
            <div className="inputContainer">
              <label className="label">Password</label>
              <div className="flex w-full items-center gap-4">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={handlePasswordChange}
                  value={password}
                  className="input"
                />
                <button type="button" onClick={handleShowingPassword}>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="text-lg text-custom-green transition-all duration-300 hover:scale-125"
                  />
                </button>
              </div>
            </div>
            {errorMessage && (
              <div>
                {errorMessage === errorMessages.matchingError ? (
                  <div className="mt-3 rounded-xl bg-red-400 px-3 py-1 text-center">
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl bg-red-400 px-3 py-1 text-center">
                    <p className="text-sm text-gray-700">{errorMessage}</p>
                    <Link to={routes.signUp} className="underline">
                      Go to Sign Up page
                    </Link>
                  </div>
                )}
              </div>
            )}
            <div className="mt-3 text-center">
              <button type="submit" className="submitButton">
                Login
              </button>
            </div>
          </form>
          <hr className="mt-4 border-t border-gray-600"></hr>
          <div className="mt-4 text-center">
            <p>
              No account?{" "}
              {
                <Link
                  to={routes.signUp}
                  className="font-bold text-custom-green transition-all duration-300 hover:opacity-50"
                >
                  Create one
                </Link>
              }
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
