import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  children,
}: React.PropsWithChildren<{}>) {
  const isAuthenticated = localStorage.getItem("id") ? true : false;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}
