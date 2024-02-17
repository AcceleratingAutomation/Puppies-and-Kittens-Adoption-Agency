import React, { useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { adoptersUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";
import AdopterCard from "./AdopterCard";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";

export default function Adopters() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === "Adopters");

  useEffect(() => {
    fetchData(adoptersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: "setAdopters", value: [...json.adopters] });
        }
      })
      .catch((err) => {
        throw new Error(`Error fetching adopters ${err.message}`);
      });
  }, [dispatch]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="content">
      <AppHeader tabValue={tabValue} />
      <Grid item container justify="center">
        {state.adopters.map((adopter) => (
          <AdopterCard
            key={adopter.id}
            image={adopter.image}
            displayName={adopter.displayName}
            email={adopter.email}
            numHouseholdPets={adopter.numHouseholdPets}
            isAdopting={adopter.isAdopting}
          />
        ))}
      </Grid>
    </div>
  );
}
