import React from "react";
import { Switch, Route } from "react-router-dom";
// components
import Join from "./components/Join";
import Match from "./components/Match";

function App() {
  return (
    <Switch>
      <Route path="/match/:name/:room" component={Match} />
      <Route exact path="/" component={Join} />
      <Route path="*">
        <h1>Sorry, there's nothing here...</h1>
      </Route>
    </Switch>
  );
}

export default App;
