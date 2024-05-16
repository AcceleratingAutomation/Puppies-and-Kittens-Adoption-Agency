import React from "react";
import { Grid, Container } from "@mui/material";
import PropTypes from "prop-types";
import { uuid } from "uuidv4";
import DisplayImage from "../DisplayImage";

function AdopterDetailsLayout({ adopter }) {
  const {
    id,
    email,
    username,
    name,
    type,
    isAdopting,
    numHouseholdPeople,
    numHouseholdPets,
    hasBackgroundCheck,
    hasApplication,
    bio,
    image,
  } = adopter;

  return (
    <Container maxWidth="lg" data-testid="adopter-details-layout">
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item xs={12} sm={4} style={{ textAlign: "center" }}>
          <DisplayImage
            directory="users"
            id={id}
            image={image}
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
              <strong>Adopting</strong>
            </Grid>
            <Grid item xs={6}>
              {isAdopting ? "Yes" : "No"}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <strong>Household People</strong>
            </Grid>
            <Grid item xs={6}>
              {numHouseholdPeople}
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
          <Grid container>
            <Grid item xs={6}>
              <strong>Has Application</strong>
            </Grid>
            <Grid item xs={6}>
              {hasApplication ? "Yes" : "No"}
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

AdopterDetailsLayout.propTypes = {
  adopter: PropTypes.shape({
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isAdopting: PropTypes.bool.isRequired,
    numHouseholdPeople: PropTypes.number.isRequired,
    numHouseholdPets: PropTypes.number.isRequired,
    hasBackgroundCheck: PropTypes.bool.isRequired,
    hasApplication: PropTypes.bool.isRequired,
    bio: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default AdopterDetailsLayout;
