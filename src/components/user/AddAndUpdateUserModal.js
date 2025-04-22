import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Typography, Button } from "@mui/material";

const AddAndUpdateUserModal = ({
  openModal,
  handleClose,
  saveUser,
  userData,
  mode,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    if (mode === "update" && userData) {
      setFirstName(userData.firstName);
      setLastName(userData.lastName);
      setEmail(userData.email);
      setAge(userData.age);
    }
  }, [mode, userData]);

  const handleSave = (e) => {
    e.preventDefault();
    const userData = { firstName, lastName, email, age };
    saveUser(userData);
  };
  useEffect(() => {
    if (mode === "add") {
      setFirstName("");
      setLastName("");
      setAge("");
      setEmail("");
    }
  }, [mode]);
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="box">
        <form onSubmit={handleSave} className="flex-row-container">
          <Typography className="modal-modal-title" variant="h6" component="h2">
            {mode === "add" ? "Add A New User" : "Update User Information"}
          </Typography>

          <div className="input-box">
            <TextField
              required
              fullWidth
              label="FirstName"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <TextField
              required
              fullWidth
              label="LastName"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="input-box">
            <TextField
              required
              fullWidth
              type="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <TextField
              required
              fullWidth
              type="number"
              label="Age"
              variant="outlined"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="modal-btn">
            <Button variant="contained" type="submit">
              {mode === "add" ? "Save" : "Update"}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AddAndUpdateUserModal;
