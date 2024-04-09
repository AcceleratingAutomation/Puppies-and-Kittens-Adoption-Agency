import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { AppHeader, tabs } from "../header/AppHeader";
import Loading from "../Loading";
import { fostersEndpoint, fostersUrl } from "../../server/apiService/apiConfig";
import { FavoritesContext } from "../../contexts/favoritesContext";
import DetailsButtons from "../DetailsButtons";
import FosterDetailsLayout from "./FosterDetailsLayout";
import {
  deleteDetails,
  fetchDetails,
  getTabValue,
  navigateBack,
  navigateToEdit,
} from "../../utils/componentUtils";
import { fostersText } from "../../accessibility/accessibilityText";

export default function FosterDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = getTabValue(tabs, fostersText);

  useEffect(() => {
    fetchDetails(fostersUrl, id, dispatch, "setFosterDetails", "fosters");
  }, [id, dispatch]);

  if (state.loading || !state.fosterDetails) {
    return <Loading />;
  }

  const type = state.fosterDetails;

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
        <FosterDetailsLayout foster={state.fosterDetails} />
        <DetailsButtons
          type={type}
          onBack={() => navigateBack(history, fostersEndpoint)}
          onEdit={() => navigateToEdit(history, id, fostersEndpoint)}
          onDelete={() =>
            deleteDetails(fostersUrl, id, history, dispatch, fostersEndpoint)
          }
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
}
