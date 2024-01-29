import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmationDialog from "./ConfirmationDialog";

const useStyles = makeStyles({
  muiButton: {
    margin: "0.625rem",
  },
});

const DetailsButtons = ({
  rescue,
  onBack,
  onEdit,
  onDelete,
  openDialog,
  dispatch,
}) => {
  const { name, id } = rescue;
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
};

export default DetailsButtons;
