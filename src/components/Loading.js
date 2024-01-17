import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <main aria-live="polite">
      <h1>Loading...</h1>
      <CircularProgress />
    </main>
  </div>
);

export default Loading;