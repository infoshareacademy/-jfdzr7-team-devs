import React from "react";
import { Navigate } from "react-router-dom";

const Redirect = ({ isLoggedIn, redirect, children }) => {
  if (!isLoggedIn) {
    return children;
  }
  return <Navigate to={redirect} replace />;
};

export default Redirect;
