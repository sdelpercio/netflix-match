import React, { useEffect } from "react";
import axios from "axios";
// components
import Stack from "./Stack";

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
        <Stack onVote={(item, vote) => console.log(item.props, vote)}>
          {movies.map((item) => (
            <div>
              <h1>{item.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                alt="movie poster"
              />
              <p>{item.overview}</p>
              <div>
                <p>Released: {item.release_date}</p>
                <p>Language: {item.original_language}</p>
                <p>Rating: {item.vote_average}</p>
              </div>
            </div>
          ))}
        </Stack>
      )}
      <button onClick={(e) => submitMovies(e)}>Continue</button>
    </div>
  );
};
export default MatchMovies;
