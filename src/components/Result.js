import React, { useEffect } from "react";

const Result = ({ userMovies, rapidApiKey }) => {
  let products = [];

  useEffect(() => {
    if (userMovies.length !== 0) {
      let requests = userMovies.map((id) => {
        return new Promise((resolve, reject) => {
          new Request(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${rapidApiKey}&language=en-US`,
            { method: "GET" }
          );
        });
      });
      Promise.all(requests)
        .then((body) => {
          body.forEach((res) => {
            if (res) {
              products.push(JSON.parse(res));
            }
          });
          console.log("results from promise.all", products);
        })
        .catch((err) => console.log(err));
    }
  }, [rapidApiKey, userMovies]);

  if (userMovies.length === 0) {
    return (
      <div className="m-auto mt-20 w-80 md:w-1/2">
        <h1>No matches :(</h1>
      </div>
    );
  } else if (products.length === 0) {
    return <div className="bg-black h-16 w-16 animate-pulse"></div>;
  } else {
    return (
      <div className="m-auto mt-20 w-80 md:w-1/2">
        <h1>Here are your matches!</h1>
        {products.map((item) => (
          <div key={item.id}>
            <h1>{item.title}</h1>
            <img
              src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
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
      </div>
    );
  }
};

export default Result;
