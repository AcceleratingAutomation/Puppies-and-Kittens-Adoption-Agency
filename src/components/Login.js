import React, { useReducer } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { updateAppSettings } from "../util";
let base64 = require("base-64");
let headers = new Headers();
const url = "http://localhost:5000/v1/login";

const initialState = {
  userName: "",
  password: "",
  loginError: "",
};

function reducer(state, action) {
  switch (action.type) {
    case 'setUserName':
      return { ...state, userName: action.value };
    case 'setPassword':
      return { ...state, password: action.value };
    case 'setLoginError':
      return { ...state, loginError: action.value };
    default:
      throw new Error();
  }
}

export const Login = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const onChangeUsername = (username) => dispatch({ type: 'setUserName', value: username });
  const onChangePassword = (password) => dispatch({ type: 'setPassword', value: password });

  const onClickLogin = () => {
    headers.set(
      "Authorization",
      "Basic " + base64.encode(state.userName + ":" + state.password)
    );
    fetch(url, { headers: headers, method: "POST" })
      .then((res) => res.json())
      .then((json) => {
        if (json.message) dispatch({ type: 'setLoginError', value: json.message });
        else {
          updateAppSettings(json.token);
          history.push("/v1/pets");
        }
      })
      .catch((err) => console.log("Error logging into app ", err.message));
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      style={{ marginTop: "10vh" }}
    >
      <Grid item style={{ marginBottom: "10vh" }}>
        <Typography variant={"h3"}>
          Welcome to Puppies and Kittens Adoption Agency!
          <span role={"img"} aria-label={"pets"}>
            📚
          </span>
        </Typography>
      </Grid>
      <Grid item style={{ marginBottom: "5vh" }}>
        <TextField
          id={"username-input"}
          label={"username"}
          value={state.userName}
          onChange={(e) => onChangeUsername(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: "7vh" }}>
        <TextField
          id={"password-input"}
          label={"password"}
          type={"password"}
          value={state.password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: "7vh" }}>
        <Button
          style={{ margin: '0.625rem' }}
          aria-label={"login"}
          variant={"contained"}
          size={"large"}
          color={"primary"}
          onClick={onClickLogin}
        >
          LOGIN
        </Button>
      </Grid>
      <Grid item>
        <Typography variant={"body2"} color={"error"}>
          {state.loginError}
        </Typography>
      </Grid>
    </Grid>
  );
};
