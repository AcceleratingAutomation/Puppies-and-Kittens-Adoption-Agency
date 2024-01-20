import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { AppHeader } from "../header/AppHeader";
import Loading from '../Loading';
import { rescueDetailsUrl } from '../../server/api/apiConfig';
import { tabs } from "../header/AppHeader";
import { FavoritesContext } from '../../contexts/favoritesContext';
import DetailsButtons from "../DetailsButtons";
import RescueDetailsLayout from "./RescueDetailsLayout";
import { navigateBack, navigateToEdit, deleteDetails, fetchDetails } from "../../utils/componentUtils";

const useStyles = makeStyles({
  muiButton: {
    margin: '0.625rem',
  },
});

export const RescueDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { state, dispatch } = useContext(FavoritesContext);
  const history = useHistory();
  const tabValue = tabs.findIndex(tab => tab.label === 'Rescues');

  useEffect(() => {
    fetchDetails(rescueDetailsUrl, id, dispatch, 'setRescueDetails', 'rescues');
  }, [id, dispatch]);

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
          onBack={() => navigateBack(history, '/v1/rescues')}
          onEdit={() => navigateToEdit(history, id, '/v1/rescue')}
          onDelete={() => deleteDetails(rescueDetailsUrl, id, history, dispatch, '/v1/rescues')}
          openDialog={state.openDialog}
          dispatch={dispatch}
        />
      </Grid>
    </div>
  );
};