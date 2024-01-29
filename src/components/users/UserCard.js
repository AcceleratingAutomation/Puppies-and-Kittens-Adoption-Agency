import React from "react";
import { Grid, Typography } from "@material-ui/core";
import "../../styles.css";
import { SummaryCard } from "../SummaryCard";

const UserCard = ({ username, id, role, favorite, image, email }) => {
  const user = { username, id, role, favorite, image, email };

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
        Favorites: {user.favorite.length}
      </Typography>
      <Grid item xs={12} container justify="center"></Grid>
    </SummaryCard>
  );
};

export default UserCard;
