import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import { adminsUrl } from "../../server/apiService/apiConfig";
import fetchData from "../../server/apiService/cardApi";
import AdminCard from "./AdminCard";
import { FavoritesContext } from "../../contexts/favoritesContext";
import Loading from "../Loading";
import PaginationButtons from "../PaginationButtons";
import { adminsText } from "../../accessibility/accessibilityText";
import { getTabValue } from "../../utils/componentUtils";
import NotFound from "../NotFound";

export default function Admins() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = getTabValue(tabs, adminsText);
  const [page, setPage] = useState(0);
  const showPage = true; // Define the 'showPage' variable

  useEffect(() => {
    fetchData(adminsUrl)
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: "setAdmins", value: [...json.admins] });
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
      {!showPage && <div />}
      {showPage && (
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="h3">Site Administrators</Typography>
          </Grid>
          <Grid
            item
            container
            direction="row"
            wrap="wrap"
            justifyContent="center"
          >
            {state.admins.slice(page * 12, (page + 1) * 12).map((admin) => (
              <AdminCard
                key={admin.id}
                id={admin.id}
                image={admin.image}
                email={admin.email}
                name={admin.name}
                numCurrentRescues={admin.numCurrentRescues}
                numTotalRescues={admin.numTotalRescues}
                numHouseholdPets={admin.numHouseholdPets}
                favorite={admin.favorite}
              />
            ))}
          </Grid>
          <Grid item>
            <PaginationButtons
              page={page}
              setPage={setPage}
              dataLength={state.admins.length}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
}
