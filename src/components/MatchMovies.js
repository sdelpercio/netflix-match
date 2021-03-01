import React, { useEffect } from "react";
import axios from "axios";

const MatchMovies = ({
  movies,
  setMovies,
  userMovies,
  toggleMovies,
  submitMovies,
  userGenres,
  rapidApiKey,
}) => {
  // Get Movies from Netflix API
  useEffect(() => {
    const genresString = userGenres.join(", ");

    const options = {
      method: "GET",
      url: "https://unogsng.p.rapidapi.com/search",
      params: {
        genrelist: genresString,
        start_year: "1972",
        orderby: "rating",
        audiosubtitle_andor: "and",
        limit: "100",
        subtitle: "english",
        countrylist: "46",
        audio: "english",
        country_andorunique: "unique",
        offset: "0",
        end_year: "2019",
      },
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": "unogsng.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((res) => {
        setMovies([]);
        res.data.results.map((item) =>
          setMovies((prevState) => [
            ...prevState,
            {
              id: item.id,
              netflixid: item.nfid,
              avgRating: item.avgrating,
              imdbRating: item.imdbrating,
              imgSrc: item.poster,
              runtime: item.runtime,
              synopsis: item.synopsis,
              title: item.title,
              yearReleased: item.year,
              type: item.vtype,
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
      {movies.length === 0 ? (
        <div className="bg-black h-16 w-16 animate-pulse"></div>
      ) : (
        movies.map((item) => (
          <button
            key={item.netflixid}
            style={{ backgroundColor: "white", color: "black" }}
            onClick={(e) => toggleMovies(e, item.netflixid)}
          >
            {item.genre}
          </button>
        ))
      )}
      <button onClick={(e) => submitMovies(e)}>Continue</button>
    </div>
  );
};
export default MatchMovies;
