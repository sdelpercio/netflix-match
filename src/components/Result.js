import React from "react";

const Result = ({ userMovies }) => {
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
