import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import io from "socket.io-client";
// components
import MatchGenres from "./MatchGenres";
import MatchMovies from "./MatchMovies";

let socket;

const Match = () => {
  const slug = useParams();
  const match = useRouteMatch();
  const rapidApiKey = process.env.REACT_APP_API_KEY;
  const socketEndPoint = "localhost:5000";
  let history = useHistory();

  // STATE
  const [genres, setGenres] = useState([]);
  const [userGenres, setUserGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [userMovies, setUserMovies] = useState([]);
  const [name, setName] = useState(slug.name);
  const [room, setroom] = useState(slug.room);

  //                           //
  //       SOCKET GENERAL      //
  //                           //
  // Join/Leave Room
  useEffect(() => {
    socket = io(socketEndPoint);

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("endConnection", room);

      socket.close();
    };
  }, [socketEndPoint, name, room]);

  // Other Users Joining Room
  useEffect(() => {
    socket.on("message", (message) => {
      alert(message.text);
    });
  }, []);

  //                           //
  // GENRE FUNCTIONS & SOCKETS //
  //                           //
  // Toggle Genres
  const toggleGenre = (e, id) => {
    if (e.target.style.backgroundColor === "white") {
      e.target.style.backgroundColor = "black";
    } else {
      e.target.style.backgroundColor = "white";
    }
    if (e.target.style.color === "black") {
      e.target.style.color = "white";
    } else {
      e.target.style.color = "black";
    }

    const genreIndex = userGenres.indexOf(id);
    if (genreIndex === -1) {
      setUserGenres([...userGenres, id]);
    } else {
      setUserGenres((prevState) =>
        prevState.filter((prev_id) => id !== prev_id)
      );
    }
    socket.emit("updateGenres", id);
  };

  // Submit Genres
  const submitGenres = (e) => {
    e.preventDefault();
    console.log("submitted genres");
    socket.emit("getGenres");
  };

  // Receive Genres After Submission
  useEffect(() => {
    socket.on("receiveGenres", (receivedGenres) => {
      console.log("received genres:", receivedGenres);
      setUserGenres(receivedGenres);
      history.push(`${match.path}/movies`);
    });
  }, [history, match.path]);

  //                           //
  // MOVIE FUNCTIONS & SOCKETS //
  //                           //
  // Toggle Movies
  const toggleMovies = (e, id) => {
    if (e.target.style.backgroundColor === "white") {
      e.target.style.backgroundColor = "black";
    } else {
      e.target.style.backgroundColor = "white";
    }
    if (e.target.style.color === "black") {
      e.target.style.color = "white";
    } else {
      e.target.style.color = "black";
    }

    const movieIndex = userMovies.indexOf(id);
    if (movieIndex === -1) {
      setUserMovies([...userMovies, id]);
    } else {
      setUserMovies((prevState) =>
        prevState.filter((prev_id) => id !== prev_id)
      );
    }
    socket.emit("updateMovies", id);
  };
  // Submit Movies

  return (
    <Switch>
      <Route path={`${match.path}/movies`}>
        <MatchMovies
          movies={movies}
          setMovies={setMovies}
          toggleMovies={toggleMovies}
          userMovies={userMovies}
          userGenres={userGenres}
          rapidApiKey={rapidApiKey}
        />
      </Route>
      <Route path={`${match.path}/genres`}>
        <MatchGenres
          genres={genres}
          setGenres={setGenres}
          toggleGenre={toggleGenre}
          submitGenres={submitGenres}
          rapidApiKey={rapidApiKey}
        />
      </Route>
    </Switch>
  );
};
export default Match;
