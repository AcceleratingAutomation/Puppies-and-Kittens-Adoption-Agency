import React, { useEffect, useReducer, useCallback } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@material-ui/core";
import { constructHeader } from "../util";
import { AppHeader } from "./AppHeader";

const url = "http://localhost:5000/v1/petDetails";

const initialState = { pet: null, loading: true };

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { pet: action.payload, loading: false };
    default:
      throw new Error();
  }
}

export const PetDetails = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

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

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom >
          {state.pet.name}'s Details
          </Typography>
        </Grid>
        <Grid container style={{ padding: '1.25rem' }} alignItems="baseline" direction="row" >
          <Grid item xs={12} sm={6} style={{ textAlign: 'left' }} >
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
              <Grid item xs={6}><strong>Has Foster Care</strong></Grid>
              <Grid item xs={6}>{state.pet.hasFoster ? state.pet.hasFoster.toString() : ''}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}><strong>Has Veternarian Care</strong></Grid>
              <Grid item xs={6}>{state.pet.hasVet ? state.pet.hasVet.toString() : ''}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}><strong>Spayed/Neutered</strong></Grid>
              <Grid item xs={6}>{state.pet.isSterilized ? state.pet.isSterilized.toString() : ''}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}><strong>Vaccinated</strong></Grid>
              <Grid item xs={6}>{state.pet.isVaccinated ? state.pet.isVaccinated.toString() : ''}</Grid>
            </Grid>
            <Grid container>
              <Grid item xs={6}><strong>Ready To Adopt</strong></Grid>
              <Grid item xs={6}>{state.pet.isAdoptable ? state.pet.isAdoptable.toString() : ''}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} style={{ textAlign: 'left' }}>
            <p><strong>Biography</strong> <br /> {state.pet.bio}</p>
          </Grid>
        </Grid>
        <Grid item xs={12} container justify="center">
        <Button
          style={{ margin: '0.625rem' }}
          variant="contained"
          color="primary"
          size="large"
          onClick={() => console.log(`Adopt ${state.pet.name}!`)}
        >
          ADOPT {state.pet.name}
        </Button>
      </Grid>
      </Grid>
    </div>
  );
};