import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Home, Heart, Calendar, FileText, MessageCircle } from "lucide-react";
import Logo from "../logo/Logo";

const patientLinks = [
  { title: "Home", path: "/", icon: <Home size={18} /> },
  { title: "Symptom Checker", path: "/symptom-checker", icon: <Heart size={18} /> },
  { title: "Appointments", path: "/appointments", icon: <Calendar size={18} /> },
  { title: "Prescriptions", path: "/prescriptions", icon: <FileText size={18} /> },
  { title: "Messages", path: "/messages", icon: <MessageCircle size={18} /> },
];

export default function PatientNavbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 left-0 z-50 bg-white/70
      dark:bg-gradient-to-r dark:from-[#182c43] dark:to-[#175353]
      backdrop-blur-sm shadow-md px-6 py-3"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        <Logo />

        <ul className="hidden md:flex items-center space-x-2 text-gray-700 dark:text-gray-200 font-medium">
          {patientLinks?.map((link) => (
            <li key={link?.title}>
              <Link
                to={link?.path ?? "/"}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-all duration-300
        ${location?.pathname === link?.path
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
                    : "hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"}`}
              >
                <span className="md:hidden lg:flex">{link?.icon}</span>
                <span>{link?.title}</span>
              </Link>
            </li>
          ))}

        </ul>


        <div className="flex items-center space-x-3">
          <span className="hidden lg:block text-gray-600 dark:text-blue-50 text-sm font-semibold">Hi, Nitin</span>
          <Avatar
            alt="User Avatar"
            src="/avatar.png"
            className="cursor-pointer ring-2 ring-green-400"
            sx={{ width: 40, height: 40 }}
          />
        </div>
      </div>
    </nav>
  );
}
