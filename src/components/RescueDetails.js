import React, { useEffect, useReducer, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { constructHeader } from "../utils";
import { AppHeader } from "./AppHeader";
import { ConfirmationDialog } from "./ConfirmationDialog";
import RescueImage from "./RescueImage";
import { favoritesUrl, rescueDetailsUrl } from "../server/apiConfig";
import Loading from './Loading';

const useStyles = makeStyles({
  muiButton: {
    margin: '0.625rem',
  },
});

const initialState = { rescue: null, loading: true, openDialog: false };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, rescue: action.payload, loading: false };
    case 'OPEN_DIALOG':
      return { ...state, openDialog: true };
    case 'CLOSE_DIALOG':
      return { ...state, openDialog: false };
    default:
      throw new Error();
  }
}

export const RescueDetails = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const classes = useStyles();

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  const fetchRescue = useCallback(() => {
    fetch(`${rescueDetailsUrl}/${id}`, { headers: constructHeader() })
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((data) => {
        if (data) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data.rescue });
        }
      })
      .catch((err) => console.log("Error fetching rescues ", err.message));
  }, [id, redirect]);

  useEffect(() => {
    fetchRescue();
  }, [fetchRescue]);

  const onDeleteRescue = useCallback(async (id) => {
    try {
      const response = await fetch(`${rescueDetailsUrl}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        // The rescue also needs to be removed from favorites if it exists
        const favResponse = await fetch(`${favoritesUrl}/${id}`, {
          method: 'DELETE',
          headers: constructHeader(),
        });

        if (favResponse.ok) {
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
  }, [history]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3" >
            {state.rescue.name}'s Details
          </Typography>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => console.log(`Adopt ${state.rescue.name}!`)}
          >
            ADOPT {state.rescue.name}
          </Button>
        </Grid>
        <Container maxWidth="lg">
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
              <Grid container>
                <Grid item xs={6}><strong>Type</strong></Grid>
                <Grid item xs={6}>{state.rescue.type}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Gender</strong></Grid>
                <Grid item xs={6}>{state.rescue.gender}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Breed</strong></Grid>
                <Grid item xs={6}>{state.rescue.breed}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Foster</strong></Grid>
                <Grid item xs={6}>{state.rescue.hasFoster ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Veternarian</strong></Grid>
                <Grid item xs={6}>{state.rescue.hasVet ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>{state.rescue.gender === 'Female' ? 'Spayed' : 'Neutered'}</strong></Grid>
                <Grid item xs={6}>{state.rescue.isSterilized ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Vaccinated</strong></Grid>
                <Grid item xs={6}>{state.rescue.isVaccinated ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Ready To Adopt</strong></Grid>
                <Grid item xs={6}>{state.rescue.isAdoptable ? 'Yes' : 'No'}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={4} md={3} style={{ textAlign: 'center' }}>
            <RescueImage
              type={state.rescue.type}
              image={state.rescue.image}
              name={state.rescue.name}
              width='12rem'
              height='12rem'
            />
          </Grid>
            <Grid item xs={12} sm={8} md={3} style={{ textAlign: 'left' }}>
              <p>{state.rescue.bio}</p>
            </Grid>
          </Grid>
        </Container>
        <Grid item xs={12} container justify="center">
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            onClick={() => history.push('/v1/rescues')}
          >
            Back
          </Button>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            onClick={() => console.log(`Edit ${state.rescue.name}!`)}
          >
            Edit {state.rescue.name}
          </Button>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="secondary"
            onClick={() => dispatch({ type: 'OPEN_DIALOG' })}
          >
            DELETE {state.rescue.name}
          </Button>
          <ConfirmationDialog
            open={state.openDialog}
            onClose={() => dispatch({ type: 'CLOSE_DIALOG' })}
            onConfirm={() => onDeleteRescue(id)}
          />
        </Grid>
      </Grid>
    </div>
  );
};