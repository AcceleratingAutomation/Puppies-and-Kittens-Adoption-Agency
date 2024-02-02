import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import DisplayImage from "./DisplayImage";

const useStyles = makeStyles({
  summaryCard: {
    width: "100%", // Full width on mobile devices
    maxWidth: "20rem",
    wordWrap: "break-word",
    minHeight: "10rem",
  },
  muiButton: {
    width: "65%",
    margin: "0.625rem",
  },
});

export default function SummaryCard({
  children,
  type,
  id,
  name,
  viewComponentDetailsUrl,
}) {
  const classes = useStyles();
  const history = useHistory();

  const onViewDetails = () => {
    history.push(`${viewComponentDetailsUrl}`);
  };

  return (
    <Paper elevation={2} className={`Rescue ${classes.summaryCard}`}>
      <DisplayImage
        type={type}
        directory="rescues"
        id={id}
        name={name}
        width="15rem"
        height="18rem"
      />
      <Grid container direction="column">
        {children}
        <Grid item xs={12} container justify="center">
          <Button
            className={classes.muiButton}
            variant="contained"
            color="primary"
            size="small"
            onClick={onViewDetails}
          >
            VIEW DETAILS
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
  name: PropTypes.string.isRequired,
  viewComponentDetailsUrl: PropTypes.string.isRequired,
};
