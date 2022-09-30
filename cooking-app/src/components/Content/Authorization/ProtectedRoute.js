import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, redirect, children }) => {
  if (!isLoggedIn) {
    return <Navigate to={redirect} replace />;
  }

  return children;
};

export default ProtectedRoute;
