import React, { useReducer, useEffect, useCallback } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { useHistory } from "react-router-dom";
import { constructHeader, updateAppSettings } from "../util";
import { PetCard } from "./PetCard";

export const url = "http://localhost:5000/v1/favorites";

const initialState = {
  favPets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setFavPets':
      return { ...state, favPets: action.value };
    default:
      throw new Error();
  }
}

const Pet = React.memo(({ pet, removeFavorite }) => (
  <PetCard pet={pet} imageUrl={pet.imageUrl}>
    <Grid item xs={12} container justify="center">
      <Button
        style={{ width: '65%', margin: '0.625rem' }}
        variant="contained"
        color="secondary"
        size="small"
        onClick={() => removeFavorite(pet.id)}
        aria-label="Remove favorite"
      >
        REMOVE FAVORITE
      </Button>
    </Grid>
  </PetCard>
));

export const Favorites = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  const removeFavorite = useCallback(async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        const newFavPets = state.favPets.filter(pet => pet.id !== id);
        dispatch({ type: 'setFavPets', value: newFavPets });
      } else {
        console.error('Failed to remove pet from favorites');
      }
    } catch (err) {
      console.error('Error removing pet from favorites', err);
    }
  }, [state.favPets]);

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          const favoritesWithImages = json.favorites.map(pet => {
            let randomImageNumber = Math.floor(Math.random() * 10) + 1;
            let imageUrl = `/images/people/person-image-${randomImageNumber}.jpg`;
            return { ...pet, imageUrl };
          });
          dispatch({ type: 'setFavPets', value: [...favoritesWithImages] });
        }
      })
      .catch((err) =>
        console.log("Error getting favorite pets ", err.message)
      );
  }, [redirect]);

  return (
    <main className="Content">
      <AppHeader tabValue={0} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Your Favorite Pets!
            <span role="img" aria-label="pets">
              👍
            </span>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {state.favPets.map((pet) => (
            <Pet key={pet.id} pet={pet} removeFavorite={removeFavorite} />
          ))}
        </Grid>
      </Grid>
    </main>
  );
};