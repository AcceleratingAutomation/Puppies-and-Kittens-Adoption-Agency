import React, { useReducer, useEffect } from "react";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import "../styles.css";
import { AppHeader } from "./AppHeader";
import { constructHeader, updateAppSettings } from "../util";
import { useHistory } from "react-router-dom";
const url = "http://localhost:5000/pets";

const initialState = {
  pets: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'setPets':
      return { ...state, pets: action.value };
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
                onClick={() => console.log("My Favorite")}
              />
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};

const Pet = ({ name, id, type, gender, breed, onClick }) => {
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
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => onClick(id)}
        >
          ADD TO FAVORITES
        </Button>
      </Grid>
    </Paper>
  );
};
