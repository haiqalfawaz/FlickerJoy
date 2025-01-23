import React, { useState } from "react";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";

//Import Icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const FormLogin = () => {
  const { handleLogin, handleChange, formData } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const isButtonDisabled = !formData.email || !formData.password;

  return (
    <div className="flex flex-col justify-start items-center h-[340px] w-full lg:w-fit lg:h-full lg:px-[72px] px-[53px] lg:py-[90px] bg-anastasia-2 border rounded-3xl [box-shadow:5px_5px_black]">
      <h1 className="font-bold text-8xl mb-20">LOGIN</h1>
      <div className="text-center flex flex-col items-center gap-2 mb-7">
        <p className="font-bold text-2xl">Email</p>
        <input
          type="email"
          onChange={handleChange}
          placeholder="email"
          name="email"
          className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
        />
      </div>
      <div className="text-center flex flex-col items-center gap-2 mb-20">
        <p className="font-bold text-2xl">Password</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            placeholder="password"
            name="password"
            className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
          />
          <button
            className="absolute top-3 right-4"
            onClick={handleShowPassword}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>
      <button
        onClick={handleLogin}
        className={`w-96 h-10 bg-anastasia-4 rounded-xl border border-black [box-shadow:5px_5px_black]  text-anastasia-2 font-semibold text-2xl px-4 mb-10 ${
          isButtonDisabled
            ? "opacity-75"
            : "opacity-100 active:[box-shadow:0px_0px_black]"
        }`}
        disabled={isButtonDisabled}
      >
        LOGIN
      </button>
      <p>
        Don't have any account?{" "}
        <Link href="/register" className="hover:underline">
          Register Here!
        </Link>
      </p>
    </div>
  );
};

export default FormLogin;
