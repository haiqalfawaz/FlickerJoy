import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useState } from "react";

const Storybar = ({
  stories,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
}) => {
  const [currentStories, setcurrentStories] = useState(stories || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMoreStories = async () => {
    setLoading(true);

    try {
      const token = getCookie("token");
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await axios.get(
        `${apiURL}/following-story?size=${pageSize}&page=${page + 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );

      const newStories = res.data.data.stories;

      if (newStories && newStories.length > 0) {
        setcurrentStories((prevStory) => [...prevStory, ...newStories]);
        setPage((prevPage) => prevPage + 1);
      }

      if (newStories < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error Loading Story:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="py-3 px-10 bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-72">
        <h1 className="font-semibold text-4xl text-center text-black">Story</h1>
      </div>
      <div className="px-10 bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-72 space-y-10 pb-3">
        <div className="flex flex-col justify-center items-center border-black border-b-2 pb-2">
          <Image src="/user.png" alt="user" width={100} height={100} />
          <p className="text-black text-2xl">Your Story</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src="/user.png" alt="user" width={100} height={100} />
          <p className="text-black text-2xl">Your Story</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src="/user.png" alt="user" width={100} height={100} />
          <p className="text-black text-2xl">Your Story</p>
        </div>
      </div>
    </div>
  );
};

export default Storybar;
