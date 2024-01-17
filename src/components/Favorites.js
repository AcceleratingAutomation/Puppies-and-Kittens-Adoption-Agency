import React, { useContext, useEffect, useCallback } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { RescueCard } from "./rescues/RescueCard";
import { RescuesContext } from "../contexts/rescuesContext";
import Loading from "./Loading";
import { fetchFavorites, removeFavorite } from "../server/api/favoritesApi";

export const Favorites = () => {
  const { state, dispatch } = useContext(RescuesContext);

  const fetchAndSetFavorites = useCallback(async () => {
    const data = await fetchFavorites();
    dispatch({ type: 'setRescues', value: data.favorites });
    const favoriteIds = data.favorites.map(favorite => favorite.id);
    dispatch({ type: 'setFavorites', value: favoriteIds });
    dispatch({ type: 'setLoading', value: false });
  }, [dispatch]);

  useEffect(() => {
    fetchAndSetFavorites();
  }, [fetchAndSetFavorites]);

  const handleRemoveFavorite = useCallback(async (id) => {
    if (await removeFavorite(id)) {
      dispatch({ type: 'removeFromFavorites', id });
    }
    else {
      console.error('Failed to delete rescue from favorites');
    }
  }, [dispatch]);

  if (state.loading) {
    return <Loading />;
  }

  return (
    <main className="Content">
      <AppHeader tabValue={0} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "2vh" }}>
          <Typography variant="h3" >
            Your Favorites
            <span role="img" aria-label="Red heart icon">
              ❤️
            </span>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {state.rescues
            .filter(rescue => state.favorites.includes(rescue.id))
            .map((rescue) => (
              <RescueCard
                key={rescue.id}
                id={rescue.id}
                name={rescue.name}
                type={rescue.type}
                gender={rescue.gender}
                breed={rescue.breed}
                image={rescue.image}
                isFavorite={true}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
        </Grid>
      </Grid>
    </main>
  );
};
