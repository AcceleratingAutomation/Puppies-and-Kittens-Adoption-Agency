import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDetails from "./components/admins/AdminDetails";
import Admins from "./components/admins/Admins";
import AdopterDetails from "./components/adopters/AdopterDetails";
import Adopters from "./components/adopters/Adopters";
import CreateAdminDetails from "./components/admins/CreateAdminDetails";
import CreateAdopterDetails from "./components/adopters/CreateAdopterDetails";
import CreateFosterDetails from "./components/fosters/CreateFosterDetails";
import CreateRescueDetails from "./components/rescues/CreateRescueDetails";
import CreateVeterinarianDetails from "./components/veterinarians/CreateVeterinarianDetails";
import EditAdminDetails from "./components/admins/EditAdminDetails";
import EditAdopterDetails from "./components/adopters/EditAdopterDetails";
import EditFosterDetails from "./components/fosters/EditFosterDetails";
import EditRescueDetails from "./components/rescues/EditRescueDetails";
import EditVeterinarianDetails from "./components/veterinarians/EditVeterinarianDetails";
import Favorites from "./components/Favorites";
import { FavoritesProvider } from "./contexts/favoritesContext";
import FosterDetails from "./components/fosters/FosterDetails";
import Fosters from "./components/fosters/Fosters";
import Login from "./components/login/Login";
import Registration from "./components/registration/Registration";
import RescueDetails from "./components/rescues/RescueDetails";
import Rescues from "./components/rescues/Rescues";
import VeterinarianDetails from "./components/veterinarians/VeterinarianDetails";
import Veterinarians from "./components/veterinarians/Veterinarians";
import {
  adminAddEndpoint,
  adminDetailsEndpoint,
  adminEditEndpoint,
  adminsEndpoint,
  adopterAddEndpoint,
  adopterDetailsEndpoint,
  adopterEditEndpoint,
  adoptersEndpoint,
  favoritesEndpoint,
  fosterAddEndpoint,
  fosterDetailsEndpoint,
  fosterEditEndpoint,
  fostersEndpoint,
  registrationEndpoint,
  rescueAddEndpoint,
  rescueDetailsEndpoint,
  rescueEditEndpoint,
  rescuesEndpoint,
  veterinarianAddEndpoint,
  veterinarianDetailsEndpoint,
  veterinarianEditEndpoint,
  veterinariansEndpoint,
} from "./server/apiService/apiConfig";

export default function App() {
  return (
    <FavoritesProvider>
      <div className="app">
        <Router>
          <Switch>
            <Route exact path={adminAddEndpoint}>
              <CreateAdminDetails />
            </Route>
            <Route exact path={adminDetailsEndpoint}>
              <AdminDetails />
            </Route>
            <Route exact path={adminEditEndpoint}>
              <EditAdminDetails />
            </Route>
            <Route exact path={adminsEndpoint}>
              <Admins />
            </Route>
            <Route exact path={adopterAddEndpoint}>
              <CreateAdopterDetails />
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
            <Route exact path={fosterAddEndpoint}>
              <CreateFosterDetails />
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
            <Route exact path={registrationEndpoint}>
              <Registration />
            </Route>
            <Route exact path={rescueAddEndpoint}>
              <CreateRescueDetails />
            </Route>
            <Route exact path={rescueDetailsEndpoint}>
              <RescueDetails />
            </Route>
            <Route exact path={rescueEditEndpoint}>
              <EditRescueDetails />
            </Route>
            <Route exact path={rescuesEndpoint}>
              <Rescues />
            </Route>
            <Route exact path={veterinarianAddEndpoint}>
              <CreateVeterinarianDetails />
            </Route>
            <Route exact path={veterinarianDetailsEndpoint}>
              <VeterinarianDetails />
            </Route>
            <Route exact path={veterinarianEditEndpoint}>
              <EditVeterinarianDetails />
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
