import React, { useEffect } from "react";
import axios from "axios";
// components
import Card from "./Card.js";

const MatchMovies = ({
  movies,
  setMovies,
  toggleMovies,
  submitMovies,
  userGenres,
  rapidApiKey,
}) => {
  // Get Movies from Netflix API
  useEffect(() => {
    const genresString = userGenres.join("|");

    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/discover/movie`,
      params: {
        api_key: rapidApiKey,
        language: "en-US",
        sort_by: "popularity.desc",
        include_adult: "false",
        include_video: "false",
        page: "1",
        watch_region: "US",
        with_watch_providers: "8",
        with_genres: genresString,
      },
    };

    axios
      .request(options)
      .then((res) => {
        setMovies([]);
        const shuffledArray = res.data.results;
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
          ];
        }
        setMovies(shuffledArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [rapidApiKey, setMovies, userGenres]);

  return (
    <div>
      <h1>Choose your Movies</h1>
      {movies.length === 0 ? (
        <div className="bg-black h-16 w-16 animate-pulse"></div>
      ) : (
        movies.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            poster_path={item.poster_path}
            overview={item.overview}
            release_date={item.release_date}
            original_language={item.original_language}
            vote_average={item.vote_average}
            id={item.id}
            toggleMovies={toggleMovies}
          />
          // <div key={item.id}>
          //   <h1>{item.title}</h1>
          //   <img
          //     src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
          //     alt="movie poster"
          //     style={{ border: "2px solid black" }}
          //     onClick={(e) => toggleMovies(e, item.id)}
          //   />
          //   <p>{item.overview}</p>
          //   <div>
          //     <p>Released: {item.release_date}</p>
          //     <p>Language: {item.original_language}</p>
          //     <p>Rating: {item.vote_average}</p>
          //   </div>
          // </div>
        ))
      )}
      <button onClick={(e) => submitMovies(e)}>Continue</button>
    </div>
  );
};
export default MatchMovies;
