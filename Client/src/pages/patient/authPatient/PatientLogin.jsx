import React from "react";
import LoginForm from "../../../components/login/LoginForm";
import LoginCover from "../../../components/login/LoginCover";

export default function PatientLogin() {
  return <div className="w-full h-screen overflow-auto md:flex">
    <LoginForm />
    <LoginCover />
  </div>;
}
