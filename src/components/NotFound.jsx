import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import { AppHeader } from "./header/AppHeader";
import PlaceholderRescueImages from "./PlaceholderRescueImages";
import { loginEndpoint, rescuesEndpoint } from "../server/apiService/apiConfig";
import { getToken } from "../utils/utils";

function NotFound() {
  const showHome = getToken();

  return (
    <div className="content">
      <AppHeader />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <h1>Page Not Found</h1>
          <h2>Oh, no! Someone is lost.</h2>
          {showHome ? (
            <h3>
              Let&apos;s go <Link to={rescuesEndpoint}>home</Link>.
            </h3>
          ) : (
            <h3>
              Let&apos;s go <Link to={loginEndpoint}>login</Link>
            </h3>
          )}
        </Grid>
        <PlaceholderRescueImages />
      </Grid>
    </div>
  );
}

export default NotFound;
