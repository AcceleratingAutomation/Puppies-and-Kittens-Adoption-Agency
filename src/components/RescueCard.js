import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import "../styles.css";
import { SummaryCard } from "./SummaryCard";

export const RescueCard = ({ name, id, type, gender, breed, image, isFavorite, onAddFavorite, onRemoveFavorite }) => {
  const rescue = { name, id, type, gender, breed, image };

  return (
    <SummaryCard type={rescue.type} image={rescue.image} name={rescue.name} viewComponentDetailsUrl={`/v1/rescueDetails/${rescue.id}`}>
      <Grid item xs={12}>
        <Typography variant="h4">{rescue.name}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {rescue.type}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {rescue.gender}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {rescue.breed}
      </Typography>
      <Grid item xs={12} container justify="center">
        {isFavorite ? (
          <IconButton
            color="secondary"
            onClick={() => onRemoveFavorite(rescue.id)}
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => onAddFavorite(rescue.id)}
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </Grid>
    </SummaryCard>
  );
};