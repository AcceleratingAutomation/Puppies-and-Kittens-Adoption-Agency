import React, { useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { tabs } from "../header/AppHeader";
import { fostersUrl } from "../../server/api/apiConfig";
import { fetchData } from "../../server/api/cardApi";
import FosterCard from "./FosterCard";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";

export const Fosters = () => {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === "Fosters");

  useEffect(() => {
    fetchData(fostersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: "setFosters", value: [...json.fosters] });
        }
      })
      .catch((err) => console.log("Error fetching fosters ", err.message));
  }, [dispatch]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
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
    </div>
  );
};
