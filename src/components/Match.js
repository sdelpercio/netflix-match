import React, { useState, useEffect } from "react";
import axios from "axios";

const Match = () => {
  const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;

  const [genres, setGenres] = useState([]);

  // Getting Genres
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
        console.log(res.data);
        setGenres(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>Choose your Genres</h1>
      {genres.length === 0 ? (
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24" />
      ) : (
        genres.map((item) => {
          return <button key={item.netflixid}>{item.genre}</button>;
        })
      )}
    </div>
  );
};
export default Match;
