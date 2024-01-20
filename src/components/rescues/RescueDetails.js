import React, { useEffect, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { AppHeader } from "../header/AppHeader";
import { deleteFavorite } from "../../server/api/rescueDetailsApi";
import Loading from '../Loading';
import { fetchDetails, deleteDetails } from "../../server/api/detailsApi";
import { rescueDetailsUrl } from '../../server/api/apiConfig';
import { tabs } from "../header/AppHeader";
import { FavoritesContext } from '../../contexts/favoritesContext';
import DetailsButtons from "../DetailsButtons";
import RescueDetailsLayout from "./RescueDetailsLayout";

const useStyles = makeStyles({
  muiButton: {
    margin: '0.625rem',
  },
});

export const RescueDetails = () => {
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const classes = useStyles();
  const tabValue = tabs.findIndex(tab => tab.label === 'Rescues');

  const fetchRescue = useCallback(async () => {
    try {
      const data = await fetchDetails(rescueDetailsUrl, id);
      dispatch({
        type: 'setRescueDetails',
        value: data.rescues,
      });
    } catch (err) {
      console.log("Error fetching rescues ", err.message);
    }
  }, [id, dispatch]);

  useEffect(() => {
    fetchRescue();
  }, [fetchRescue]);

  const onDeleteRescue = useCallback(async (id) => {
    try {
      if (await deleteDetails(rescueDetailsUrl, id)) {
        dispatch({ type: 'closeDialog' });
        // The rescue also needs to be removed from favorites if it exists
        if (await deleteFavorite(id)) {
          history.push('/v1/rescues');
        }
        else {
          console.error('Failed to delete rescue from favorites');
        }
      } else {
        console.error('Failed to delete rescue');
      }
    } catch (err) {
      console.error('Error deleting rescue', err);
    }
  }, [history, dispatch]);

  const onBack = useCallback(() => {
    history.push('/v1/rescues');
  }, [history]);

  const onEditRescue = useCallback(async (id) => {
    console.log(`Edit!`)
    // history.push(`/v1/rescues/${id}/edit`);
  }, []);

  if (state.loading || !state.rescueDetails) {
    return <Loading />;
  }

  const { name } = state.rescueDetails;

  return (
    <div className="Content">
      <AppHeader tabValue={tabValue} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3" >
            {name}'s Details
          </Typography>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => console.log(`Adopt ${name}!`)}
          >
            ADOPT {name}
          </Button>
        </Grid>
        <RescueDetailsLayout
          rescue={state.rescueDetails}
        />
        <DetailsButtons
          rescue={state.rescueDetails}
          onBack={onBack}
          onEdit={onEditRescue}
          onDelete={onDeleteRescue}
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
};