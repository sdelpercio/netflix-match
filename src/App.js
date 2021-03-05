import React from "react";
import { Switch, Route } from "react-router-dom";
// components
import Join from "./components/Join";
import Match from "./components/Match";

function App() {
  return (
    <>
      <div class="text-5xl md:text-8xl font-black flex justify-center">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-black">
          Netflix Match
        </span>
      </div>
      <Switch>
        <Route path="/match/:name/:room" component={Match} />
        <Route exact path="/" component={Join} />
        <Route path="*">
          <h1>Sorry, there's nothing here...</h1>
        </Route>
      </Switch>
    </>
  );
}

export default App;
