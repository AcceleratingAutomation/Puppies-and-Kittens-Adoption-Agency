import React, { useContext, useEffect, useCallback, useMemo } from "react";
import { Grid } from "@material-ui/core";
import "../../styles.css";
import { AppHeader } from "../header/AppHeader";
import { updateAppSettings } from "../../utils/utils";
import RescueCard from './RescueCard';
import { FavoritesContext } from '../../contexts/favoritesContext';
import Loading from '../Loading';
import { addFavorite, checkFavorite, removeFavorite } from '../../server/api/rescuesApi';
import { tabs } from "../header/AppHeader";
import { rescuesUrl } from '../../server/api/apiConfig';
import { fetchData } from '../../server/api/cardApi';

export const Rescues = () => {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex(tab => tab.label === 'Rescues');

  useEffect(() => {
    fetchData(rescuesUrl)
      .then((json) => {
        updateAppSettings(json.token);
        dispatch({ type: 'setRescues', value: [...json.rescues] });
      })
      .catch((err) => console.log("Error fetching rescues ", err.message));
  }, [dispatch]);

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
      <Grid item container justify="center">
        {rescues}
      </Grid>
    </div>
  );
};


