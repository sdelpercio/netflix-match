import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

let socket;

const Match = () => {
  const slug = useParams();
  const match = useRouteMatch();
  const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
  const socketEndPoint = "localhost:5000";

  const [genres, setGenres] = useState([]);
  const [userGenres, setUserGenres] = useState({});
  const [name, setName] = useState(slug.name);
  const [room, setroom] = useState(slug.room);

  // add/remove genres to search
  const toggleGenre = (netflixid) => {
    console.log(genres);
  };

  // Getting Genres
  // useEffect(() => {
  //   const options = {
  //     method: "GET",
  //     url: "https://unogsng.p.rapidapi.com/genres",
  //     headers: {
  //       "x-rapidapi-key": rapidApiKey,
  //       "x-rapidapi-host": "unogsng.p.rapidapi.com",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then((res) => {
  //       console.log(res.data);
  //       setGenres({});
  //       res.data.results.map((item) =>
  //         setGenres((prevState) => ({
  //           ...prevState,
  //           [item.netflixid]: {
  //             genre: item.genre,
  //             id: item.netflixid,
  //             selected: false,
  //           },
  //         }))
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [rapidApiKey]);

  useEffect(() => {
    socket = io(socketEndPoint);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [socketEndPoint, name, room]);

  return (
    <Switch>
      <Route path={`${match.path}/movies`}>
        <h1>movies</h1>
      </Route>
      <Route path={`${match.path}/genres`}>
        <div>
          <h1>Choose your Genres</h1>
          {genres === {} ? (
            <div className="bg-black h-16 w-16 animate-pulse"></div>
          ) : (
            Object.entries(genres).map(([key, value]) => (
              <button
                key={key}
                value={value}
                className={
                  value.selected
                    ? "bg-black text-white rounded-full"
                    : "bg-white text-gray-600 rounded-full"
                }
                onClick={(e) => toggleGenre(value.id)}
              >
                {value.genre}
              </button>
            ))
          )}
          <Link to={`${match.url}/movies`}>Continue</Link>
        </div>
      </Route>
    </Switch>
  );
};
export default Match;
