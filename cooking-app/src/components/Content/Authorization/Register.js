import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { auth, db, usersCollection } from "../../../api/firebase";
import { StyledLogin } from "./Login.styled";

const Register = () => {
  const defaultRegisterForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const [registerForm, setRegisterForm] = useState(defaultRegisterForm);

  const usersCollection = collection(db, "users");

  const updateRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const createNewUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    )
      .then((jwt) => {
        setDoc(doc(db, "users", jwt.user.uid), {
          ...registerForm,
          role: "standard",
          uid: jwt.user.uid,
        });
        e.target.reset();
        console.log(jwt.user.uid);
      })
      .catch((e) => {
        console.log(e.code);
      });
  };

  return (
    <StyledLogin>
      <h1>Register</h1>

      <form onSubmit={createNewUser}>
        <TextField
          required
          value={registerForm.firstName}
          name="firstName"
          label="first name"
          variant="filled"
          onChange={updateRegisterForm}
        />

        <TextField
          required
          value={registerForm.lastName}
          name="lastName"
          label="last name"
          variant="filled"
          onChange={updateRegisterForm}
        />

        <TextField
          required
          value={registerForm.email}
          name="email"
          label="email"
          variant="filled"
          onChange={updateRegisterForm}
        />

        <TextField
          required
          value={registerForm.password}
          name="password"
          label="password"
          type="password"
          variant="filled"
          onChange={updateRegisterForm}
        />

        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>

      {/* <Snackbar
        open={showAlert}
        autoHideDuration={2000}
        onClose={handleClose}
        message={responseMessage}
      >
        <Alert severity="warning">{responseMessage}</Alert>
      </Snackbar> */}
    </StyledLogin>
  );
};

export default Register;
