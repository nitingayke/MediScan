import React from "react";
import { Route, Routes } from "react-router-dom";
import NotFound from "../components/notFound/NotFound";
import PatientLayout from "../layouts/PatientLayout";
import Login from "../pages/login/Login";
import PatientSignup from "../pages/signup/patient/PatientSignup";

export default function Routers() {
  return (
    <Routes>
      
      <Route path="/:role/login" element={<Login />} />
      <Route path="/patient/signup" element={<PatientSignup />} />

      <Route path="*" element={<PatientLayout><NotFound /></PatientLayout>} />
    </Routes>
  );
}
