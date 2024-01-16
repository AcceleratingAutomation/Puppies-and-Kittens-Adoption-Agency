import React from 'react';
import { Grid } from '@material-ui/core';
import RescueImage from './RescueImage'; // Adjust the import path as needed

const Loading = () => (
  <div>
    <main aria-live="polite"><h3>Loading...</h3></main>
    <Grid container style={{ margin: '0 auto', maxWidth: '80%' }} justify="center">
      <Grid item xs={12} sm={4}>
        <RescueImage
          type={"dog"}
          image={0}
          name={"Playful Puppy"}
          width='15rem'
          height='15rem'
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <RescueImage
          type={"cat"}
          image={0}
          name={"Playful Kitten"}
          width='15rem'
          height='15rem'
        />
      </Grid>
    </Grid>
  </div>
);

export default Loading;