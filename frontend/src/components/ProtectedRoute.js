import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, component }) => {
  return (
    <Route>{loggedIn ? component : <Redirect to="/sign-in" />}</Route>
  );
};

export default ProtectedRoute;
