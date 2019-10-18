import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute(props) {
  const token = window.localStorage.getItem("token");

  if (token) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
}

export default PrivateRoute;
