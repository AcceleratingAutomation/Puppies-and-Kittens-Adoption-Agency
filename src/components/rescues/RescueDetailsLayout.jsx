import React from "react";
import { Grid, Container } from "@mui/material";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import DisplayImage from "../DisplayImage";

function RescueDetailsLayout({ rescue }) {
  const {
    name,
    type,
    gender,
    breed,
    hasFoster,
    hasVet,
    isSterilized,
    isVaccinated,
    isAdoptable,
    id,
    bio,
  } = rescue;

  return (
    <Container maxWidth="lg" data-testid="rescue-details-layout">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
          <DisplayImage
            directory={type.toLowerCase()}
            id={id}
            image={rescue.image}
            name={name}
            width="12rem"
            height="12rem"
          />
        </Grid>
        <Grid item xs={12} sm={4} style={{ textAlign: "left" }}>
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
              <strong>Gender</strong>
            </Grid>
            <Grid item xs={6}>
              {gender}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Breed</strong>
            </Grid>
            <Grid item xs={6}>
              {breed}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Foster</strong>
            </Grid>
            <Grid item xs={6}>
              {hasFoster ? "Yes" : "No"}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Veterinarian</strong>
            </Grid>
            <Grid item xs={6}>
              {hasVet ? "Yes" : "No"}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>{gender === "Female" ? "Spayed" : "Neutered"}</strong>
            </Grid>
            <Grid item xs={6}>
              {isSterilized ? "Yes" : "No"}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Vaccinated</strong>
            </Grid>
            <Grid item xs={6}>
              {isVaccinated ? "Yes" : "No"}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Ready To Adopt</strong>
            </Grid>
            <Grid item xs={6}>
              {isAdoptable ? "Yes" : "No"}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
          <p>
            {bio.split("\n").map((line) => (
              <React.Fragment key={uuid()}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Grid>
      </Grid>
    </Container>
  );
}

RescueDetailsLayout.propTypes = {
  rescue: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    breed: PropTypes.string.isRequired,
    hasFoster: PropTypes.bool.isRequired,
    hasVet: PropTypes.bool.isRequired,
    isSterilized: PropTypes.bool.isRequired,
    isVaccinated: PropTypes.bool.isRequired,
    isAdoptable: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    bio: PropTypes.string.isRequired,
  }).isRequired,
};

export default RescueDetailsLayout;
