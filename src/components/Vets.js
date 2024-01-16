import React, { useEffect, useCallback, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../utils";
import { useHistory } from "react-router-dom";

const url = "http://localhost:5000/v1/vets";

const initialState = {
    vets: [],
  };

function reducer(state, action) {
    switch (action.type) {
      case 'setVets':
        return { ...state, vets: action.value };
      default:
        throw new Error();
    }
  }

export const Vets = () => {
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
              dispatch({ type: 'setVets', value: [...json.vets] });
            }
          })
          .catch((err) => console.log("Error fetching vets ", err.message));
      }, [redirect]);

    return (
        <div className="Content">
          <AppHeader tabValue={5} />
          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item style={{ marginBottom: "5vh" }}>
              <Typography variant="h3" gutterBottom>
                Vets
              </Typography>
            </Grid>
            <Grid item container justify="center">
                <p>Coming soon!</p>
            </Grid>
          </Grid>
        </div>
      );
};