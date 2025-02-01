import axios from "axios";
import React, { useState } from "react";
import { getCookies } from "cookies-next";

const useLike = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async (postId) => {
    if (isLoading) return;

    const token = getCookies().token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    setIsLoading(true);

    try {
      await axios.post("/api/like", { postId });

      const response = await axios.get(`${apiURL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      setIsLiked(response.data.data.isLike);
      setTotalLikes(response.data.data.totalLikes);
      setError(null);
    } catch (error) {
      setError("Failed to like post");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLiked,
    totalLikes,
    error,
    handleLike,
    isLoading,
    setIsLiked,
    setTotalLikes,
  };
};

export default useLike;
