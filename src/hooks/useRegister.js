import registerAPI from "@/services/register";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";

const useRegister = () => {
  const router = useRouter();
  const [sucsess, setSucsess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // console.log(formData);
  };

  const handleRegistration = async () => {
    try {
      const res = await axios.post("api/authentication/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.message);
      router.push("/login");
    } catch (error) {
      console.log("err", error);
    }
  };

  return {
    handleChange,
    handleRegistration,
    formData,
    setFormData,
    setSucsess,
  };
};

export default useRegister;
