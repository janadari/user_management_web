import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationModal = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialogTitle-root": {
          backgroundColor: "#f0f0f0",
          fontWeight: "bold",
        },
        "& .MuiDialogContent-root": {
          padding: "24px",
        },
        "& .MuiDialogActions-root": {
          display: "flex",
          justifyContent: "flex-end",
          padding: "12px",
        },
        "& .MuiButton-root": {
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
