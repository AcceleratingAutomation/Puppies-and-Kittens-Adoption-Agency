import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../utils";
import { useHistory } from "react-router-dom";
import { favoritesUrl } from "../server/apiConfig";
import { RescueCard } from './RescueCard';
import { RescuesContext } from '../contexts/rescuesContext';
import Loading from './Loading';

const url = "http://localhost:5000/v1/rescues";

export const Rescues = () => {
  const { state, dispatch } = useContext(RescuesContext);
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
          dispatch({ type: 'setRescues', value: [...json.rescues] });
        }
      })
      .catch((err) => console.log("Error fetching rescues ", err.message));
  }, [redirect, dispatch]);

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
        console.error('Failed to add rescue to favorites');
      }
    } catch (err) {
      console.error('Error adding rescue to favorites', err);
    }
  }, [dispatch]);

  const inFavorites = useCallback(async (id) => {
    const response = await fetch(`${favoritesUrl}`, {
      headers: constructHeader(),
    });

    if (response.ok) {
      const data = await response.json();
      return data.favorites.some(rescue => rescue.id === id);
    } else {
      console.error('Failed to fetch favorites');
      return false;
    }
  }, []);

  useEffect(() => {
    // Call inFavorites for each rescue and update favorites when the Promises resolve
    Promise.all(state.rescues.map(async rescue => {
      const isFavorite = await inFavorites(rescue.id);
      return isFavorite ? rescue.id : null;
    }))
      .then(favorites => {
        const favoriteIds = favorites.filter(id => id !== null);
        dispatch({ type: 'setFavorites', value: favoriteIds });
      });
  }, [state.rescues, inFavorites, dispatch]);

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
        console.error('Failed to remove rescue from favorites');
      }
    } catch (err) {
      console.error('Error removing rescue from favorites', err);
    }
  }, [dispatch]);

  const rescues = useMemo(() => state.rescues.map((rescue, key) => (
    <RescueCard
      key={key}
      name={rescue.name}
      id={rescue.id}
      type={rescue.type}
      gender={rescue.gender}
      breed={rescue.breed}
      image={rescue.image}
      onAddFavorite={onAddFavorite}
      onRemoveFavorite={onRemoveFavorite}
      isFavorite={state.favorites.includes(rescue.id)}
    />
  )), [state.rescues, state.favorites, onAddFavorite, onRemoveFavorite]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Rescue Puppies and Kittens!
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {rescues}
        </Grid>
      </Grid>
    </div>
  );
};

