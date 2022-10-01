import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import React from "react";
import Forbidden from "./Forbidden";
// import { RootState } from "redux/store";

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
  } else if (prop === "table") {
    let jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken === null) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return children;
}

export default PrivateRoute;
