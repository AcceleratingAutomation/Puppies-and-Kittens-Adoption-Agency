import React, { useState, useEffect } from "react";
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

export const Pet = ({ name, id, type, gender, breed, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const pet = { name, id, type, gender, breed };
  const classes = useStyles();

  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    let randomImageNumber;
    switch (type.toLowerCase()) {
      case 'dog':
        randomImageNumber = Math.floor(Math.random() * 16) + 1;
        setImageUrl(`/images/puppies/puppy-image-${randomImageNumber}.jpg`);
        break;
      case 'cat':
        randomImageNumber = Math.floor(Math.random() * 10) + 1;
        setImageUrl(`/images/kittens/kitten-image-${randomImageNumber}.jpg`);
        break;
      default:
        randomImageNumber = Math.floor(Math.random() * 14) + 1;
        setImageUrl(`/images/people/person-image-${randomImageNumber}.jpg`);
    }
  }, [type]);

  let newPet = {
    imageUrl: imageUrl,
  };

  return (
    <PetCard pet={pet} imageUrl={newPet.imageUrl}>
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
      </Grid>
    </PetCard>
  );
};
