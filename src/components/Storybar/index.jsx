import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const Storybar = ({
  user,
  users,
  totalFollowing,
  totalFollowingPages,
  currentFollowingPages,
  pageSize,
}) => {
  const [currentFollowing, setCurrentFollowing] = useState(users || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();
  const router = useRouter();

  const loadMoreFollowing = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const token = getCookie("token");
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await axios.get(
        `${apiURL}/my-following?size=${pageSize}&page=${page + 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );

      const newUsers = res.data.data.users;

      if (newUsers && newUsers.length > 0) {
        setCurrentFollowing((prevUsers) => [...prevUsers, ...newUsers]);
        setPage((prevPage) => prevPage + 1);
      }

      if (newUsers.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error Loading Following:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 50
      ) {
        loadMoreFollowing();
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, hasMore, loading]);

  const handleUserClick = (userId) => {
    router.push(`/stories/${userId}`);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 lg:w-fit w-full">
      {/* header story */}
      <div className="py-3 px-5 bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-72 lg:flex justify-center items-center hidden">
        <h1 className="font-semibold text-4xl text-center text-black">Story</h1>
      </div>
      <div className="lg:px-5 bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black lg:w-full w-full px-2 gap-2 flex lg:flex-col justify-center items-center py-1">
        {/* My Story */}
        <div
          className="flex flex-col justify-center items-center border-black lg:border-b-2 lg:border-r-0 border-r-2 pb-2 lg:w-full w-40 cursor-pointer"
          onClick={() => handleUserClick(user.id)}
        >
          <Image
            src={user.ProfilePictureUrl || "/user.png"}
            alt="user"
            width={100}
            height={100}
            className="cursor-pointer lg:w-[100px] lg:h-[100px] md:w-20 md:h-20 w-16 h-16"
          />
          <p className="text-black lg:text-2xl md:text-xl text-base">
            Your Story
          </p>
        </div>
        {/* Following Stories */}
        {currentFollowing.length === 0 ? (
          <p className="text-black text-2xl">No Following Story</p>
        ) : (
          <div className="flex lg:flex-col justify-start items-center lg:mt-1 ml-1 overflow-y-auto lg:h-[370px] w-full lg:gap-2 gap-6">
            {currentFollowing.map((following) => (
              <div
                className="flex flex-col justify-center items-center pb-2 cursor-pointer"
                key={following.id}
              >
                <Image
                  src={following.ProfilePictureUrl || "/user.png"}
                  alt="user"
                  width={100}
                  height={100}
                  onClick={() => handleUserClick(following.id)}
                  className="cursor-pointer lg:w-[100px] lg:h-[100px] md:w-20 md:h-20 w-16 h-16"
                />
                <p className="text-black lg:text-2xl md:text-xl text-base">
                  {following.username}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Storybar;
