import React from "react";
import { Routes, Route,  Navigate } from "react-router-dom";
import AddUser from "./pages/addUser";
import Profile from "./pages/profile";
import EditHistory from "./pages/editHistory";
import Navbar from "./components/navbar";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/history/:id" element={<EditHistory />} />
        <Route path="/*" element={<Navigate to={"/"} />} />
      </Routes>
    </>
  );
};
export default AppRoutes;
