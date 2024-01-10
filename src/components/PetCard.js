import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles({
  petCard: {
    width: '100%', // Full width on mobile devices
    maxWidth: '20rem',
    wordWrap: 'break-word',
    minHeight: '10rem', // Adjust as needed
  },
  muiButton: {
    width: '65%',
    margin: '0.625rem',
  },
});

export const PetCard = ({ pet, children }) => {
  const classes = useStyles();

  return (
    <Paper elevation={2} className={`Pet ${classes.petCard}`}>
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
        <Grid item xs={12} container justify="center">
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => console.log("Get details")}
          >
            VIEW DETAILS
          </Button>
        </Grid>
        {children}
      </Grid>
    </Paper>
  );
};