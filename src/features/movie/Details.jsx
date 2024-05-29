const Details = ({ data }) => {
  return (
    <div className="space-y-6">
      {data.totalSeasons && (
        <div className="space-y-1">
          <p className="text-xl font-bold text-gray-100">Total Seasons</p>
          <p className="pb-4 text-soft-gray">{data.totalSeasons} seasons</p>
          <hr className="border-t border-gray-700" />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-xl font-bold text-gray-100">Country</p>
        <p className="text-soft-gray">{data.Country}</p>
      </div>
      <hr className="border-t border-gray-700" />
      <div className="space-y-1">
        <p className="text-xl font-bold text-gray-100">Language</p>
        <p className="text-soft-gray">{data.Language}</p>
      </div>
    </div>
  );
};

export default Details;
