import React, { useReducer, useEffect, useCallback, useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../util";
import { useHistory } from "react-router-dom";
import { url as favoriteUrl } from "./MyFavorite";
import { PetCard } from "./PetCard";

const url = "http://localhost:5000/v1/pets";

const initialState = {
  pets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setPets':
      return { ...state, pets: action.value };
    case 'setFavorites':
      return action.isFavorite;
    default:
      throw new Error();
  }
}

const useStyles = makeStyles({
  muiButton: {
    width: '65%',
    margin: '0.625rem',
  },
});

export const Pets = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const redirect = useCallback(() => {
    localStorage.clear();
    history.push("/login");
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

  const addToFavorites = useCallback(async (id, dispatch) => {
    try {
      const response = await fetch(`${favoriteUrl}/${id}`, {
        method: 'POST',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        dispatch({
          type: 'setFavorites',
          isFavorite: true,
        });
      } else {
        console.error('Failed to add pet to favorites');
      }
    } catch (err) {
      console.error('Error adding pet to favorites', err);
    }
  }, []);

  const inFavorites = useCallback(async (id) => {
    const response = await fetch(`${favoriteUrl}`, {
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

  const onRemoveFavorite = useCallback(async (id, dispatch) => {
    try {
      const response = await fetch(`${favoriteUrl}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });
      if (response.status === 200) {
        dispatch({
          type: 'setFavorites',
          isFavorite: false,
        });
      } else {
        console.error('Failed to remove pet from favorites');
      }
    } catch (err) {
      console.error('Error removing pet from favorites', err);
    }
  }, []);

  const deletePet = useCallback(async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        // Remove the deleted pet from the state
        dispatch({
          type: 'setPets',
          value: state.pets.filter((pet) => pet.id !== id),
        });

        // The pet also needs to be removed from favorites if it exists
        const favResponse = await fetch(`${favoriteUrl}/${id}`, {
          method: 'DELETE',
          headers: constructHeader(),
        });

        if (!favResponse.ok) {
          console.error('Failed to delete pet from favorites');
        }
      } else {
        console.error('Failed to delete pet');
      }
    } catch (err) {
      console.error('Error deleting pet', err);
    }
  }, [state.pets]);

  const pets = useMemo(() => state.pets.map((pet, key) => (
    <Pet
      key={key}
      name={pet.name}
      id={pet.id}
      type={pet.type}
      gender={pet.gender}
      breed={pet.breed}
      color={pet.color}
      onAddFavorite={addToFavorites}
      onRemoveFavorite={onRemoveFavorite}
      inFavorites={inFavorites}
      onDelete={deletePet}
    />
  )), [state.pets, addToFavorites, onRemoveFavorite, inFavorites, deletePet]);

  return (
    <div className="Content">
      <AppHeader tabValue={1} />
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
    </div>
  );
};

const Pet = ({ name, id, type, gender, breed, onAddFavorite, inFavorites, onRemoveFavorite, onDelete }) => {
  const pet = { name, id, type, gender, breed };
  const classes = useStyles();
  const [isFavorite, dispatch] = useReducer(reducer, false);

  useEffect(() => {
    inFavorites(id).then(isFavorite => {
      dispatch({ type: 'setFavorites', isFavorite });
    });
  }, [id, inFavorites]);

  return (
    <PetCard pet={pet}>
      <Grid item xs={12} container justify="center">
        {isFavorite ? (
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onRemoveFavorite(id, dispatch)}
          >
            REMOVE FAVORITE
          </Button>
        ) : (
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onAddFavorite(id, dispatch)}
          >
            ADD TO FAVORITES
          </Button>
        )}
        <Button
          className={classes.muiButton}
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => onDelete(id)}
        >
          DELETE PET
        </Button>
      </Grid>
    </PetCard>
  );
};
