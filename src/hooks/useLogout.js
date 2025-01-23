import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";

const useLogout = () => {
  const router = useRouter();

  const token = getCookie("token");

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/authentication/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
        },
      });
      console.log("Logout Successful:", res);
      deleteCookie(token);
      router.push("/login");
    } catch (error) {
      console.error("Logout Failed:", error.response?.data || error.message);
    }
  };
  return { handleLogout };
};

export default useLogout;
