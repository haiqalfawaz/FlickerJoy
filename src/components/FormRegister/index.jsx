import useRegister from "@/hooks/useRegister";
import Link from "next/link";
import React, { useState } from "react";

//Import Icons
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const FormRegister = () => {
  const { handleChange, handleRegistration, sucsess, formData, loading } =
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
    <div className="flex flex-col justify-start items-center  w-full lg:w-fit lg:h-full lg:px-[72px] px-[53px] lg:py-[90px] bg-anastasia-2 border rounded-3xl [box-shadow:5px_5px_black]">
      <h1 className="font-extrabold tracking-tight lg:text-6xl text-3xl lg:mb-8 mb-3">
        REGISTER
      </h1>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Name</p>
        <input
          type="text"
          placeholder="input name"
          name="name"
          onChange={handleChange}
          className="w-full sm:w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
        />
      </div>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Username</p>
        <input
          type="text"
          placeholder="input username"
          name="username"
          onChange={handleChange}
          className="w-full sm:w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
        />
      </div>
      <div className="text-center flex flex-col items-center gap-1 mb-2">
        <p className="font-bold text-xl">Email</p>
        <input
          type="email"
          placeholder="input email"
          name="email"
          onChange={handleChange}
          className="w-full sm:w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
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
            className="w-full sm:w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
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
            className="w-full sm:w-96 h-10 bg-anastasia-5 rounded-xl border border-black shadow-inner px-4"
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
          "REGISTER"
        )}
      </button>
      {sucsess && (
        <p className="text-2xl font-semibold text-black">{sucsess}</p>
      )}
      <p className="text-center md:text-xl text-base mb-2">
        Have any account?{" "}
        <Link href="/login" className="hover:underline">
          Login!
        </Link>
      </p>
    </div>
  );
};

export default FormRegister;
