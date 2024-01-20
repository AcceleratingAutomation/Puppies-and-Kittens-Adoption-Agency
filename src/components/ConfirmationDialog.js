import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  dialog: {
    border: '2px solid black',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    '&:hover': {
      backgroundColor: '#f00',
    },
  },
  cancelButton: {
    backgroundColor: '#3f51b5',
    color: 'white',
    '&:hover': {
      backgroundColor: '#00f',
    },
  },
  dialogTitle: {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
});

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
  const classes = useStyles();

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ className: classes.dialog }}>
      <DialogTitle className={classes.dialogTitle}>Are you sure you want to delete this rescue?</DialogTitle>
      <DialogContent>
        <Typography>This action cannot be undone.</Typography>
      </DialogContent>
      <DialogActions>
        <Button className={classes.cancelButton} onClick={onClose}>Cancel</Button>
        <Button className={classes.deleteButton} onClick={onConfirm}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;