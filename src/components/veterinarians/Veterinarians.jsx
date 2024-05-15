import React, { useEffect, useContext, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import VeterinarianCard from "./VeterinarianCard";
import { veterinariansUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";
import PaginationButtons from "../PaginationButtons";
import { veterinariansText } from "../../accessibility/accessibilityText";
import { getTabValue } from "../../utils/componentUtils";
import NotFound from "../NotFound";

export default function Veterinarians() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = getTabValue(tabs, veterinariansText);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData(veterinariansUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({
            type: "setVeterinarians",
            value: [...json.veterinarians],
          });
          dispatch({ type: "setError", value: false });
        }
      })
      .catch((err) => {
        dispatch({ type: "setError", value: err });
      });
  }, [dispatch]);

  if (state.error) {
    return <NotFound />;
  }

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="content">
      <AppHeader tabValue={tabValue} />
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h3">Local Veterinarians</Typography>
        </Grid>
        <Grid
          item
          container
          direction="row"
          wrap="wrap"
          justifyContent="center"
        >
          {state.veterinarians
            .slice(page * 12, (page + 1) * 12)
            .map((veterinarian) => (
              <VeterinarianCard
                key={veterinarian.id}
                id={veterinarian.id}
                image={veterinarian.image}
                name={veterinarian.name}
                email={veterinarian.email}
                numCurrentRescues={veterinarian.numCurrentRescues}
                numTotalRescues={veterinarian.numTotalRescues}
                isAccepting={veterinarian.isAccepting}
              />
            ))}
        </Grid>
        <Grid item>
          <PaginationButtons
            page={page}
            setPage={setPage}
            dataLength={state.veterinarians.length}
          />
        </Grid>
      </Grid>
    </div>
  );
}
