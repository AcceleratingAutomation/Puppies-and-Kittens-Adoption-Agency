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

export default function App() {
  return (
    <FavoritesProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/v1/rescues">
              <Rescues />
            </Route>
            <Route exact path="/v1/rescue/:id">
              <RescueDetails />
            </Route>
            <Route exact path="/v1/users">
              <Users />
            </Route>
            <Route exact path="/v1/favorites">
              <Favorites />
            </Route>
            <Route exact path="/v1/veterinarians">
              <Veterinarians />
            </Route>
            <Route exact path="/v1/fosters">
              <Fosters />
            </Route>
            <Route exact path="/v1/adopters">
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
