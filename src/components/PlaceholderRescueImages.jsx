import React from "react";
import Grid from "@mui/material/Grid";
import DisplayImage from "./DisplayImage";

function PlaceholderRescueImages() {
  return (
    <Grid
      container
      style={{ margin: "0 auto", maxWidth: "80%" }}
      justifyContent="center"
    >
      <Grid item xs={12} sm={4}>
        <DisplayImage
          directory="dog"
          image="placeholder-puppy"
          name="Playful Puppy"
          width="15rem"
          height="15rem"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <DisplayImage
          directory="cat"
          image="placeholder-kitten"
          name="Playful Kitten"
          width="15rem"
          height="15rem"
        />
      </Grid>
    </Grid>
  );
}

export default PlaceholderRescueImages;
