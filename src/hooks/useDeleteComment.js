import axios from "axios";
import React, { useState } from "react";

const useDeleteComment = () => {
  const [isLoadingDeleteComment, setIsLoadingDeleteComment] = useState(false);

  const deleteComment = async (commentId, comments, setComments) => {
    setIsLoadingDeleteComment("true");
    try {
      const response = await axios.delete(
        `/api/deleteComment?commentId=${commentId}`
      );

      if (response.status === 200) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        setComments(updatedComments);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsLoadingDeleteComment(false);
    }
  };
  return { deleteComment, isLoadingDeleteComment };
};

export default useDeleteComment;
