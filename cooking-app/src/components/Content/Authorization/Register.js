import { Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { auth, db } from "../../../api/firebase";
import { defaultRegisterForm } from "./defaultFormValues";
import { StyledLogin } from "./Login.styled";

const Register = () => {
  const [registerForm, setRegisterForm] = useState(defaultRegisterForm);

  const updateRegisterForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const createNewUser = async (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      registerForm.email,
      registerForm.password
    )
      .then((jwt) => {
        setDoc(doc(db, "users", jwt.user.uid), {
          firstName: registerForm.firstName,
          lastName: registerForm.lastName,
          email: registerForm.email,
          role: "standard",
          uid: jwt.user.uid,
          favourites:[],
          avatarUrl: `https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${registerForm.firstName}+${registerForm.lastName}`,
        });
        e.target.reset();
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
    </StyledLogin>
  );
};

export default Register;
