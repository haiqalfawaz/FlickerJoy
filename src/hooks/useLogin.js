import { useRouter } from "next/router";
import React, { useState } from "react";
import loginAPI from "@/services/login";
import { setCookie } from "cookies-next";

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
      const res = await loginAPI(formData);
      setCookie("token", res.data.token);
      router.push("/");
    } catch (error) {
      console.log("err", error);
    }
  };
  return { handleLogin, handleChange, formData, setFormData };
};

export default useLogin;
