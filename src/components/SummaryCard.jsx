import React from "react";
import { Grid, Paper, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import "../styles.css";
import DisplayImage from "./DisplayImage";
import { viewDetailsLabel } from "../accessibility/accessibilityText";

export default function SummaryCard({
  children,
  type,
  id,
  image,
  name,
  viewComponentDetailsUrl,
  directory = "users",
}) {
  const history = useHistory();

  const onViewDetails = () => {
    history.push(`${viewComponentDetailsUrl}`);
  };

  return (
    <Paper elevation={2} className="summary-card">
      <DisplayImage
        type={type}
        directory={directory}
        id={id}
        image={image}
        name={name}
        width="15rem"
        height="18rem"
      />
      <Grid container direction="column">
        {children}
        <Grid item xs={12} container justifyContent="center">
          <Button
            className="summary-card-button"
            variant="contained"
            color="primary"
            size="small"
            onClick={onViewDetails}
          >
            {viewDetailsLabel}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

SummaryCard.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  viewComponentDetailsUrl: PropTypes.string.isRequired,
  directory: PropTypes.string.isRequired,
};
