import React, { useState } from "react";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";

//Import Icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FormLogin = () => {
  const { handleLogin, handleChange, formData, loading, error, success } =
    useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isButtonDisabled = !formData.email || !formData.password;

  return (
    <div className="flex flex-col justify-start items-center h-auto w-full lg:w-fit lg:h-auto lg:px-[72px] px-[16px] lg:py-[90px] py-[20px] bg-anastasia-2 border rounded-3xl shadow-[5px_5px_0_black]">
      <h1 className="font-extrabold tracking-tight lg:text-8xl text-4xl lg:mb-20 mb-3">
        LOGIN
      </h1>

      {/* Email Field */}
      <div className="text-center flex flex-col items-center gap-2 lg:mb-7 mb-2">
        <p className="font-bold text-2xl">Email</p>
        <input
          type="email"
          onChange={handleChange}
          placeholder="email"
          name="email"
          className="w-full sm:w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
        />
      </div>

      {/* Password Field */}
      <div className="text-center flex flex-col items-center gap-2 lg:mb-7 mb-5">
        <p className="font-bold text-2xl">Password</p>
        <div className="relative w-full sm:w-96">
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            placeholder="password"
            name="password"
            className="w-full h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
          />
          <button
            className="absolute top-3 right-4"
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        className={`lg:w-full md:w-96 w-56 h-10 bg-anastasia-4 rounded-xl border border-black place-items-center text-anastasia-2 font-semibold text-2xl px-4 mb-10 ${
          isButtonDisabled
            ? "opacity-75"
            : "active:shadow-none active:translate-x-[3px] active:translate-y-[3px] shadow-[5px_5px_0px_black]"
        }`}
        disabled={isButtonDisabled}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin" />
        ) : (
          "LOGIN"
        )}
      </button>

      {success && (
        <p className="text-2xl font-semibold text-black">{success}</p>
      )}
      {error && <p className="text-2xl font-semibold text-red-600">{error}</p>}
      {/* Registration Link */}
      <p className="text-center ">
        Don't have an account?{" "}
        <Link href="/register" className="hover:underline">
          Register Here!
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;
