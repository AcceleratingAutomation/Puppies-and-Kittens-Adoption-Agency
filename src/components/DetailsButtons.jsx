import React from "react";
import { Button, Grid } from "@mui/material";
import PropTypes from "prop-types";
import "../styles.css";
import ConfirmationDialog from "./ConfirmationDialog";
import {
  backLabel,
  deleteLabel,
  editLabel,
} from "../accessibility/accessibilityText";

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
    <main data-testid="details-buttons">
      <Grid item xs={12} container justifyContent="center">
        <Button
          className="mui-button"
          variant="contained"
          color="primary"
          onClick={onBack}
        >
          {backLabel}
        </Button>
        <Button
          className="mui-button"
          variant="contained"
          color="primary"
          onClick={() => onEdit(id)}
        >
          {editLabel} {name}
        </Button>
      </Grid>
      <Grid item xs={12} container justifyContent="center">
        <Button
          className="mui-button"
          variant="contained"
          color="error"
          onClick={() => dispatch({ type: "openDialog" })}
        >
          {deleteLabel} {name}
        </Button>
        <ConfirmationDialog
          open={openDialog}
          onClose={() => dispatch({ type: "closeDialog" })}
          onConfirm={() => onDelete(id)}
        />
      </Grid>
    </main>
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
