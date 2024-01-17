import React, { useEffect, useCallback, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./header/AppHeader";
import { constructHeader, updateAppSettings } from "../utils";
import { useHistory } from "react-router-dom";
import { AddPet } from "./AddPet";

const url = "http://localhost:5000/v1/forms";

const initialState = {
    forms: [],
  };

function reducer(state, action) {
    switch (action.type) {
      case 'setForms':
        return { ...state, forms: action.value };
      default:
        throw new Error();
    }
  }

export const Forms = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const redirect = useCallback(() => {
        localStorage.clear();
        history.push("/v1/login");
      }, [history]);
    
      useEffect(() => {
        fetch(url, { headers: constructHeader() })
          .then((res) => (res.status === 401 ? redirect() : res.json()))
          .then((json) => {
            if (json) {
              updateAppSettings(json.token);
              dispatch({ type: 'setForms', value: [...json.forms] });
            }
          })
          .catch((err) => console.log("Error fetching forms ", err.message));
      }, [redirect]);

    return (
        <div className="Content">
          <AppHeader tabValue={2} />
          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item style={{ marginBottom: "5vh" }}>
              <Typography variant="h3" gutterBottom>
                User Forms
              </Typography>
            </Grid>
            <Grid item container justify="center">
                <p>Coming soon!</p>
            </Grid>
            <Grid item container justify="center">
                < AddPet />
            </Grid>
          </Grid>
        </div>
      );
};