import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import PropTypes from "prop-types";
import SummaryCard from "../SummaryCard";
import { adoptersEndpoint } from "../../server/apiService/apiConfig";

function AdopterCard({
  displayName,
  id,
  email,
  numHouseholdPets,
  image,
  isAdopting,
}) {
  const adopter = {
    displayName,
    id,
    email,
    numHouseholdPets,
    image,
    isAdopting,
  };

  return (
    <SummaryCard
      directory="users"
      type="adopter"
      id={adopter.id}
      image={adopter.image}
      name={adopter.displayName}
      viewComponentDetailsUrl={`${adoptersEndpoint}/${adopter.id}`}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{adopter.displayName}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {adopter.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Currently Looking: {adopter.isAdopting ? "Yes" : "No"}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Current Pets: {adopter.numHouseholdPets}
      </Typography>
      <Grid item xs={12} container justify="center" />
    </SummaryCard>
  );
}

AdopterCard.propTypes = {
  displayName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  numHouseholdPets: PropTypes.number.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isAdopting: PropTypes.bool.isRequired,
};

export default AdopterCard;
