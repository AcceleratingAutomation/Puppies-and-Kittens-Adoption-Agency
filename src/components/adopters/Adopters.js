import React, { useEffect, useCallback, useReducer } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { useHistory } from "react-router-dom";
import { tabs } from "../header/AppHeader";
import { adoptersUrl } from "../../server/api/apiConfig";
import { fetchData } from "../../server/api/cardApi";
import AdopterCard from "./AdopterCard";

const initialState = {
  adopters: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setAdopters':
      return { ...state, adopters: action.value };
    default:
      throw new Error();
  }
}

export const Adopters = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const tabValue = tabs.findIndex(tab => tab.label === 'Adopters');

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  useEffect(() => {
    fetchData(adoptersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setAdopters', value: [...json.adopters] });
        }
      })
      .catch((err) => console.log("Error fetching adopters ", err.message));
  }, [redirect]);

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Adopters
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {state.adopters.map((adopter) => {
            return (
              <AdopterCard
                key={adopter.id}
                image={adopter.image}
                displayName={adopter.displayName}
                email={adopter.email}
                householdPets={adopter.householdPets}
                isAdopting={adopter.isAdopting}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};