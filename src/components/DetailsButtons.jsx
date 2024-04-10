import React from "react";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import "../styles.css";
import ConfirmationDialog from "./ConfirmationDialog";

function DetailsButtons({
  type,
  onBack,
  onEdit,
  onDelete,
  openDialog,
  dispatch,
}) {
  const { name, id } = type;

  return (
    <>
      <Grid item xs={12} container justifyContent="center">
        <Button
          className="mui-button"
          variant="contained"
          color="primary"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          className="mui-button"
          variant="contained"
          color="primary"
          onClick={() => onEdit(id)}
        >
          Edit {name}
        </Button>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Button
          className="mui-button"
          variant="contained"
          color="error"
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
    </>
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
