import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute(props) {
  return localStorage.token ? props.children : <Navigate to="/login" />;
}

export default PrivateRoute;