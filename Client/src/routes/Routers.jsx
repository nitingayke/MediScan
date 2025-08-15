import React from "react";
import { Route, Routes } from "react-router-dom";
import PatientLogin from "../pages/patient/authPatient/PatientLogin";

export default function Routers() {
  return (
    <Routes>
      <Route path="/patient/login" element={<PatientLogin />} />
    </Routes>
  );
}
