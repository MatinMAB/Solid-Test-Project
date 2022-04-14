import React from 'react';
import { Routes, Route } from "react-router-dom";

//Import Components
import Register from "../views/Register"

const router = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register/>} />
      </Routes>
    </>
  );
};

export default router;