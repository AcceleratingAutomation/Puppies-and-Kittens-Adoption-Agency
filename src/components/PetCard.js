import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";

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
      <Button
        style={{ margin: '0.625rem' }}
        variant="contained"
        color="primary"
        size="small"
        onClick={() => console.log("Get details")}
        >
        SHOW DETAILS
        </Button>
      {children}
    </Grid>
  </Paper>
);