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
    const generateRandomImageUrl = (maxImages) => {
      const randomImageNumber = Math.floor(Math.random() * maxImages) + 1;
      return `/images/${type}/${type}-image-${randomImageNumber}.jpg`;
    };

    switch (type.toLowerCase()) {
      case 'dog':
        setImageUrl(generateRandomImageUrl(16));
        break;
      case 'cat':
        setImageUrl(generateRandomImageUrl(13));
        break;
      default:
        setImageUrl(generateRandomImageUrl(10));
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
