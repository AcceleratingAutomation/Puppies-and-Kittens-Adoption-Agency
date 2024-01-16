import React, { useContext, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../utils";
import { PetCard } from "./PetCard";
import { PetsContext } from "../contexts/petsContext";

export const url = "http://localhost:5000/v1/favorites";

export const Favorites = () => {
  const { state, dispatch } = useContext(PetsContext);

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'setPets', value: data.favorites });
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
      console.error('Failed to delete pet from favorites');
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
            Your Favorite Pets!
            <span role="img" aria-label="pets">
              👍
            </span>
          </Typography>
        </Grid>
        <Grid item container justify="center">
          {state.pets
            .filter(pet => state.favorites.includes(pet.id))
            .map((pet, key) => (
              <PetCard
                key={key}
                name={pet.name}
                id={pet.id}
                type={pet.type}
                gender={pet.gender}
                breed={pet.breed}
                isFavorite={true}
                onRemoveFavorite={handleRemoveFavorite}
              />
            ))}
        </Grid>
      </Grid>
    </main>
  );
};