import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebookF } from "react-icons/fa";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen md:w-1/2 lg:w-[45%] mx-auto px-3 w-full max-w-md bg-transparent sm:p-5 md:p-8 overflow-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Login as <span className="text-primary">Doctor</span>
      </h2>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm mb-1 text-white">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          className="w-full px-4 py-2 rounded-lg bg-[#F7FAFC] border border-[#CBD5E0] focus:outline-none focus:ring-2 focus:ring-green-600"
        />
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm mb-1 text-white">Password</label>
        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="@#*%"
            className="w-full px-4 py-2 rounded-lg bg-[#F7FAFC] border border-[#CBD5E0] focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      {/* Remember & Forgot */}
      <div className="flex justify-between items-center mb-4">
        <label className="flex items-center text-sm text-green-600">
          <input type="checkbox" className="mr-2" /> Remember me
        </label>
        <a href="#" className="text-sm text-green-600">
          Forgot Password?
        </a>
      </div>

      {/* Sign in Button */}
      <button className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
        Sign in
      </button>

      {/* Create Account */}
      <p className="text-center text-sm mt-4 text-[#718096]">
        Don’t have an account?{" "}
        <a href="#" className="text-green-600">
          Create now
        </a>
      </p>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-600" />
        <span className="px-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-600" />
      </div>

      {/* Google */}
      <button className="w-full flex items-center justify-between border border-gray-400 rounded-lg px-2  py-2 mb-3 text-[#67728A]  transition">
        <FaGoogle className="mr-2 text-red-500" /> <span>Continue with Google</span>
      </button>

      {/* Facebook */}
      <button className="w-full flex items-center justify-between border border-gray-400 rounded-lg px-2  py-2 text-[#67728A]  transition">
        <FaFacebookF className="mr-2 text-blue-500" /> Continue with Facebook
      </button>
    </div>
  );
}
