import React from "react";
import { Outlet } from "react-router";
import Navbar from "../pages/Navbar/Navbar";
import AppFooter from "../Components/Shared/Footer/AppFooter";

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
};

export default RootLayout;
