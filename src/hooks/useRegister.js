import registerAPI from "@/services/register";
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
      const res = await registerAPI(formData);
      console.log(res.data);
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
