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
import { Forms } from "./components/Forms";
import { PetsProvider } from "./contexts/petsContext";

export default function App() {
  return (
    <PetsProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/v1/pets">
              <Pets />
            </Route>
            <Route exact path="/v1/petDetails/:id">
              <PetDetails />
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
    </PetsProvider>
  );
}
