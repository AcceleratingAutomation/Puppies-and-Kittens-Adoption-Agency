import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

export const PetCard = ({ pet, children }) => (
  <Paper elevation={2} className="Pet">
    <Grid container direction="column">
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
      {children}
    </Grid>
  </Paper>
);