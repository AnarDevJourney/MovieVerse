const FetchingErrors = ({ message, retry }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold text-gray-100 sm:text-3xl">
        Something went wrong 🥲
      </h2>
      <p className="text-lg text-gray-400">{message}</p>
      {retry && (
        <button onClick={retry} className="submitButton">
          Retry
        </button>
      )}
    </div>
  );
};

export default FetchingErrors;
