import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { AppHeader, tabs } from "../header/AppHeader";
import Loading from "../Loading";
import {
  veterinariansEndpoint,
  veterinariansUrl,
} from "../../server/apiService/apiConfig";
import { FavoritesContext } from "../../contexts/favoritesContext";
import DetailsButtons from "../DetailsButtons";
import VeterinarianDetailsLayout from "./VeterinarianDetailsLayout";
import {
  deleteDetails,
  fetchDetails,
  getTabValue,
  navigateBack,
  navigateToEdit,
} from "../../utils/componentUtils";
import { veterinariansText } from "../../accessibility/accessibilityText";

export default function VeterinarianDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = getTabValue(tabs, veterinariansText);

  useEffect(() => {
    fetchDetails(
      veterinariansUrl,
      id,
      dispatch,
      "setVeterinarianDetails",
      "veterinarians",
    );
  }, [id, dispatch]);

  if (state.loading || !state.veterinarianDetails) {
    return <Loading />;
  }

  const type = state.veterinarianDetails;

  return (
    <div className="content">
      <AppHeader tabValue={tabValue} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item>
          <Typography variant="h3">
            {type.name}
            &apos;s Details
          </Typography>
        </Grid>
        <VeterinarianDetailsLayout veterinarian={state.veterinarianDetails} />
        <DetailsButtons
          type={type}
          onBack={() => navigateBack(history, veterinariansEndpoint)}
          onEdit={() => navigateToEdit(history, id, veterinariansEndpoint)}
          onDelete={() =>
            deleteDetails(
              veterinariansUrl,
              id,
              history,
              dispatch,
              veterinariansEndpoint,
            )
          }
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
}
