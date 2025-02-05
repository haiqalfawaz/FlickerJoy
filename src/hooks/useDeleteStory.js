import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

const useDeleteStory = () => {
  const [loadingDeleteStory, setIsLoadingDeleteStory] = useState(false);
  const router = useRouter();

  const deleteStory = async (storyId, userId) => {
    setIsLoadingDeleteStory(true);
    try {
      const response = await axios.delete(
        `/api/deleteStory?storyId=${storyId}`
      );
      if (response.status === 200) {
        router.push(`/stories/${userId}`);
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  return { deleteStory, loadingDeleteStory };
};

export default useDeleteStory;
