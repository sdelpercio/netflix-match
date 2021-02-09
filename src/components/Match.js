import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";
// components
import MatchGenres from "./MatchGenres";
import MatchMovies from "./MatchMovies";

let socket;

const Match = () => {
  const slug = useParams();
  const match = useRouteMatch();
  const rapidApiKey = process.env.REACT_APP_RAPID_API_KEY;
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

      socket.off();
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
  // Get Genres from Netflix API
  // *** Move into MatchGenres.js
  useEffect(() => {
    if (genres === []) {
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
          setGenres([]);
          res.data.results.map((item) =>
            setGenres((prevState) => [
              ...prevState,
              {
                genre: item.genre,
                netflixid: item.netflixid,
                selected: false,
              },
            ])
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [rapidApiKey, genres]);

  // Update Genres
  const toggleGenre = (netflixid) => {
    const genreIndex = userGenres.indexOf(netflixid);

    if (genreIndex === -1) {
      setUserGenres([...userGenres, netflixid]);
    } else {
      setUserGenres((prevState) => prevState.filter((id) => id !== netflixid));
    }

    socket.emit("updateGenres", netflixid);
  };

  // Submit Genres
  const submitGenres = (e) => {
    e.preventDefault();
    socket.emit("getGenres");
  };

  // Receive Genres After Submission
  useEffect(() => {
    socket.on("receiveGenres", (receivedGenres) => {
      setUserGenres(receivedGenres);
      history.push(`${match.path}/movies`);
    });
  }, [history, match.path]);

  //                           //
  // MOVIE FUNCTIONS & SOCKETS //
  //                           //
  // Get Movies from Netflix API
  // *** Move into MatchMovies.js
  useEffect(() => {
    if (movies === []) {
      const genresString = userGenres.join(", ");

      const options = {
        method: "GET",
        url: "https://unogsng.p.rapidapi.com/search",
        params: {
          genrelist: genresString,
          start_year: "1972",
          orderby: "rating",
          audiosubtitle_andor: "and",
          limit: "100",
          subtitle: "english",
          countrylist: "78,46",
          audio: "english",
          country_andorunique: "unique",
          offset: "0",
          end_year: "2019",
        },
        headers: {
          "x-rapidapi-key": rapidApiKey,
          "x-rapidapi-host": "unogsng.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }, [rapidApiKey, userGenres, movies]);

  return (
    <Switch>
      <Route path={`${match.path}/movies`}>
        <MatchMovies />
      </Route>
      <Route path={`${match.path}/genres`}>
        <MatchGenres
          genres={genres}
          userGenres={userGenres}
          toggleGenre={toggleGenre}
          submitGenres={submitGenres}
        />
      </Route>
    </Switch>
  );
};
export default Match;
