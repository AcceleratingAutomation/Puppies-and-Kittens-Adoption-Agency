import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login } from "./components/Login";
import { Pets } from "./components/Pets";
import { Users } from "./components/Users";
import { AddPet } from "./components/AddPet";
import { MyFavorite } from "./components/MyFavorite";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/pets">
            <Pets />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route exact path="/favorite">
            <MyFavorite />
          </Route>
          <Route exact path="/pet">
            <AddPet />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
