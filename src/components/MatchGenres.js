import React, { useEffect } from "react";
import axios from "axios";

const MatchGenres = ({
  genres,
  rapidApiKey,
  setGenres,
  userGenres,
  toggleGenre,
  submitGenres,
}) => {
  // Get Genres from Netflix API
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://unogsng.p.rapidapi.com/genres",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "unogsng.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((res) => {
        setGenres([]);
        res.data.results.map((item) =>
          setGenres((prevState) => [
            ...prevState,
            {
              genre: item.genre,
              netflixid: item.netflixid,
              selected: false,
            },
          ])
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Choose your Genres</h1>
      {genres.length === 0 ? (
        <div className="bg-black h-16 w-16 animate-pulse"></div>
      ) : (
        genres.map((item) => (
          <button
            key={item.netflixid}
            style={{ backgroundColor: "white", color: "black" }}
            onClick={(e) => toggleGenre(e, item.netflixid)}
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
