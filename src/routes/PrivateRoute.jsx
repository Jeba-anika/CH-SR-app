import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("user"));
  console.log(isAuthenticated);
  return (
    <>
      {isAuthenticated?.authToken ? (
        <div>
          <Outlet />
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
};

export default PrivateRoute;
