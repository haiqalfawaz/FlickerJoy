import axios from "axios";
import { useState } from "react";

const useComment = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendComment = async (postId) => {
    if (!comment.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post("/api/comment", {
        postId,
        comment,
      });

      setComments((prevComments) => [...prevComments, response.data.comment]);
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
