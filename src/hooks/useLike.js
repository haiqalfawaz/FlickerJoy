import axios from "axios";
import React, { useState } from "react";

const useLike = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLike = async (postId) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await axios.post("/api/like", {
        postId,
      });
      setIsLiked(response.data.isLike);
      setTotalLikes(response.data.totalLikes);
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
