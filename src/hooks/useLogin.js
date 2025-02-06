import { useRouter } from "next/router";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import axios from "axios";

const useLogin = () => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(null);
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
    setloading(true);
    setError(null);
    try {
      const res = await axios.post("/api/authentication/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.message);
      setCookie("token", res.data.token);
      setSuccess("Login Successful!");
      router.push("/home");
    } catch (error) {
      setError("Email or Password Wrong");
      console.log("Login Failed", error.message);
    } finally {
      setloading(false);
    }
  };
  return {
    handleLogin,
    handleChange,
    formData,
    setFormData,
    loading,
    success,
    error,
  };
};

export default useLogin;
