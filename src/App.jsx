import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdopterDetails from "./components/adopters/AdopterDetails";
import Adopters from "./components/adopters/Adopters";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./contexts/favoritesContext";
import FosterDetails from "./components/fosters/FosterDetails";
import Fosters from "./components/fosters/Fosters";
import Login from "./components/login/Login";
import RescueDetails from "./components/rescues/RescueDetails";
import Rescues from "./components/rescues/Rescues";
import Admins from "./components/admins/Admins";
import VeterinarianDetails from "./components/veterinarians/VeterinarianDetails";
import Veterinarians from "./components/veterinarians/Veterinarians";
import {
  adopterDetailsEndpoint,
  adoptersEndpoint,
  favoritesEndpoint,
  fosterDetailsEndpoint,
  fostersEndpoint,
  rescueDetailsEndpoint,
  rescuesEndpoint,
  adminsEndpoint,
  veterinarianDetailsEndpoint,
  veterinariansEndpoint,
} from "./server/apiService/apiConfig";

export default function App() {
  return (
    <FavoritesProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path={adopterDetailsEndpoint}>
              <AdopterDetails />
            </Route>
            <Route exact path={adoptersEndpoint}>
              <Adopters />
            </Route>
            <Route exact path={favoritesEndpoint}>
              <Favorites />
            </Route>
            <Route exact path={fosterDetailsEndpoint}>
              <FosterDetails />
            </Route>
            <Route exact path={fostersEndpoint}>
              <Fosters />
            </Route>
            <Route exact path={rescueDetailsEndpoint}>
              <RescueDetails />
            </Route>
            <Route exact path={rescuesEndpoint}>
              <Rescues />
            </Route>
            <Route exact path={adminsEndpoint}>
              <Admins />
            </Route>
            <Route exact path={veterinarianDetailsEndpoint}>
              <VeterinarianDetails />
            </Route>
            <Route exact path={veterinariansEndpoint}>
              <Veterinarians />
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
