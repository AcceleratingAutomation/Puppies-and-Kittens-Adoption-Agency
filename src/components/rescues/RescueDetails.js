import React, { useEffect, useContext, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { AppHeader } from "../header/AppHeader";
import DisplayImage from "../DisplayImage";
import { deleteFavorite } from "../../server/api/rescueDetailsApi";
import Loading from '../Loading';
import { fetchDetails, deleteDetails } from "../../server/api/detailsApi";
import { rescueDetailsUrl } from '../../server/api/apiConfig';
import { tabs } from "../header/AppHeader";
import { FavoritesContext } from '../../contexts/favoritesContext';
import DetailsButtons from "../DetailsButtons";

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
  
  const { name, type, gender, breed, hasFoster, hasVet, isSterilized, isVaccinated, isAdoptable, image, bio } = state.rescueDetails;
  
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
        <Container maxWidth="lg">
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
              <Grid container>
                <Grid item xs={6}><strong>Type</strong></Grid>
                <Grid item xs={6}>{type}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Gender</strong></Grid>
                <Grid item xs={6}>{gender}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Breed</strong></Grid>
                <Grid item xs={6}>{breed}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Foster</strong></Grid>
                <Grid item xs={6}>{hasFoster ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Veternarian</strong></Grid>
                <Grid item xs={6}>{hasVet ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>{gender === 'Female' ? 'Spayed' : 'Neutered'}</strong></Grid>
                <Grid item xs={6}>{isSterilized ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Vaccinated</strong></Grid>
                <Grid item xs={6}>{isVaccinated ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Ready To Adopt</strong></Grid>
                <Grid item xs={6}>{isAdoptable ? 'Yes' : 'No'}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
              <DisplayImage
                type={type}
                image={image}
                name={name}
                width='12rem'
                height='12rem'
              />
            </Grid>
            <Grid item xs={12} sm={8} md={3} style={{ textAlign: 'left' }}>
              <p>{bio}</p>
            </Grid>
          </Grid>
        </Container>
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