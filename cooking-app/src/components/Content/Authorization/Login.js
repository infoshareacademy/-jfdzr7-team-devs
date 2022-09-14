import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { StyledLogin } from "./Login.styled";
import { auth } from "../../../api/firebase";
import { NavLink } from "react-router-dom";

export const Login = () => {
  const defaultLoginForm = {
    email: "",
    password: "",
  };

  const [loginForm, setLoginForm] = useState(defaultLoginForm);
  const [showAlert, setShowAlert] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleOpen = () => {
    setShowAlert(true);
  };

  const handleClose = (event, reason) => {
    if (reason == "clickaway") {
      return;
    }

    setShowAlert(false);
    setResponseMessage("");
  };

  const updateLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((jwt) => {
        console.log(jwt);
      })
      .catch((e) => {
        setResponseMessage(e.code);
        setShowAlert(true);
        console.dir(e);
      });
    setLoginForm(defaultLoginForm);
  };

  return (
    <StyledLogin>
      <h1>Log in</h1>

      <form onSubmit={loginUser}>
        <TextField
          required
          value={loginForm.email}
          name="email"
          label="email"
          variant="filled"
          onChange={updateLoginForm}
        />

        <TextField
          required
          value={loginForm.password}
          name="password"
          label="password"
          type="password"
          variant="filled"
          onChange={updateLoginForm}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>

        <p>
          Don't have an account?
          <NavLink to="/register"> Register</NavLink>
        </p>
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
