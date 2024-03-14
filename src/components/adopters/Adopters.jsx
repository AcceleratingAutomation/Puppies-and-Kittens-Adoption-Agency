import React, { useEffect, useContext, useState } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { adoptersUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";
import AdopterCard from "./AdopterCard";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";
import PaginationButtons from "../PaginationButtons";
import { getTabValue } from "../../utils/componentUtils";
import { adoptersText } from "../../accessibility/header/headerText";

export default function Adopters() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = getTabValue(tabs, adoptersText);
  const [page, setPage] = useState(0);

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
      <Grid container direction="column" alignItems="center">
        <Grid item container direction="row" wrap="wrap" justify="center">
          {state.adopters.slice(page * 20, (page + 1) * 20).map((adopter) => (
            <AdopterCard
              key={adopter.id}
              id={adopter.id}
              image={adopter.image}
              name={adopter.name}
              email={adopter.email}
              numHouseholdPets={adopter.numHouseholdPets}
              isAdopting={adopter.isAdopting}
            />
          ))}
        </Grid>
        <Grid item>
          <PaginationButtons
            page={page}
            setPage={setPage}
            dataLength={state.adopters.length}
          />
        </Grid>
      </Grid>
    </div>
  );
}
