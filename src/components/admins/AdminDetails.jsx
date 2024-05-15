import React, { useEffect, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { AppHeader, tabs } from "../header/AppHeader";
import Loading from "../Loading";
import { adminsEndpoint, adminsUrl } from "../../server/apiService/apiConfig";
import { FavoritesContext } from "../../contexts/favoritesContext";
import DetailsButtons from "../DetailsButtons";
import AdminDetailsLayout from "./AdminDetailsLayout";
import {
  deleteDetails,
  fetchDetails,
  getTabValue,
  navigateBack,
  navigateToEdit,
} from "../../utils/componentUtils";
import { adminsText } from "../../accessibility/accessibilityText";
import NotFound from "../NotFound";

export default function AdminDetails() {
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = getTabValue(tabs, adminsText);

  useEffect(() => {
    fetchDetails(adminsUrl, id, dispatch, "setAdminDetails", "admins").catch(
      (error) => {
        dispatch({ type: "setError", value: error });
      },
    );
  }, [id, dispatch]);

  if (state.error) {
    return <NotFound />;
  }

  if (state.loading || !state.adminDetails) {
    return <Loading />;
  }

  const type = state.adminDetails;

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
        <AdminDetailsLayout admin={state.adminDetails} />
        <DetailsButtons
          type={type}
          onBack={() => navigateBack(history, adminsEndpoint)}
          onEdit={() => navigateToEdit(history, id, adminsEndpoint)}
          onDelete={() =>
            deleteDetails(adminsUrl, id, history, dispatch, adminsEndpoint)
          }
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
}
