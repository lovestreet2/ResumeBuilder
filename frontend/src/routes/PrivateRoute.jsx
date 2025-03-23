import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const PrivateRoute = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loader until authentication is checked
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
