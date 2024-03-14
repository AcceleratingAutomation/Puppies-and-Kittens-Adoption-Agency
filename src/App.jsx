import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDetails from "./components/admins/AdminDetails";
import Admins from "./components/admins/Admins";
import AdopterDetails from "./components/adopters/AdopterDetails";
import Adopters from "./components/adopters/Adopters";
import EditAdopterDetails from "./components/adopters/EditAdopterDetails";
import EditFosterDetails from "./components/fosters/EditFosterDetails";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./contexts/favoritesContext";
import FosterDetails from "./components/fosters/FosterDetails";
import Fosters from "./components/fosters/Fosters";
import Login from "./components/login/Login";
import RescueDetails from "./components/rescues/RescueDetails";
import Rescues from "./components/rescues/Rescues";
import VeterinarianDetails from "./components/veterinarians/VeterinarianDetails";
import Veterinarians from "./components/veterinarians/Veterinarians";
import {
  adminDetailsEndpoint,
  adminsEndpoint,
  adopterDetailsEndpoint,
  adopterEditEndpoint,
  adoptersEndpoint,
  favoritesEndpoint,
  fosterDetailsEndpoint,
  fosterEditEndpoint,
  fostersEndpoint,
  rescueDetailsEndpoint,
  rescuesEndpoint,
  veterinarianDetailsEndpoint,
  veterinariansEndpoint,
} from "./server/apiService/apiConfig";

export default function App() {
  return (
    <FavoritesProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path={adminsEndpoint}>
              <Admins />
            </Route>
            <Route exact path={adminDetailsEndpoint}>
              <AdminDetails />
            </Route>
            <Route exact path={adopterDetailsEndpoint}>
              <AdopterDetails />
            </Route>
            <Route exact path={adopterEditEndpoint}>
              <EditAdopterDetails />
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
            <Route exact path={fosterEditEndpoint}>
              <EditFosterDetails />
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
