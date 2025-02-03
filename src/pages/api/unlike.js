import React from "react";
import axios from "axios";

const unlikeAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "POST") {
    try {
      const { postId } = req.body;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.post(
        `
        ${apiUrl}/unlike`,
        {
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error ulike post:", error);
      res.status(500).json({ error: "failed to unlike post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default unlikeAPI;
