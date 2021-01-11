import React from "react";
import { Switch, Route, Link } from "react-router-dom";
// components
import EnterCode from "./components/EnterCode";
import Match from "./components/Match";

function App() {
  return (
    <Switch>
      <Route path="/create-code">
        <div>
          <h1>Your code is: "somecodehere"</h1>
          <p>
            Tell your friend to enter this code on their device to start
            matching!
          </p>
        </div>
      </Route>
      <Route path="/enter-code">
        <EnterCode />
      </Route>
      <Route path="/match">
        <Match />
      </Route>
      <Route exact path="/">
        <Link to="/create-code">
          <button>Start Matching!</button>
        </Link>
        <Link to="/enter-code">
          <button>Enter A Code</button>
        </Link>
      </Route>
      <Route path="*">
        <h1>Sorry, there's nothing here...</h1>
      </Route>
    </Switch>
  );
}

export default App;
