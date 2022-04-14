import React from "react";

//Import Routes
import { Routes, Route, Navigate } from "react-router-dom";

//Import Components
import Register from "../views/Register";
import Activate from "../views/Activate";
import Login from "../views/Login";
import Profile from "../views/Profile";

const router = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/activate" element={<Activate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/*" element={<Profile/>} />
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </>
  );
};

export default router;
