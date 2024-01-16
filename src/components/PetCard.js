import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "../styles.css";
import { SummaryCard } from "./SummaryCard";

export const PetCard = ({ name, id, type, gender, breed, image, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const pet = { name, id, type, gender, breed, image };

  return (
    <SummaryCard type={pet.type} image={pet.image} name={pet.name} viewComponentDetailsUrl={`/v1/petDetails/${pet.id}`}>
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