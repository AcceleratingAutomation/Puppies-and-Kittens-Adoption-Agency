import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils";
import { useHistory } from "react-router-dom";
import { RescueCard } from './RescueCard';
import { RescuesContext } from '../../contexts/rescuesContext';
import Loading from '../Loading';
import { fetchRescues, addFavorite, checkFavorite, removeFavorite } from '../../server/api/rescuesApi';
import { tabs } from "../header/AppHeader";

export const Rescues = () => {
  const { state, dispatch } = useContext(RescuesContext);
  const history = useHistory();
  const tabValue = tabs.findIndex(tab => tab.label === 'Rescues');

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/v1/login");
  }, [history]);

  useEffect(() => {
    fetchRescues()
      .then((json) => {
        updateAppSettings(json.token);
        dispatch({ type: 'setRescues', value: [...json.rescues] });
      })
      .catch((err) => console.log("Error fetching rescues ", err.message));
  }, [redirect, dispatch]);

  const onAddFavorite = useCallback(async (id) => {
    if (await addFavorite(id)) {
      dispatch({
        type: 'addToFavorites',
        id: id,
      });
    } else {
      console.error('Failed to add rescue to favorites');
    }
  }, [dispatch]);

  const inFavorites = useCallback(checkFavorite, []);

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
    if (await removeFavorite(id)) {
      dispatch({
        type: 'removeFromFavorites',
        id: id,
      });
    } else {
      console.error('Failed to remove rescue from favorites');
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
      <AppHeader tabValue={tabValue} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "2vh" }}>
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


