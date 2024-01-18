import React, { useEffect, useCallback, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { constructHeader, updateAppSettings } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { tabs } from "../header/AppHeader";

const url = "http://localhost:5000/v1/canidates";

const initialState = {
    canidates: [],
  };

function reducer(state, action) {
    switch (action.type) {
      case 'setCanidates':
        return { ...state, canidates: action.value };
      default:
        throw new Error();
    }
  }

export const Canidates = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const tabValue = tabs.findIndex(tab => tab.label === 'Canidates');

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
              dispatch({ type: 'setCanidates', value: [...json.canidates] });
            }
          })
          .catch((err) => console.log("Error fetching canidates ", err.message));
      }, [redirect]);

    return (
        <div className="Content">
          <AppHeader tabValue={tabValue} />
          <Grid container justify="center" alignItems="center" direction="column">
            <Grid item style={{ marginBottom: "5vh" }}>
              <Typography variant="h3" gutterBottom>
                Canidates
              </Typography>
            </Grid>
            <Grid item container justify="center">
                <p>Coming soon!</p>
            </Grid>
          </Grid>
        </div>
      );
};