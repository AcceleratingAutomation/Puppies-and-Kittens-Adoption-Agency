import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/login/Login";
import { Rescues } from "./components/rescues/Rescues";
import { Users } from "./components/Users";
import { AddPet } from "./components/AddPet";
import { Favorites } from "./components/Favorites";
import { RescueDetails } from "./components/rescues/RescueDetails";
import { Vets } from "./components/Vets";
import { Fosters } from "./components/Fosters";
import { Canidates } from "./components/Canidates";
import { Forms } from "./components/Forms";
import { RescuesProvider } from "./contexts/rescuesContext";

export default function App() {
  return (
    <RescuesProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/v1/rescues">
              <Rescues />
            </Route>
            <Route exact path="/v1/rescueDetails/:id">
              <RescueDetails />
            </Route>
            <Route exact path="/v1/users">
              <Users />
            </Route>
            <Route exact path="/v1/favorites">
              <Favorites />
            </Route>
            <Route exact path="/v1/pet">
              <AddPet />
            </Route>
            <Route exact path="/v1/vets">
              <Vets />
            </Route>
            <Route exact path="/v1/fosters">
              <Fosters />
            </Route>
            <Route exact path="/v1/forms">
              <Forms />
            </Route>
            <Route exact path="/v1/canidates">
              <Canidates />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </RescuesProvider>
  );
}
