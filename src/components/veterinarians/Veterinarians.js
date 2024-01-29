import React, { useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { tabs } from "../header/AppHeader";
import VeterinarianCard from "./VeterinarianCard";
import { veterinariansUrl } from "../../server/api/apiConfig";
import { fetchData } from "../../server/api/cardApi";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";

export const Veterinarians = () => {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === "Veterinarians");

  useEffect(() => {
    fetchData(veterinariansUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({
            type: "setVeterinarians",
            value: [...json.veterinarians],
          });
        }
      })
      .catch((err) =>
        console.log("Error fetching veterinarians ", err.message),
      );
  }, [dispatch]);

  if (state.loading) {
    return <Loading />;
  }

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
