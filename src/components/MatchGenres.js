import React from "react";

const MatchGenres = ({ genres, userGenres, toggleGenre, submitGenres }) => {
  return (
    <div>
      <h1>Choose your Genres</h1>
      {genres.length === 0 ? (
        <div className="bg-black h-16 w-16 animate-pulse"></div>
      ) : (
        genres.map((item) => (
          <button
            key={item.netflixid}
            className={
              userGenres.includes(item.netflixid)
                ? "bg-black text-white rounded-full"
                : "bg-white text-gray-600 rounded-full"
            }
            onClick={(e) => toggleGenre(item.netflixid)}
          >
            {item.genre}
          </button>
        ))
      )}
      <button onClick={(e) => submitGenres(e)}>Continue</button>
    </div>
  );
};
export default MatchGenres;
