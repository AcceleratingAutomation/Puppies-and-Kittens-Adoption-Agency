import React, { useEffect, useCallback, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { constructHeader, updateAppSettings } from "../../utils";
import { useHistory } from "react-router-dom";

const url = "http://localhost:5000/v1/veterinarians";

const initialState = {
    veterinarians: [],
  };

function reducer(state, action) {
    switch (action.type) {
      case 'setVeterinarians':
        return { ...state, veterinarians: action.value };
      default:
        throw new Error();
    }
  }

export const Veterinarians = () => {
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
              dispatch({ type: 'setVeterinarians', value: [...json.veterinarians] });
            }
          })
          .catch((err) => console.log("Error fetching veterinarians ", err.message));
      }, [redirect]);

    return (
        <div className="Content">
          <AppHeader tabValue={5} />
          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item style={{ marginBottom: "5vh" }}>
              <Typography variant="h3" gutterBottom>
                Veterinarians
              </Typography>
            </Grid>
            <Grid item container justify="center">
                <p>Coming soon!</p>
            </Grid>
          </Grid>
        </div>
      );
};