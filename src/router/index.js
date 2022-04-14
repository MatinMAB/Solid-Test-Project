import React from 'react';
import { Routes, Route , Navigate } from "react-router-dom";
import Activate from '../views/Activate';

//Import Components
import Register from "../views/Register"

const router = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/activate" element={<Activate/>} />
        <Route path="/" element={<Navigate to="/register"/>} />
      </Routes>
    </>
  );
};

export default router;