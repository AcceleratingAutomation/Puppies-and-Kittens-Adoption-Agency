import React, { useReducer, useEffect, useCallback } from "react";
import {
  Button,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./header/AppHeader";
import { useHistory } from "react-router-dom";
import { constructHeader, isMember, updateAppSettings } from "../utils/utils";

const url = "http://localhost:5000/v1/pet";

const initialState = {
  pet: "",
  type: "",
  gender: "",
  breed: "",
  open: false,
  message: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setPetName":
      return { ...state, pet: action.value };
    case "setPetType":
      return { ...state, type: action.value };
    case "setPetGender":
      return { ...state, gender: action.value };
    case "setPetBreed":
      return { ...state, breed: action.value };
    case "setOpen":
      return { ...state, open: action.value };
    case "setMessage":
      return { ...state, message: action.value };
    case "clearFields":
      return { ...state, pet: "", type: "", gender: "", breed: "" };
    default:
      throw new Error();
  }
}

export const AddPet = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const showPage = !isMember();

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  useEffect(() => {
    if (!localStorage.getItem("token")) history.push("/v1/login");
  }, [history]);

  const onClick = () => {
    const petData = {
      name: state.pet,
      type: state.type,
      gender: state.gender,
      breed: state.breed,
    };
    fetch(url, {
      headers: constructHeader("application/json"),
      method: "POST",
      body: JSON.stringify(petData),
    })
      .then((res) => {
        if (res.status === 401) redirect();
        else {
          dispatch({ type: "setOpen", value: true });
          if (res.status === 200) dispatch({ type: "clearFields" });
        }
        return res.json();
      })
      .then((json) => {
        if (json) {
          updateAppSettings(json.token || "");
          dispatch({ type: "setMessage", value: json.message || "" });
        }
      })
      .catch((err) => console.log("Error adding pet ", err.message));
  };

  const handleClose = () => dispatch({ type: "setOpen", value: false });

  return (
    <div className="AddPet">
      {!showPage && <div />}
      {showPage && (
        <Grid container direction="column" alignItems="center">
          <Grid item style={{ marginBottom: "5vh" }}>
            <Typography variant="h3" gutterBottom>
              Add New Pet!
              <span role="img" aria-label="pets">
                📘
              </span>
            </Typography>
          </Grid>
          <Grid item style={{ marginBottom: "5vh" }}>
            <TextField
              id="petname-input"
              variant="outlined"
              label="name"
              value={state.pet}
              onChange={(e) =>
                dispatch({ type: "setPetName", value: e.target.value })
              }
            />
          </Grid>
          <Grid item style={{ marginBottom: "5vh" }}>
            <TextField
              id="pettype-input"
              variant="outlined"
              label="type"
              value={state.type}
              onChange={(e) =>
                dispatch({ type: "setPetType", value: e.target.value })
              }
            />
          </Grid>
          <Grid item style={{ marginBottom: "5vh" }}>
            <TextField
              id="petgender-input"
              variant="outlined"
              label="gender"
              value={state.gender}
              onChange={(e) =>
                dispatch({ type: "setPetGender", value: e.target.value })
              }
            />
          </Grid>
          <Grid item style={{ marginBottom: "5vh" }}>
            <TextField
              id="petbreed-input"
              variant="outlined"
              label="breed"
              value={state.breed}
              onChange={(e) =>
                dispatch({ type: "setPetBreed", value: e.target.value })
              }
            />
          </Grid>
          <Grid item style={{ marginBottom: "7vh" }}>
            <Button
              style={{ margin: "0.625rem" }}
              aria-label="login"
              variant="contained"
              size="large"
              color="primary"
              onClick={onClick}
            >
              ADD PET
            </Button>
          </Grid>
          <Grid>
            <Snackbar
              open={state.open}
              message={state.message}
              autoHideDuration={2000}
              onClose={handleClose}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
