import { Navigate } from "react-router-dom";
import React from "react";
import Forbidden from "./Forbidden";

function PrivateRoute({
  children,
  prop,
}: {
  children: React.ReactElement;
  prop: string;
}) {
  if (prop === "admin") {
    let isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") return children;
    else return <Forbidden />;
  } else {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken === null) {
      return <Navigate to="/login" />;
    }
    return children;
  }
}

export default PrivateRoute;
