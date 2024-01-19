import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { SummaryCard } from "../SummaryCard";

const FosterCard = ({ displayName, id, email, numCurrentRescues, numTotalRescues, image, isAccepting }) => {
  const foster = { displayName, id, email, numCurrentRescues, numTotalRescues, image, isAccepting };

  return (
    <SummaryCard type={"foster"} image={foster.image} name={foster.displayName} viewComponentDetailsUrl={`/v1/foster/${foster.id}`} >
      <Grid item xs={12}>
        <Typography variant="h4">{foster.displayName}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {foster.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Accepting Rescues: {foster.isAccepting ? "Yes" : "No"}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Current Rescues: {foster.numCurrentRescues}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Total Rescues: {foster.numTotalRescues}
      </Typography>
      <Grid item xs={12} container justify="center">
      </Grid>
    </SummaryCard>
  );
};

export default FosterCard;