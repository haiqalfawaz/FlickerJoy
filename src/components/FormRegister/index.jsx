import useRegister from "@/hooks/useRegister";
import Link from "next/link";
import React, { useState } from "react";

//Import Icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

const FormRegister = () => {
  const { handleChange, handleRegistration, setSucsess, formData } =
    useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const isButtonDisabled =
    !formData.name ||
    !formData.username ||
    !formData.email ||
    !formData.password ||
    !formData.passwordRepeat;

  return (
    <div className="flex flex-col justify-start items-center h-[340px] w-full lg:w-fit lg:h-full lg:px-[72px] px-[53px] lg:py-[90px] bg-anastasia-2 border rounded-3xl [box-shadow:5px_5px_black]">
      <h1 className="font-bold text-6xl mb-10">REGISTER</h1>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Name</p>
        <input
          type="text"
          placeholder="input name"
          name="name"
          onChange={handleChange}
          className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
        />
      </div>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Username</p>
        <input
          type="text"
          placeholder="input username"
          name="username"
          onChange={handleChange}
          className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
        />
      </div>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Email</p>
        <input
          type="email"
          placeholder="input email"
          name="email"
          onChange={handleChange}
          className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
        />
      </div>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Password</p>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="input password"
            name="password"
            onChange={handleChange}
            className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
          />
          <button
            className="absolute top-3 right-4"
            onClick={toggleShowPassword}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>
      <div className="text-center flex flex-col items-center gap-1 mb-7">
        <p className="font-bold text-xl">Repeat Password</p>
        <div className="relative">
          <input
            type={showRepeatPassword ? "text" : "password"}
            placeholder="repeat password"
            name="passwordRepeat"
            onChange={handleChange}
            className="w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-2"
          />
          <button
            className="absolute top-3 right-4"
            onClick={toggleShowRepeatPassword}
          >
            {showRepeatPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      </div>

      <button
        onClick={handleRegistration}
        className={`w-96 h-10 bg-anastasia-4 rounded-xl border border-black [box-shadow:5px_5px_black] text-anastasia-2 font-semibold text-2xl px-4 mb-10 ${
          isButtonDisabled
            ? "opacity-75"
            : "opacity-100 active:[box-shadow:0px_0px_black] "
        }`}
        disabled={isButtonDisabled}
      >
        REGISTER
      </button>
      <p>
        Have any account?{" "}
        <Link href="/login" className="hover:underline">
          Login!
        </Link>
      </p>
    </div>
  );
};

export default FormRegister;
