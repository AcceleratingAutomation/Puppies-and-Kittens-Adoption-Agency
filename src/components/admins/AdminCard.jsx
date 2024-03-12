import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import PropTypes from "prop-types";
import SummaryCard from "../SummaryCard";
import { adminsEndpoint } from "../../server/apiService/apiConfig";

function AdminCard({ username, id, role, favorite, image, email }) {
  const admin = {
    username,
    id,
    role,
    favorite,
    image,
    email,
  };

  return (
    <SummaryCard
      directory="users"
      type={admin.role}
      id={admin.id}
      image={admin.image}
      name={admin.username}
      viewComponentDetailsUrl={`${adminsEndpoint}/${admin.id}`}
    >
      <Grid item xs={12}>
        <Typography variant="h4">{admin.username}</Typography>
      </Grid>
      <Typography variant="h5" gutterBottom>
        {admin.email}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {admin.role}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Favorites: {admin.favorite.length}
      </Typography>
      <Grid item xs={12} container justify="center" />
    </SummaryCard>
  );
}

AdminCard.propTypes = {
  username: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  email: PropTypes.string.isRequired,
};

export default AdminCard;
