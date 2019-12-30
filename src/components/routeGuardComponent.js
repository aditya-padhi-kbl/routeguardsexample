import React from "react";
import { Redirect } from "react-router";

function RouteGuard(props) {
  let userRole = localStorage.getItem("userRole") || "viewer";
  if (props.allowedRoles.indexOf(userRole) > -1) {
    return props.render({ userRole: userRole });
  }
  return <Redirect to="/unauthorized" />;
}

export default RouteGuard;
