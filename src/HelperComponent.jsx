import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CheckType } from "./features/auth/authActions.js";

export const HelperComponent = ({
  path,
  component: Component,
  render,
  requiredRole,
  ...rest
}) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (CheckType()) {
          return Component ? <Component {...props} /> : render(props);
        } else {
          return <Redirect to="/error" />;
        }
      }}
    />
  );
};

export default HelperComponent;
