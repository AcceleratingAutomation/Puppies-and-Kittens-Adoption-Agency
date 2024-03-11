import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import ConfirmationDialog from "./ConfirmationDialog";

const useStyles = makeStyles({
  muiButton: {
    margin: "0.625rem",
  },
});

function DetailsButtons({
  type,
  onBack,
  onEdit,
  onDelete,
  openDialog,
  dispatch,
}) {
  const { name, id } = type;
  const classes = useStyles();

  return (
    <Grid item xs={12} container justify="center">
      <Button
        className={classes.muiButton}
        variant="contained"
        color="primary"
        onClick={onBack}
      >
        Back
      </Button>
      <Button
        className={classes.muiButton}
        variant="contained"
        color="primary"
        onClick={() => onEdit(id)}
      >
        Edit {name}
      </Button>
      <Button
        className={classes.muiButton}
        variant="contained"
        color="secondary"
        onClick={() => dispatch({ type: "openDialog" })}
      >
        DELETE {name}
      </Button>
      <ConfirmationDialog
        open={openDialog}
        onClose={() => dispatch({ type: "closeDialog" })}
        onConfirm={() => onDelete(id)}
      />
    </Grid>
  );
}

DetailsButtons.propTypes = {
  type: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  openDialog: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default DetailsButtons;
