import React, { useEffect } from "react";
import axios from "axios";

const MatchMovies = ({ movies, userGenres, rapidApiKey }) => {
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
        countrylist: "78,46",
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
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [rapidApiKey, userGenres, movies]);

  return (
    <div>
      <h1>movies</h1>
    </div>
  );
};
export default MatchMovies;
