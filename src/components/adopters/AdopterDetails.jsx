import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { AppHeader, tabs } from "../header/AppHeader";
import Loading from "../Loading";
import {
  adoptersEndpoint,
  adoptersUrl,
} from "../../server/apiService/apiConfig";
import { FavoritesContext } from "../../contexts/favoritesContext";
import DetailsButtons from "../DetailsButtons";
import AdopterDetailsLayout from "./AdopterDetailsLayout";
import {
  navigateBack,
  navigateToEdit,
  deleteDetails,
  fetchDetails,
  getTabValue,
} from "../../utils/componentUtils";
import { adoptersText } from "../../accessibility/accessibilityText";
import NotFound from "../NotFound";

export default function AdopterDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = getTabValue(tabs, adoptersText);

  useEffect(() => {
    fetchDetails(
      adoptersUrl,
      id,
      dispatch,
      "setAdopterDetails",
      "adopters",
    ).catch((error) => {
      dispatch({ type: "setError", value: error });
    });
  }, [id, dispatch]);

  if (state.error) {
    return <NotFound />;
  }

  if (state.loading || !state.adopterDetails) {
    return <Loading />;
  }

  const type = state.adopterDetails;

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
        <AdopterDetailsLayout adopter={state.adopterDetails} />
        <DetailsButtons
          type={type}
          onBack={() => navigateBack(history, adoptersEndpoint)}
          onEdit={() => navigateToEdit(history, id, adoptersEndpoint)}
          onDelete={() =>
            deleteDetails(adoptersUrl, id, history, dispatch, adoptersEndpoint)
          }
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
}
