import React from "react";
import useLogin from "@/hooks/useLogin";

const LoginPage = () => {
  const { handleLogin, handleChange } = useLogin();

  return (
    <div className="flex flex-col justify-center items-center gap-2 text-black">
      <input
        type="email"
        onChange={handleChange}
        placeholder="email"
        name="email"
      />
      <input
        type="password"
        onChange={handleChange}
        placeholder="password"
        name="password"
      />
      <button onClick={handleLogin} className="p-2 border bg-white">
        login
      </button>
    </div>
  );
};

export default LoginPage;
