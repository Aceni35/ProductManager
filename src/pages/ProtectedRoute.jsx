import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import { io } from "socket.io-client";

const ProtectedRoute = () => {
  const token = localStorage.getItem("ProductManager:Token");

  if (token) {
    return <Outlet />;
  } else {
    return <LoginPage />;
  }
};

export default ProtectedRoute;
