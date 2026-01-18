import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { auth } = useAuth();
  console.log(auth);
  //   const isAuthenticated = JSON.parse(localStorage.getItem("user"));
  //   console.log(isAuthenticated);
  return (
    <>
      {auth ? (
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
