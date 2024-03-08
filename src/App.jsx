import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login/Login";
import Rescues from "./components/rescues/Rescues";
import Users from "./components/users/Users";
import Favorites from "./components/Favorites";
import RescueDetails from "./components/rescues/RescueDetails";
import Veterinarians from "./components/veterinarians/Veterinarians";
import Fosters from "./components/fosters/Fosters";
import Adopters from "./components/adopters/Adopters";
import { FavoritesProvider } from "./contexts/favoritesContext";
import {
  adoptersEndpoint,
  favoritesEndpoint,
  fostersEndpoint,
  rescueDetailsEndpoint,
  rescuesEndpoint,
  usersEndpoint,
  veterinariansEndpoint,
} from "./server/apiService/apiConfig";

export default function App() {
  return (
    <FavoritesProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path={rescuesEndpoint}>
              <Rescues />
            </Route>
            <Route exact path={rescueDetailsEndpoint}>
              <RescueDetails />
            </Route>
            <Route exact path={usersEndpoint}>
              <Users />
            </Route>
            <Route exact path={favoritesEndpoint}>
              <Favorites />
            </Route>
            <Route exact path={veterinariansEndpoint}>
              <Veterinarians />
            </Route>
            <Route exact path={fostersEndpoint}>
              <Fosters />
            </Route>
            <Route exact path={adoptersEndpoint}>
              <Adopters />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </Router>
      </div>
    </FavoritesProvider>
  );
}
