import React from "react";
import { Switch, Route } from "react-router-dom";
import "../styles/app.css";
import AddProperty from "./AddProperty";
import NavBar from "./NavBar";
import Properties from "./Properties";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <h2>Surreal Estate</h2>
      <Switch>
        <Route path="/properties">
          <Properties />
        </Route>
        <Route path="/add-property">
          <AddProperty />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
