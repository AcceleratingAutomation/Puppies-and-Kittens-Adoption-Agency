import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid } from "@material-ui/core";
import "../styles.css";
import { PetCard } from "./PetCard";

const useStyles = makeStyles({
    muiButton: {
      width: '65%',
      margin: '0.625rem',
    },
  });

export const Pet = ({ name, id, type, gender, breed, isFavorite, onAddFavorite, onRemoveFavorite, onDeletePet }) => {
    const pet = { name, id, type, gender, breed };
    const classes = useStyles();
    
    return (
      <PetCard pet={pet}>
        <Grid item xs={12} container justify="center">
          {isFavorite ? (
            <Button
              className={classes.muiButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onRemoveFavorite(id)}
            >
              REMOVE FAVORITE
            </Button>
          ) : (
            <Button
              className={classes.muiButton}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => onAddFavorite(id)}
            >
              ADD TO FAVORITES
            </Button>
          )}
          <Button
            className={classes.muiButton}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => onDeletePet(id)}
          >
            DELETE PET
          </Button>
        </Grid>
      </PetCard>
    );
  };
