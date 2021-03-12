import React, { useEffect } from "react";
import axios from "axios";

const MatchGenres = ({
  genres,
  rapidApiKey,
  setGenres,
  toggleGenre,
  submitGenres,
}) => {
  // Get Genres from Netflix API
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/genre/movie/list?api_key=${rapidApiKey}&language=en-US`,
    };

    axios
      .request(options)
      .then((res) => {
        setGenres([]);
        console.log("genre response:", res);
        setGenres(res.data.genres);
        console.log("genres:", genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rapidApiKey, setGenres]);

  return (
    <div className="m-auto mt-20 w-80 md:w-1/2">
      <h1>Choose your Genres</h1>
      {genres.length === 0 ? (
        <div className="bg-black h-16 w-16 animate-pulse"></div>
      ) : (
        genres.map((item) => (
          <div
            key={item.id}
            style={{ backgroundColor: "white", color: "black" }}
            onClick={(e) => toggleGenre(e, item.id)}
          >
            {item.name}
          </div>
        ))
      )}
      <button onClick={(e) => submitGenres(e)}>Continue</button>
    </div>
  );
};
export default MatchGenres;
