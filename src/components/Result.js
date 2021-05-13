import React, { useEffect, useState } from "react";
import axios from "axios";

const Result = ({ userMovies, rapidApiKey }) => {
  const [products, setProducts] = useState([]);

  // Retrieving Matched Movie Details
  useEffect(() => {
    if (userMovies.length !== 0) {
      const promises = userMovies.map((id) => {
        return axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${rapidApiKey}&language=en-US`
        );
      });
      Promise.all(promises)
        .then((res) => setProducts(res))
        .catch((err) => console.log(err));
    }
  }, [rapidApiKey, userMovies]);

  if (userMovies.length === 0) {
    return (
      <div className="m-auto mt-20 w-80 md:w-1/2">
        <h1>No matches :(</h1>
      </div>
    );
  } else {
    return (
      <div className="m-auto mt-20 w-80 md:w-1/2">
        <h1>Here are your matches!</h1>
        {products &&
          products.map((item) => (
            <div key={item.data.id}>
              <h1>{item.data.title}</h1>
              <img
                src={`https://image.tmdb.org/t/p/w300/${item.data.poster_path}`}
                alt="movie poster"
              />
              <p>{item.data.overview}</p>
              <div>
                <p>Released: {item.data.release_date}</p>
                <p>Language: {item.data.original_language}</p>
                <p>Rating: {item.data.vote_average}</p>
              </div>
            </div>
          ))}
      </div>
    );
  }
};

export default Result;
