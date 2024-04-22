import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <main aria-live="polite" data-testid="loading">
        <h1>Loading...</h1>
        <CircularProgress />
      </main>
    </div>
  );
}

export default Loading;
