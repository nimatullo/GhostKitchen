import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { GlobalContext } from "./contexts/GlobalContext";
export default function ProtectedRoute({ component: Component, ...rest }) {
  const { auth } = useContext(GlobalContext);
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}
