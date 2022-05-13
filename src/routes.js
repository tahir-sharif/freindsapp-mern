import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// Layout with navbar
import MainLayout from "./layouts/MainLayout";
// Authentication
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
// Home Page
import HomePage from "./pages/home/HomePage";
// users profile
import UsersProfile from "./pages/profileView/UsersProfile";
// Settings
import Settings from "./pages/settings/Settings";

const MRoutes = () => {
  const {isLoggedIn} = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="freindsapp-mern/login" element={<Login />} />
        <Route path="freindsapp-mern/register" element={<Register />} />
        <Route
          path="/freindsapp-mern"
          element={isLoggedIn ? <MainLayout /> : <Navigate to={"/freindsapp-mern/login"} />}
        >
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="user">
            <Route path=":_id" element={<UsersProfile />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>404 not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default MRoutes;
