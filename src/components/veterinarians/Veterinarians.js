import React, { useEffect, useReducer } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { tabs } from "../header/AppHeader";
import VeterinarianCard from "./VeterinarianCard";
import { veterinariansUrl } from "../../server/api/apiConfig";
import { fetchData } from "../../server/api/cardApi";

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
  const tabValue = tabs.findIndex(tab => tab.label === 'Veterinarians');

  useEffect(() => {
    fetchData(veterinariansUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setVeterinarians', value: [...json.veterinarians] });
        }
      })
      .catch((err) => console.log("Error fetching veterinarians ", err.message));
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      <Grid item container justify="center">
        {state.veterinarians.map((veterinarian) => {
          return (
            <VeterinarianCard
              key={veterinarian.id}
              image={veterinarian.image}
              displayName={veterinarian.displayName}
              email={veterinarian.email}
              numCurrentRescues={veterinarian.numCurrentRescues}
              numTotalRescues={veterinarian.numTotalRescues}
              isAccepting={veterinarian.isAccepting}
            />
          );
        })}
      </Grid>
    </div>
  );
};