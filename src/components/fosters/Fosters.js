import React, { useEffect, useCallback, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { tabs } from "../header/AppHeader";
import { fostersUrl } from "../../server/api/apiConfig";
import { fetchData } from "../../server/api/cardApi";
import FosterCard from "./FosterCard";

const initialState = {
  fosters: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setFosters':
      return { ...state, fosters: action.value };
    default:
      throw new Error();
  }
}

export const Fosters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const tabValue = tabs.findIndex(tab => tab.label === 'Fosters');

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  useEffect(() => {
    fetchData(fostersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setFosters', value: [...json.fosters] });
        }
      })
      .catch((err) => console.log("Error fetching fosters ", err.message));
  }, [redirect]);

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Fosters
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {state.fosters.map((foster) => {
            return (
              <FosterCard
                key={foster.id}
                image={foster.image}
                displayName={foster.displayName}
                email={foster.email}
                numCurrentRescues={foster.numCurrentRescues}
                numTotalRescues={foster.numTotalRescues}
                isAccepting={foster.isAccepting}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};