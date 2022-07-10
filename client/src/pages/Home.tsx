import { Navigate } from "react-router-dom";
import Login from "./Login";
import Room from "./Room";

export default function Home() {
  const isAuthenticated = localStorage.getItem("id") ? true : false;

  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}
