import React, { useEffect } from "react";

const Result = ({ userMovies, rapidApiKey }) => {
  useEffect(() => {
    if (userMovies.length !== 0) {
      const products = [];
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
  } else {
    return (
      <div className="m-auto mt-20 w-80 md:w-1/2">
        <h1>Here are your matches!</h1>
      </div>
    );
  }
};

export default Result;
