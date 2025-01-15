import React from "react";
import fetchAPI from "./api";

const registerAPI = async (registerData) => {
  const res = await fetchAPI({
    method: "POST",
    url: "/register",
    data: registerData,
  });
  return res;
};

export default registerAPI;
