import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
// components
import Join from "./components/Join";
import Match from "./components/Match";
// media
import logo from "./media/tmdb-logo.svg";

function App() {
  let history = useHistory();

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <header className="text-5xl md:text-8xl font-black flex justify-center">
        <span
          onClick={(e) => {
            e.preventDefault();
            history.push("/");
          }}
          className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-black cursor-pointer"
        >
          Netflix Match
        </span>
      </header>
      <div className="flex-grow">
        <Switch>
          <Route path="/match/:name/:room" component={Match} />
          <Route exact path="/" component={Join} />
          <Route path="*">
            <h1>Sorry, there's nothing here...</h1>
          </Route>
        </Switch>
      </div>
      <footer className="flex flex-col justify-between items-center m-auto">
        <p className="text-xs text-center md:text-base w-4/5 md:w-full">
          This product uses the TMDb API but is not endorsed or certified by
          TMDb.
        </p>
        <img className="w-20 h-20" src={logo} alt="TMDb Logo" />
      </footer>
    </div>
  );
}

export default App;
