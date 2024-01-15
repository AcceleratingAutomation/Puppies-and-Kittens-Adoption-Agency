import React, { useState, useEffect } from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "../styles.css";
import { SummaryCard } from "./SummaryCard";

export const Pet = ({ name, id, type, gender, breed, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const pet = { name, id, type, gender, breed };

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
          <IconButton
            color="secondary"
            onClick={() => onRemoveFavorite(pet.id)}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => onAddFavorite(pet.id)}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </Grid>
    </SummaryCard>
  );
};