import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";
import "../styles.css";

function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: "dialog" }}>
      <DialogTitle className="dialogTitle">
        Are you sure you want to delete?
      </DialogTitle>
      <DialogContent>
        <Typography>This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          className="cancelButton"
          variant="contained"
          color="primary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="deleteButton"
          variant="contained"
          color="error"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
