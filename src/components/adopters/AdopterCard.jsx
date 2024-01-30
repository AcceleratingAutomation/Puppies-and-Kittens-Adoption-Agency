import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import '../../styles.css';
import PropTypes from 'prop-types';
import SummaryCard from '../SummaryCard';

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
      type="adopter"
      image={adopter.image}
      name={adopter.displayName}
      viewComponentDetailsUrl={`/v1/adopter/${adopter.id}`}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{adopter.displayName}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {adopter.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Currently Looking:
        {' '}
        {adopter.isAdopting ? 'Yes' : 'No'}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Current Pets:
        {' '}
        {adopter.numHouseholdPets}
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
  image: PropTypes.string.isRequired,
  isAdopting: PropTypes.bool.isRequired,
};

export default AdopterCard;
