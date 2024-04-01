import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import PropTypes from "prop-types";
import SummaryCard from "../SummaryCard";
import { adminsEndpoint } from "../../server/apiService/apiConfig";

function AdminCard({
  name,
  id,
  numCurrentRescues,
  numTotalRescues,
  numHouseholdPets,
  favorite,
  image,
  email,
}) {
  const admin = {
    name,
    id,
    numCurrentRescues,
    numTotalRescues,
    numHouseholdPets,
    favorite,
    image,
    email,
  };

  return (
    <SummaryCard
      directory="users"
      type="admin"
      id={admin.id}
      image={admin.image}
      name={admin.name}
      viewComponentDetailsUrl={`${adminsEndpoint}/${admin.id}`}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{admin.name}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {admin.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Current Rescues: {admin.numCurrentRescues}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Total Rescues: {admin.numTotalRescues}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Household Pets: {admin.numHouseholdPets}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Favorites: {admin.favorite.length}
      </Typography>
      <Grid item xs={12} container justify="center" />
    </SummaryCard>
  );
}

AdminCard.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  numCurrentRescues: PropTypes.number.isRequired,
  numTotalRescues: PropTypes.number.isRequired,
  numHouseholdPets: PropTypes.number.isRequired,
  favorite: PropTypes.arrayOf(PropTypes.string).isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  email: PropTypes.string.isRequired,
};

export default AdminCard;
