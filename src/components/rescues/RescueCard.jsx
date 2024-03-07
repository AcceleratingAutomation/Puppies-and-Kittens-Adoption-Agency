import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "../../styles.css";
import PropTypes from "prop-types";
import SummaryCard from "../SummaryCard";

function RescueCard({
  name,
  id,
  image,
  type,
  gender,
  breed,
  directory,
  isFavorite,
  onAddFavorite,
  onRemoveFavorite,
}) {
  const rescue = {
    name,
    id,
    image,
    type,
    gender,
    breed,
  };

  return (
    <SummaryCard
      directory={directory}
      type={type}
      id={rescue.id}
      image={rescue.image}
      name={rescue.name}
      viewComponentDetailsUrl={`/v1/rescue/${rescue.id}`}
    >
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
            aria-label="Remove from favorites"
          >
            <FavoriteIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => onAddFavorite(rescue.id)}
            aria-label="Add to favorites"
          >
            <FavoriteBorderIcon />
          </IconButton>
        )}
      </Grid>
    </SummaryCard>
  );
}

RescueCard.defaultProps = {
  directory: "", // TODO
  onAddFavorite: () => {}, // TODO
};

RescueCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  directory: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func.isRequired,
};

export default RescueCard;
