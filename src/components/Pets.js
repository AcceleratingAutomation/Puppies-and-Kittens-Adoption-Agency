import React, { useReducer, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../util";
import { useHistory } from "react-router-dom";
import {url as favoriteUrl} from "./MyFavorite";

const url = "http://localhost:5000/v1/pets";

const initialState = {
  pets: [],
  favorites: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setPets':
      return { ...state, pets: action.value };
    case 'addFavorite':
      return { ...state, favorites: [...state.favorites, action.value] };
    default:
      throw new Error();
  }
}

export const Pets = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const redirect = () => {
    localStorage.clear();
    history.push("/login");
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToFavorites = async (id) => {
    try {
      const response = await fetch(`${favoriteUrl}/${id}`, {
        method: 'POST',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        // Add the favorite pet to the state
        dispatch({
          type: 'addFavorite',
          value: id,
        });
      } else {
        console.error('Failed to add pet to favorites');
      }
    } catch (err) {
      console.error('Error adding pet to favorites', err);
    }
  };

  const inFavorites = (id) => state.favorites.includes(id);

  const redirectToFavorite = () => {history.push('/favorite')}

  const deletePet = async (id) => {
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
      } else {
        console.error('Failed to delete pet');
      }
    } catch (err) {
      console.error('Error deleting pet', err);
    }
  };

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
          {state.pets.map((pet, key) => {
            return (
              <Pet
                key={key}
                name={pet.name}
                id={pet.id}
                type={pet.type}
                gender={pet.gender}
                breed={pet.breed}
                color={pet.color}
                onAddFavorite={addToFavorites}
                onRedirectFavorite={redirectToFavorite}
                inFavorites={inFavorites}
                onDelete={deletePet}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const Pet = ({ name, id, type, gender, breed, onAddFavorite, inFavorites, onRedirectFavorite, onDelete }) => {
  return (
    <Paper elevation={2} className="Pet">
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Typography variant="subtitle1" gutterBottom>
          {type}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {gender}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {breed}
        </Typography>
        {inFavorites(id) ? (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onRedirectFavorite()}
        >
          FAVORITE
        </Button>
        ) : (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onAddFavorite(id)}
        >
          ADD TO FAVORITES
        </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={() => onDelete(id)} 
        >
          DELETE PET
        </Button>
      </Grid>
    </Paper>
  );
};
