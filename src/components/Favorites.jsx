import React, { useContext, useEffect, useCallback } from 'react';
import { Grid } from '@material-ui/core';
import '../styles.css';
import { AppHeader, tabs } from './header/AppHeader';
import RescueCard from './rescues/RescueCard';
import { FavoritesContext } from '../contexts/favoritesContext';
import Loading from './Loading';
import { fetchFavorites, removeFavorite } from '../server/api/favoritesApi';

export default function Favorites() {
  const { state, dispatch } = useContext(FavoritesContext);
  const tabValue = tabs.findIndex((tab) => tab.label === 'Favorites');

  const fetchAndSetFavorites = useCallback(async () => {
    const data = await fetchFavorites();
    dispatch({ type: 'setRescues', value: data.favorites });
    const favoriteIds = data.favorites.map((favorite) => favorite.id);
    dispatch({ type: 'setFavorites', value: favoriteIds });
    dispatch({ type: 'setLoading', value: false });
  }, [dispatch]);

  useEffect(() => {
    fetchAndSetFavorites();
  }, [fetchAndSetFavorites]);

  const handleRemoveFavorite = useCallback(
    async (id) => {
      if (await removeFavorite(id)) {
        dispatch({ type: 'removeFromFavorites', id });
      } else {
        throw new Error('Failed to delete rescue from favorites');
      }
    },
    [dispatch],
  );

  if (state.loading) {
    return <Loading />;
  }

  return (
    <main className="Content">
      <AppHeader tabValue={tabValue} />
      <Grid item container justify="center">
        {state.rescues
          .filter((rescue) => state.favorites.includes(rescue.id))
          .map((rescue) => (
            <RescueCard
              key={rescue.id}
              id={rescue.id}
              name={rescue.name}
              type={rescue.type}
              gender={rescue.gender}
              breed={rescue.breed}
              isFavorite
              onRemoveFavorite={handleRemoveFavorite}
            />
          ))}
      </Grid>
    </main>
  );
}
