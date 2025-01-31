import axios from "axios";
import { useRouter } from "next/router";
import React from "react";

const useDeletePost = () => {
  const router = useRouter();

  const deletePost = async (postId) => {
    try {
      const response = await axios.delete(`/api/deletePost?postId=${postId}`);

      if (response.status === 200) {
        router.push("/profile");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return { deletePost };
};

export default useDeletePost;
