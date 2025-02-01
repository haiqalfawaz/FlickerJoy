import axios from "axios";
import { getCookies } from "cookies-next";
import { useState } from "react";

const useComment = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendComment = async (postId) => {
    if (!comment.trim()) return;

    const token = getCookies().token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    setIsLoading(true);
    try {
      await axios.post("/api/comment", { postId, comment });

      const response = await axios.get(`${apiURL}/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apikey: apiKEY ?? "",
        },
      });
      setComments(response.data.data.comments);
      setComment("");
      setError(null);
    } catch (error) {
      setError("Failed to send comment");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  return {
    comments,
    comment,
    setComment,
    setComments,
    sendComment,
    isLoading,
    error,
    handleCommentChange,
  };
};

export default useComment;
