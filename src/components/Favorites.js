import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader } from "../utils";
import { RescueCard } from "./RescueCard";
import { RescuesContext } from "../contexts/rescuesContext";

export const url = "http://localhost:5000/v1/favorites";

export const Favorites = () => {
  const { state, dispatch } = useContext(RescuesContext);

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'setRescues', value: data.favorites });
        const favoriteIds = data.favorites.map(favorite => favorite.id);
        dispatch({ type: 'setFavorites', value: favoriteIds });
        dispatch({ type: 'setLoading', value: false });
      });
  }, [dispatch]);

  const handleRemoveFavorite = async (id) => {
    const favResponse = await fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: constructHeader(),
    });
    if (favResponse.ok) {
      dispatch({ type: 'removeFromFavorites', id });
    }
    else {
      console.error('Failed to delete rescue from favorites');
    }
  };

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="Content">
      <AppHeader tabValue={0} />
      <Grid container justify="center" alignItems="center" direction="column">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Your Favorites!
            <span role="img" aria-label="rescues">
              👍
            </span>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {state.rescues
            .filter(rescue => state.favorites.includes(rescue.id))
            .map((rescue, key) => (
              <RescueCard
                key={key}
                name={rescue.name}
                id={rescue.id}
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