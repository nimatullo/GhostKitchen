import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function ProtectedRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!authenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
