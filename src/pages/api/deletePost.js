import axios from "axios";
import React from "react";

const deletePostAPI = async (req, res) => {
  const token = req.cookies.token || "";
  if (req.method === "DELETE") {
    try {
      const { postId } = req.query;
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const response = await axios.delete(`${apiURL}/delete-post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKEY: apiKEY ?? "",
        },
      });
      res.status(200).json(response.data);
    } catch (error) {
      console.error("Error Delete Post:", error);
      res.status(500).json({ error: "failed to delete post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
};

export default deletePostAPI;
