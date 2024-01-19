import React, { useEffect, useReducer } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
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
  const tabValue = tabs.findIndex(tab => tab.label === 'Adopters');

  useEffect(() => {
    fetchData(adoptersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setAdopters', value: [...json.adopters] });
        }
      })
      .catch((err) => console.log("Error fetching adopters ", err.message));
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
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
    </div>
  );
};