import React from "react";
import useRegister from "@/hooks/useRegister";

const RegisterPage = () => {
  const { handleChange, handleRegistration, setSucsess } = useRegister();

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-black">
      <input
        type="text"
        placeholder="input name"
        name="name"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="input username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="input email"
        name="email"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="input password"
        name="password"
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="repeat password"
        name="passwordRepeat"
        onChange={handleChange}
      />
      <button onClick={handleRegistration} className="p-2 border bg-white">
        register
      </button>
    </div>
  );
};

export default RegisterPage;
