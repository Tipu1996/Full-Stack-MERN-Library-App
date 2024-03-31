import { Navigate } from "react-router-dom";
import React from "react";
import Forbidden from "./Forbidden";
import ResetPassword from "./Login/ResetPassword";

function PrivateRoute({
  children,
  prop,
}: {
  children: React.ReactNode;
  prop: string;
}) {
  if (prop === "admin") {
    let signedIn = localStorage.getItem("signedIn");
    let isAdmin = localStorage.getItem("isAdmin");
    if (signedIn === "true") {
      if (isAdmin === "true")
        return <React.Fragment>{children}</React.Fragment>;
      else if (signedIn === "true")
        return (
          <React.Fragment>
            <Forbidden />
          </React.Fragment>
        );
    }
  } else if (prop === "verify") {
    let verify = localStorage.getItem("verify");
    if (verify === null) {
      return (
        <React.Fragment>
          <Navigate to="/login" />
        </React.Fragment>
      );
    } else return <React.Fragment>{children}</React.Fragment>;
  } else if (prop === "resetPW") {
    let reset = localStorage.getItem("resetPW");
    if (reset !== null) {
      return (
        <React.Fragment>
          <ResetPassword />
        </React.Fragment>
      );
    }
  } else {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken === null) {
      return (
        <React.Fragment>
          <Navigate to="/login" />
        </React.Fragment>
      );
    }
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <React.Fragment>
      <Navigate to="/login" />
    </React.Fragment>
  );
}

export default PrivateRoute;
