import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, Typography } from "@material-ui/core";
import "../styles.css";
import { SummaryCard } from "./SummaryCard";

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

  return (
    <SummaryCard imageUrl={imageUrl} componentUrl={`/v1/petDetails/${pet.id}`}>
      <Grid item xs={12}>
        <Typography variant="h4">{pet.name}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {pet.type}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {pet.gender}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {pet.breed}
      </Typography>
      <Grid item xs={12} container justify="center">
        {isFavorite ? (
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onRemoveFavorite(pet.id)}
          >
            REMOVE FAVORITE
          </Button>
        ) : (
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onAddFavorite(pet.id)}
          >
            ADD TO FAVORITES
          </Button>
        )}
      </Grid>
    </SummaryCard>
  );
};