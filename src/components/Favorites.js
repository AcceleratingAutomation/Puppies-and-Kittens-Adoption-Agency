import React, { useContext, useEffect, useCallback } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader } from "../utils";
import { RescueCard } from "./RescueCard";
import { RescuesContext } from "../contexts/rescuesContext";
import Loading from "./Loading";
import { favoritesUrl } from "../server/apiConfig";

export const Favorites = () => {
  const { state, dispatch } = useContext(RescuesContext);

  const fetchFavorites = useCallback(() => {
    fetch(favoritesUrl, { headers: constructHeader() })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'setRescues', value: data.favorites });
        const favoriteIds = data.favorites.map(favorite => favorite.id);
        dispatch({ type: 'setFavorites', value: favoriteIds });
        dispatch({ type: 'setLoading', value: false });
      });
  }, [dispatch]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const handleRemoveFavorite = useCallback(async (id) => {
    const favResponse = await fetch(`${favoritesUrl}/${id}`, {
      method: 'DELETE',
      headers: constructHeader(),
    });
    if (favResponse.ok) {
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