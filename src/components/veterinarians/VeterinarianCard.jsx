import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import SummaryCard from "../SummaryCard";
import { veterinariansEndpoint } from "../../server/apiService/apiConfig";

function VeterinarianCard({
  displayName,
  id,
  email,
  numCurrentRescues,
  numTotalRescues,
  image,
  isAccepting,
}) {
  const veterinarian = {
    displayName,
    id,
    email,
    numCurrentRescues,
    numTotalRescues,
    image,
    isAccepting,
  };

  return (
    <SummaryCard
      directory="users"
      type="veterinarian"
      id={veterinarian.id}
      image={veterinarian.image}
      name={veterinarian.displayName}
      viewComponentDetailsUrl={`${veterinariansEndpoint}/${veterinarian.id}`}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{veterinarian.displayName}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {veterinarian.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Accepting Patients: {veterinarian.isAccepting ? "Yes" : "No"}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Current Rescues: {veterinarian.numCurrentRescues}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Total Rescues: {veterinarian.numTotalRescues}
      </Typography>
      <Grid item xs={12} container justify="center" />
    </SummaryCard>
  );
}

VeterinarianCard.propTypes = {
  displayName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  numCurrentRescues: PropTypes.number.isRequired,
  numTotalRescues: PropTypes.number.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isAccepting: PropTypes.bool.isRequired,
};

export default VeterinarianCard;
