import React from "react";
import { Grid, Typography } from "@mui/material";
import "../../styles.css";
import PropTypes from "prop-types";
import SummaryCard from "../SummaryCard";
import { adminsEndpoint } from "../../server/apiService/apiConfig";
import {
  currentRescuesLabel,
  totalRescuesLabel,
  householdPetsLabel,
  favoritesLabel,
} from "../../accessibility/accessibilityText";

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
    <main data-testid="admin-card" className="flex-display">
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
          {currentRescuesLabel} {admin.numCurrentRescues}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {totalRescuesLabel} {admin.numTotalRescues}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {householdPetsLabel} {admin.numHouseholdPets}
        </Typography>
        <Typography variant="h5" gutterBottom>
          {favoritesLabel} {admin.favorite.length}
        </Typography>
        <Grid item xs={12} container justifyContent="center" />
      </SummaryCard>
    </main>
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
