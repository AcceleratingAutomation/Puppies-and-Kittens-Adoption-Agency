import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { SummaryCard } from "../SummaryCard";

const AdopterCard = ({ displayName, id, email, householdPets, image, isAdopting }) => {
  const adopter = { displayName, id, email, householdPets, image, isAdopting };

  return (
    <SummaryCard type={"adopter"} image={adopter.image} name={adopter.displayName} viewComponentDetailsUrl={`/v1/adopter/${adopter.id}`} >
      <Grid item xs={12}>
        <Typography variant="h4">{adopter.displayName}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {adopter.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        New Adoption: {adopter.isAdopting ? "Yes" : "No"}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Pets: {adopter.householdPets}
      </Typography>
      <Grid item xs={12} container justify="center">
      </Grid>
    </SummaryCard>
  );
};

export default AdopterCard;