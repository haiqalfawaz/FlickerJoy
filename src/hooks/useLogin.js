import { useRouter } from "next/router";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import axios from "axios";

const useLogin = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/authentication/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.message);
      setCookie("token", res.data.token);
      router.push("/home");
    } catch (error) {
      console.log("Login Failed", error.message);
    }
  };
  return { handleLogin, handleChange, formData, setFormData };
};

export default useLogin;
