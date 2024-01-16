import React, { useEffect, useReducer, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import { constructHeader } from "../utils";
import { AppHeader } from "./AppHeader";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { url as favoritesUrl } from "./Favorites";
import { getImageUrl } from "../utils";

const url = "http://localhost:5000/v1/petDetails";

const useStyles = makeStyles({
  muiButton: {
    margin: '0.625rem',
  },
});

const initialState = { pet: null, loading: true, openDialog: false };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, pet: action.payload, loading: false };
    case 'OPEN_DIALOG':
      return { ...state, openDialog: true };
    case 'CLOSE_DIALOG':
      return { ...state, openDialog: false };
    default:
      throw new Error();
  }
}

export const PetDetails = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();
  const classes = useStyles();

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  useEffect(() => {
    fetch(`${url}/${id}`, { headers: constructHeader() })
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((data) => {
        if (data) {
          dispatch({ type: 'FETCH_SUCCESS', payload: data.pet });
        }
      })
      .catch((err) => console.log("Error fetching pets ", err.message));
  }, [id, redirect]);

  const onDeletePet = useCallback(async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        // The pet also needs to be removed from favorites if it exists
        const favResponse = await fetch(`${favoritesUrl}/${id}`, {
          method: 'DELETE',
          headers: constructHeader(),
        });

        if (favResponse.ok) {
          history.push('/v1/pets');
        }
        else {
          console.error('Failed to delete pet from favorites');
        }
      } else {
        console.error('Failed to delete pet');
      }
    } catch (err) {
      console.error('Error deleting pet', err);
    }
  }, [history]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item>
          <Typography variant="h3" >
            {state.pet.name}'s Details
          </Typography>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="large"
            onClick={() => console.log(`Adopt ${state.pet.name}!`)}
          >
            ADOPT {state.pet.name}
          </Button>
        </Grid>
        <Container maxWidth="lg">
          <Grid container justify="center" alignItems="center" direction="row">
            <Grid item xs={12} sm={12} md={3} style={{ textAlign: 'center' }}>
              <img
                src={getImageUrl(state.pet.type, state.pet.image)}
                alt={state.pet.image ? `${state.pet.name}'s image` : `${state.pet.name}'s placeholder image`}
                style={{ borderRadius: '50%', width: '12rem', height: '12rem', objectFit: 'cover' }}
              ></img>
            </Grid>
            <Grid item xs={12} sm={5} md={3} style={{ textAlign: 'center' }}>
              <Grid container>
                <Grid item xs={6}><strong>Type</strong></Grid>
                <Grid item xs={6}>{state.pet.type}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Gender</strong></Grid>
                <Grid item xs={6}>{state.pet.gender}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Breed</strong></Grid>
                <Grid item xs={6}>{state.pet.breed}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Foster</strong></Grid>
                <Grid item xs={6}>{state.pet.hasFoster ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Veternarian</strong></Grid>
                <Grid item xs={6}>{state.pet.hasVet ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>{state.pet.gender === 'Female' ? 'Spayed' : 'Neutered'}</strong></Grid>
                <Grid item xs={6}>{state.pet.isSterilized ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Vaccinated</strong></Grid>
                <Grid item xs={6}>{state.pet.isVaccinated ? 'Yes' : 'No'}</Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}><strong>Ready To Adopt</strong></Grid>
                <Grid item xs={6}>{state.pet.isAdoptable ? 'Yes' : 'No'}</Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={5} md={3} style={{ textAlign: 'left' }}>
              <p>{state.pet.bio}</p>
            </Grid>
          </Grid>
        </Container>
        <Grid item xs={12} container justify="center">
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            onClick={() => history.push('/v1/pets')}
          >
            Back
          </Button>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            onClick={() => console.log(`Edit ${state.pet.name}!`)}
          >
            Edit {state.pet.name}
          </Button>
          <Button
            className={classes.muiButton}
            variant="contained"
            color="secondary"
            onClick={() => dispatch({ type: 'OPEN_DIALOG' })}
          >
            DELETE {state.pet.name}
          </Button>
          <ConfirmationDialog
            open={state.openDialog}
            onClose={() => dispatch({ type: 'CLOSE_DIALOG' })}
            onConfirm={() => onDeletePet(id)}
          />
        </Grid>
      </Grid>
    </div>
  );
};