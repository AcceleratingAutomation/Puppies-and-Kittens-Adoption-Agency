import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../util";
import { useHistory } from "react-router-dom";
import { url as favoritesUrl } from "./Favorites";
import { PetCard } from './PetCard';
import { PetsContext } from '../contexts/petsContext';

const url = "http://localhost:5000/v1/pets";

export const Pets = () => {
  const { state, dispatch } = useContext(PetsContext);
  const history = useHistory();

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setPets', value: [...json.pets] });
        }
      })
      .catch((err) => console.log("Error fetching pets ", err.message));
  }, [redirect]);

  const onAddFavorite = useCallback(async (id) => {
    try {
      const response = await fetch(`${favoritesUrl}/${id}`, {
        method: 'POST',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        dispatch({
          type: 'addToFavorites',
          id: id,
        });
      } else {
        console.error('Failed to add pet to favorites');
      }
    } catch (err) {
      console.error('Error adding pet to favorites', err);
    }
  }, []);

  const inFavorites = useCallback(async (id) => {
    const response = await fetch(`${favoritesUrl}`, {
      headers: constructHeader(),
    });

    if (response.ok) {
      const data = await response.json();
      return data.favorites.some(pet => pet.id === id);
    } else {
      console.error('Failed to fetch favorites');
      return false;
    }
  }, []);

  useEffect(() => {
    // Call inFavorites for each pet and update favorites when the Promises resolve
    Promise.all(state.pets.map(async pet => {
      const isFavorite = await inFavorites(pet.id);
      return isFavorite ? pet.id : null;
    }))
      .then(favorites => {
        const favoriteIds = favorites.filter(id => id !== null);
        dispatch({ type: 'setFavorites', value: favoriteIds });
      });
  }, [state.pets, inFavorites, dispatch]);

  const onRemoveFavorite = useCallback(async (id) => {
    try {
      const response = await fetch(`${favoritesUrl}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });
      if (response.status === 200) {
        dispatch({
          type: 'removeFromFavorites',
          id: id,
        });
      } else {
        console.error('Failed to remove pet from favorites');
      }
    } catch (err) {
      console.error('Error removing pet from favorites', err);
    }
  }, []);

  const pets = useMemo(() => state.pets.map((pet, key) => (
    <PetCard
      key={key}
      name={pet.name}
      id={pet.id}
      type={pet.type}
      gender={pet.gender}
      breed={pet.breed}
      onAddFavorite={onAddFavorite}
      onRemoveFavorite={onRemoveFavorite}
      isFavorite={state.favorites.includes(pet.id)}
    />
  )), [state.pets, state.favorites, onAddFavorite, onRemoveFavorite]);

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      {state.loading ? (
        <div>Loading...</div>
      ) : (
        <Grid container justify="center" alignItems="center" direction="column">
          <Grid item style={{ marginBottom: "5vh" }}>
            <Typography variant="h3" gutterBottom>
              Rescue Puppies and Kittens!
              <span role="img" aria-label="pets">
                📚
              </span>
            </Typography>
          </Grid>
          <Grid item container justify="center">
            {pets}
          </Grid>
        </Grid>
      )}
    </div>
  );
};


