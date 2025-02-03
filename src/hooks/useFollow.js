import axios from "axios";
import { getCookies } from "cookies-next";
import { useState } from "react";

const useFollow = () => {
  const [isFollowed, SetIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFollowUnfollow = async (userId) => {
    if (isLoading) return;

    const token = getCookies().token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    setIsLoading(true);

    try {
      if (isFollowed) {
        await axios.delete(`${apiURL}/unfollow/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY,
          },
        });
        SetIsFollowed(false);
      } else {
        await axios.post(
          `${apiURL}/follow`,
          { userIdFollow: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: apiKEY ?? "",
            },
          }
        );
        SetIsFollowed(true);
      }
    } catch (error) {
      setError("An error occurred while following/unfollowing.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isFollowed,
    isLoading,
    error,
    handleFollowUnfollow,
  };
};

export default useFollow;
