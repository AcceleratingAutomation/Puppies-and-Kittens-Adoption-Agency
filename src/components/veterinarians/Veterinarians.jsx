import React, { useEffect, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import VeterinarianCard from "./VeterinarianCard";
import { veterinariansUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";
import PaginationButtons from "../PaginationButtons";
import { veterinariansText } from "../../accessibility/header/headerText";
import { getTabValue } from "../../utils/componentUtils";

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
        }
      })
      .catch((err) => {
        throw new Error(`Error fetching veterinarians ${err.message}`);
      });
  }, [dispatch]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="content">
      <AppHeader tabValue={tabValue} />
      <Grid container direction="column" alignItems="center">
        <Grid item container direction="row" wrap="wrap" justify="center">
          {state.veterinarians
            .slice(page * 20, (page + 1) * 20)
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
