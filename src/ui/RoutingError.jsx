import { useNavigate } from "react-router-dom";
import { useRouteError } from "react-router-dom";

const RoutingError = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  function handleGoBack() {
    navigate(-1);
  }
  return (
    <div className="flex h-screen items-center justify-center bg-dark-gray">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-100 sm:text-3xl">
          Something went wrong 🥲
        </h1>
        {/* showing error message in the UI */}
        <p className="text-lg text-gray-400">{error.message || error.data}</p>
        <button onClick={handleGoBack} className="submitButton">
          &larr; Go back
        </button>
      </div>
    </div>
  );
};

export default RoutingError;
