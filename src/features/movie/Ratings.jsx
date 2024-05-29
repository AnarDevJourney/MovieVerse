const Ratings = ({ data }) => {
  const ratingsArray = data.Ratings;
  return (
    <ul>
      {ratingsArray.map((ratings) => (
        <li key={ratings.Value}>
          <p className="text-lg font-semibold text-soft-gray">
            <span className="text-xl font-bold text-gray-100">
              {ratings.Source}
            </span>{" "}
            - {ratings.Value}
          </p>
          <hr className="mb-5 border-t border-gray-700" />
        </li>
      ))}
    </ul>
  );
};

export default Ratings;
