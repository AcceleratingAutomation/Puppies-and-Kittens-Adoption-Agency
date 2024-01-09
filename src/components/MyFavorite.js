import React, { useReducer, useEffect } from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { useHistory } from "react-router-dom";
import { constructHeader, updateAppSettings } from "../util";

export const url = "http://localhost:5000/v1/favorite";

const initialState = {
  favPets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setFavPets':
      return { ...state, favPets: action.value };
    default:
      throw new Error();
  }
}

export const MyFavorite = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  const redirect = () => {
    localStorage.clear();
    history.push("/login");
  };

  const removeFavorite = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: constructHeader(),
      });

      if (response.status === 200) {
        const newFavPets = state.favPets.filter(pet => pet.id !== id);
        dispatch({ type: 'setFavPets', value: newFavPets });
      } else {
        console.error('Failed to remove pet from favorites');
      }
    } catch (err) {
      console.error('Error removing pet from favorites', err);
    }
  };

  useEffect(() => {
    fetch(url, { headers: constructHeader() })
      .then((res) => (res.status === 401 ? redirect() : res.json()))
      .then((json) => {
        if (json) {
          updateAppSettings(json.token);
          dispatch({ type: 'setFavPets', value: [...json.favorites] });
        }
      })
      .catch((err) =>
        console.log("Error getting favorite pets ", err.message)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Content">
      <AppHeader tabValue={0} />
      <Grid container direction="column" alignItems="center">
        <Grid item style={{ marginBottom: "5vh" }}>
          <Typography variant="h3" gutterBottom>
            Your Favorite Pets!
            <span role="img" aria-label="pets">
              👍
            </span>
          </Typography>
        </Grid>
        <Grid item>
          {state.favPets.map((pet, key) => {
            return (
              <Paper key={key} elevation={2} className="Pet">
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Typography variant="h6">{pet.name}</Typography>
                  </Grid>
                  <Typography variant="subtitle1" gutterBottom>
                    {pet.type}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {pet.gender}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    {pet.breed}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => removeFavorite(pet.id)} 
                  >
                    REMOVE FAVORITE
                  </Button>
                </Grid>
              </Paper>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
