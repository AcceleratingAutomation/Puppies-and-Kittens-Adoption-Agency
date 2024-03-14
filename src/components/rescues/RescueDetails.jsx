import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { AppHeader, tabs } from "../header/AppHeader";
import Loading from "../Loading";
import { rescuesEndpoint, rescuesUrl } from "../../server/apiService/apiConfig";
import { FavoritesContext } from "../../contexts/favoritesContext";
import DetailsButtons from "../DetailsButtons";
import RescueDetailsLayout from "./RescueDetailsLayout";
import {
  deleteDetails,
  fetchDetails,
  getTabValue,
  navigateBack,
  navigateToEdit,
} from "../../utils/componentUtils";
import { rescuesText } from "../../accessibility/header/headerText";

const useStyles = makeStyles({
  muiButton: {
    margin: "0.625rem",
  },
});

export default function RescueDetails() {
  const classes = useStyles();
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = getTabValue(tabs, rescuesText);

  useEffect(() => {
    fetchDetails(rescuesUrl, id, dispatch, "setRescueDetails", "rescues");
  }, [id, dispatch]);

  if (state.loading || !state.rescueDetails) {
    return <Loading />;
  }

  const type = state.rescueDetails;

  return (
    <div className="content">
      <AppHeader tabValue={tabValue} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3">
            {type.name}
            &apos;s Details
          </Typography>
          <Button
            className={classes.muiButton}
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
