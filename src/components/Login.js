import React, { useReducer } from "react";
import { Grid, Typography, TextField, Button, Hidden } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { updateAppSettings } from "../utils";
import RescueImage from "./RescueImage";
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
          history.push("/v1/rescues");
        }
      })
      .catch((err) => console.log("Error logging into app ", err.message));
  };

  return (
    <Grid
      container
      direction={"column"}
      alignItems={"center"}
      style={{ marginTop: "3vh" }}
    >
      <Grid item style={{ marginBottom: "5vh" }}>
        <Typography variant={"h3"}>
          Puppies and Kittens <Hidden xsDown><br /></Hidden> Adoption Agency!
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
      <Grid item style={{ marginBottom: "5vh" }}>
        <TextField
          id={"password-input"}
          label={"password"}
          type={"password"}
          value={state.password}
          onChange={(e) => onChangePassword(e.target.value)}
        />
      </Grid>
      <Grid item style={{ marginBottom: "5vh" }}>
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
      <Grid container style={{ margin: '0 auto', maxWidth: '80%' }} justify="center">
        <Grid item xs={12} sm={4}>
          <RescueImage
            type={"dog"}
            image={0}
            name={"Playful Puppy"}
            width='15rem'
            height='15rem'
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <RescueImage
            type={"cat"}
            image={0}
            name={"Playful Kitten"}
            width='15rem'
            height='15rem'
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
