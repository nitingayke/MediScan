import React from "react";
import photo from "../../../../Assets/coverImg.png"
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export default function LoginCover() {
  return (
    <div className="bg-[#1A8151] w-1/2 lg:w-[55%] flex flex-wrap gap-y-5 overflow-auto p-9">

      <p className="text-white w-full text-center"><SupportAgentIcon /> <span className="font-medium">Support</span></p>

      {/* <div className="absolute -top-50 -right-50 bg-gradient-to-r from-[#EDF2F730] to-[#EDF2F70] rounded-full md:size-120 lg:size-150"></div> */}

      <div className="w-[80%] h-fit py-6 rounded-2xl overflow-hidden bg-white space-y-3 ps-10 z-50 relative">
        {/* <img src={photo} alt="coverimage" className="hidden lg:block absolute top-6 right-0" />
        <h1 className="text-[#1A8151] font-bold text-3xl w-3/4">Welcome back <br />to  HealthAI</h1>
        <h5 className="w-70 lg:w-80 text-[#718096] ">Sign in to access AI-powered symptom checks, real-time doctor consults, and your complete health history.</h5>
        <button className="bg-[#1A8151] h-10 w-40 rounded-3xl text-white">Learn more</button> */}
      </div>

      <div className="items-center w-full">
        <h1 className=" text-white text-3xl font-semibold md:text-center">Create your HealthAI Account</h1>
        <h3 className="text-[#CFD9E0] px-4 mt-3 text-center">Join our intelligent care platform. Whether you're a patient or a doctor, HealthAI simplifies your healthcare experience.</h3>
      </div>

    </div>
  );
}
