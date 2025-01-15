import axios from "axios";
import React from "react";

const fetchAPI = async (options) => {
  try {
    const res = await axios({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        "Content-Type": "application/json",
        apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
      ...options,
    });
    return res;
  } catch (error) {
    console.error("Error Fetching Data:", error);
    throw error;
  }
};

export default fetchAPI;
