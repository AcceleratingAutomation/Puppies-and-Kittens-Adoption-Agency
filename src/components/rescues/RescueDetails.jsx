import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import "../../styles.css";
import { AppHeader, tabs } from "../header/AppHeader";
import Loading from "../Loading";
import { rescuesEndpoint, rescuesUrl } from "../../server/apiService/apiConfig";
import { FavoritesContext } from "../../contexts/favoritesContext";
import DetailsButtons from "../DetailsButtons";
import RescueDetailsLayout from "./RescueDetailsLayout";
import NotFound from "../NotFound";
import {
  deleteDetails,
  fetchDetails,
  getTabValue,
  navigateBack,
  navigateToEdit,
} from "../../utils/componentUtils";
import { rescuesText } from "../../accessibility/accessibilityText";

export default function RescueDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = getTabValue(tabs, rescuesText);

  useEffect(() => {
    fetchDetails(rescuesUrl, id, dispatch, "setRescueDetails", "rescues").catch(
      (error) => {
        dispatch({ type: "setError", value: error });
      },
    );
  }, [id, dispatch]);

  if (state.error) {
    return <NotFound />;
  }

  if (state.loading || !state.rescueDetails) {
    return <Loading />;
  }

  const type = state.rescueDetails;

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
          <Button
            className="mui-button"
            variant="contained"
            color="primary"
            size="large"
            onClick={() => console.log(`Adopt ${type.name}!`)}
          >
            ADOPT {type.name}
          </Button>
        </Grid>
        <RescueDetailsLayout rescue={state.rescueDetails} />
        <DetailsButtons
          type={type}
          onBack={() => navigateBack(history, rescuesEndpoint)}
          onEdit={() => navigateToEdit(history, id, rescuesEndpoint)}
          onDelete={() =>
            deleteDetails(rescuesUrl, id, history, dispatch, rescuesEndpoint)
          }
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
}
