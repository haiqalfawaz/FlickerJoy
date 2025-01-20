import axios from "axios";
import React from "react";

const registerAPI = async (req, res) => {
  try {
    const { name, username, email, password, passwordRepeat } = req.body;

    if (!name || !username || !email || !password || !passwordRepeat) {
      return res.status(400).json({ message: "Harap Isi" });
    }

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      { name, username, email, password, passwordRepeat },
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
        },
      }
    );
    return res.status(200).json(data);
  } catch (error) {
    console.error("error", error.message);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default registerAPI;
