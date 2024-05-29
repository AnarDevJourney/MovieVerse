const Cast = ({ data }) => {
  // Converting actors string into array
  const actorsArray = data.Actors.split(", ").map((actor) => ({
    actor: actor,
  }));
  return (
    <ul>
      {actorsArray.map((actor) => (
        <li key={actor.actor}>
          <p className="text-lg font-extrabold text-gray-100">{actor.actor}</p>
          <hr className="mb-5 border-t border-gray-700" />
        </li>
      ))}
    </ul>
  );
};

export default Cast;
