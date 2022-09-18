import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth } from "../../../api/firebase";
import { defaultResetForm } from "./defaultFormValues";
import { StyledLogin } from "./Login.styled";

const ForgotPassword = () => {
  const [resetForm, setResetForm] = useState(defaultResetForm);
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setShowAlert(false);
    setResponseMessage("");
  };

  const updateResetForm = (e) => {
    setResetForm({
      ...resetForm,
      [e.target.name]: e.target.value,
    });
  };

  const resetPassword = (e) => {
    e.preventDefault();
    setResponseMessage(`Reset email sent to ${e.target.email.value}`);
    sendPasswordResetEmail(auth, e.target.email.value)
      .then(() => {
        setShowAlert(true);
      })
      .catch((e) => {
        setResponseMessage(e.code);
        setShowAlert(true);
      });

    setResetForm(defaultResetForm);
  };

  return (
    <StyledLogin>
      <h1>Reset your password</h1>

      <form onSubmit={resetPassword}>
        <TextField
          required
          value={resetForm.email}
          name="email"
          label="email"
          variant="filled"
          onChange={updateResetForm}
        />

        <Button type="submit" variant="contained">
          Reset password
        </Button>
      </form>

      <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        message={responseMessage}
      >
        <Alert severity="warning">{responseMessage}</Alert>
      </Snackbar>
    </StyledLogin>
  );
};

export default ForgotPassword;
