import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../styles.css";
import PropTypes from "prop-types";
import SummaryCard from "../SummaryCard";
import { rescuesEndpoint } from "../../server/apiService/apiConfig";

function RescueCard({
  name,
  id,
  image,
  type,
  gender,
  breed,
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
      directory={rescue.type.toLowerCase()}
      type={type}
      id={rescue.id}
      image={rescue.image}
      name={rescue.name}
      viewComponentDetailsUrl={`${rescuesEndpoint}/${rescue.id}`}
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
      <Grid item xs={12} container justifyContent="center">
        {isFavorite ? (
          <IconButton
            color="error"
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
  onAddFavorite: () => {}, // TODO
};

RescueCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  breed: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onAddFavorite: PropTypes.func,
  onRemoveFavorite: PropTypes.func.isRequired,
};

export default RescueCard;
