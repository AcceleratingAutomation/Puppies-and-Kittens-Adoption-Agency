import React from "react";
import { Grid, Container } from "@mui/material";
import PropTypes from "prop-types";
import DisplayImage from "../DisplayImage";

function VeterinarianDetailsLayout({ veterinarian }) {
  const {
    id,
    email,
    username,
    name,
    type,
    isAccepting,
    numCurrentRescues,
    numTotalRescues,
    numHouseholdPets,
    hasBackgroundCheck,
    bio,
    image,
  } = veterinarian;

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={12} sm={4} md={3} style={{ textAlign: "center" }}>
          <Grid container>
            <Grid item xs={6}>
              <strong>Type</strong>
            </Grid>
            <Grid item xs={6}>
              {type}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Username</strong>
            </Grid>
            <Grid item xs={6}>
              {username}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Email</strong>
            </Grid>
            <Grid item xs={6}>
              {email}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Accepting</strong>
            </Grid>
            <Grid item xs={6}>
              {isAccepting ? "Yes" : "No"}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Current Rescues</strong>
            </Grid>
            <Grid item xs={6}>
              {numCurrentRescues}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Total Rescues</strong>
            </Grid>
            <Grid item xs={6}>
              {numTotalRescues}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Household Pets</strong>
            </Grid>
            <Grid item xs={6}>
              {numHouseholdPets}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Background Check</strong>
            </Grid>
            <Grid item xs={6}>
              {hasBackgroundCheck ? "Yes" : "No"}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={4} md={3} style={{ textAlign: "center" }}>
          <DisplayImage
            directory="users"
            id={id}
            image={image}
            name={name}
            width="15rem"
            height="18rem"
          />
        </Grid>
        <Grid item xs={12} sm={8} md={3} style={{ textAlign: "left" }}>
          <p>{bio}</p>
        </Grid>
      </Grid>
    </Container>
  );
}

VeterinarianDetailsLayout.propTypes = {
  veterinarian: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isAccepting: PropTypes.bool.isRequired,
    numCurrentRescues: PropTypes.number.isRequired,
    numTotalRescues: PropTypes.number.isRequired,
    numHouseholdPets: PropTypes.number.isRequired,
    hasBackgroundCheck: PropTypes.bool.isRequired,
    bio: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default VeterinarianDetailsLayout;
