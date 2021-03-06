import React, { useState, useEffect } from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import io from "socket.io-client";
import swal from "@sweetalert/with-react";
// components
import MatchGenres from "./MatchGenres";
import MatchMovies from "./MatchMovies";
import Result from "./Result";

let socket;

const Match = () => {
  // UTILS
  const slug = useParams();
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
      swal({
        content: <div>{message.text}</div>,
        icon: "info",
        button: "OK!",
      });
    });
  }, []);

  //                           //
  // GENRE FUNCTIONS & SOCKETS //
  //                           //
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
      setUserGenres((prevState) => [...prevState, id]);
    } else {
      setUserGenres((prevState) =>
        prevState.filter((prev_id) => id !== prev_id)
      );
    }
    socket.emit("updateGenres", id);
  };

  const submitGenres = (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text:
        "Once you continue, the whole room will move forward with everyone's currently chosen genres.",
      icon: "warning",
      buttons: true,
    }).then((willContinue) => {
      if (willContinue) {
        socket.emit("getGenres");
      }
    });
  };
  // Receive Genres After Submission
  useEffect(() => {
    socket.on("receiveGenres", (receivedGenres) => {
      setUserGenres(receivedGenres);
      history.push(`/match/${slug.name}/${slug.room}/movies`);
    });
  }, [history, slug.name, slug.room]);

  //                           //
  // MOVIE FUNCTIONS & SOCKETS //
  //                           //
  const toggleMovies = (id, vote) => {
    if (vote === true) {
      // setUserMovies((prevState) => [...prevState, id]);
      console.log("added id:", id);
      socket.emit("addMovies", id);
    }
    // } else {
    //   setUserMovies((prevState) =>
    //     prevState.filter((prev_id) => id !== prev_id)
    //   );
    //   socket.emit("removeMovies", id);
    // }
  };
  const submitMovies = (e) => {
    e.preventDefault();

    swal({
      title: "Are you sure?",
      text:
        "Once you continue, matches will be found based on everyone's current selections.",
      icon: "warning",
      buttons: true,
    }).then((willContinue) => {
      if (willContinue) {
        socket.emit("getMovies");
      }
    });
  };
  // Receive Movies After Submission
  useEffect(() => {
    socket.on("receiveMovies", (receivedMovies) => {
      setUserMovies(receivedMovies);
      history.push(`/match/${slug.name}/${slug.room}/result`);
    });
  }, [history, slug.name, slug.room]);

  return (
    <Switch>
      <Route path={`/match/${slug.name}/${slug.room}/movies`}>
        <MatchMovies
          movies={movies}
          setMovies={setMovies}
          toggleMovies={toggleMovies}
          submitMovies={submitMovies}
          userGenres={userGenres}
          rapidApiKey={rapidApiKey}
        />
      </Route>
      <Route path={`/match/${slug.name}/${slug.room}/genres`}>
        <MatchGenres
          genres={genres}
          setGenres={setGenres}
          toggleGenre={toggleGenre}
          submitGenres={submitGenres}
          rapidApiKey={rapidApiKey}
        />
      </Route>
      <Route path={`/match/${slug.name}/${slug.room}/result`}>
        <Result userMovies={userMovies} rapidApiKey={rapidApiKey} />
      </Route>
    </Switch>
  );
};
export default Match;
