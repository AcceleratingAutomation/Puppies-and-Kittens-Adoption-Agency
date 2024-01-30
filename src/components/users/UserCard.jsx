import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import '../../styles.css';
import PropTypes from 'prop-types';
import SummaryCard from '../SummaryCard';

function UserCard({
  username, id, role, favorite, image, email,
}) {
  const user = {
    username, id, role, favorite, image, email,
  };

  return (
    <SummaryCard
      type={user.role}
      image={user.image}
      name={user.username}
      viewComponentDetailsUrl={`/v1/user/${user.id}`}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{user.username}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {user.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {user.role}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Favorites:
        {' '}
        {user.favorite.length}
      </Typography>
      <Grid item xs={12} container justify="center" />
    </SummaryCard>
  );
}

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default UserCard;
