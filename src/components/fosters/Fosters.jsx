import React, { useEffect, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { fostersUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";
import FosterCard from "./FosterCard";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";
import PaginationButtons from "../PaginationButtons";

export default function Fosters() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === "Fosters");
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData(fostersUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: "setFosters", value: [...json.fosters] });
        }
      })
      .catch((err) => {
        throw new Error(`Error fetching fosters: ${err.message}`);
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
          {state.fosters.slice(page * 20, (page + 1) * 20).map((foster) => (
            <FosterCard
              key={foster.id}
              id={foster.id}
              image={foster.image}
              name={foster.name}
              email={foster.email}
              numCurrentRescues={foster.numCurrentRescues}
              numTotalRescues={foster.numTotalRescues}
              isAccepting={foster.isAccepting}
            />
          ))}
        </Grid>
        <Grid item>
          <PaginationButtons
            page={page}
            setPage={setPage}
            dataLength={state.fosters.length}
          />
        </Grid>
      </Grid>
    </div>
  );
}
