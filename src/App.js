import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Pets } from "./components/Pets";
import { Users } from "./components/Users";
import { AddPet } from "./components/AddPet";
import { Favorites } from "./components/Favorites";
import { PetDetails } from "./components/PetDetails";
import { Vets } from "./components/Vets";
import { Fosters } from "./components/Fosters";
import { Canidates } from "./components/Canidates";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/pets">
            <Pets />
          </Route>
          <Route exact path="/petDetails/:id">
            <PetDetails />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/favorites">
            <Favorites />
          </Route>
          <Route exact path="/pet">
            <AddPet />
          </Route>
          <Route exact path="/vets">
            <Vets />
          </Route>
          <Route exact path="/fosters">
            <Fosters />
          </Route>
          <Route exact path="/canidates">
            <Canidates />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
