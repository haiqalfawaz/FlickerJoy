import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const token = context.req.cookies.token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const FollowersRes = await axios.get(
      `${apiURL}/followers/${id}?size=10&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      }
    );

    const followers = FollowersRes.data.data.users;
    const totalPages = FollowersRes.data.data.totalPages;

    return {
      props: {
        followers,
        totalPages,
      },
    };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return {
      props: {
        followers: [],
        totalPages: 0,
      },
    };
  }
}

const FollowersPage = ({ followers, totalPages }) => {
  const router = useRouter();
  const [currentFollowers, setCurrentFollowers] = useState(followers);
  const [page, setpage] = useState(1);
  const [hasMore, setHasMore] = useState(totalPages > 1);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const handleClickCard = (followersId) => {
    router.push(`/users/${followersId}`);
  };

  const loadMoreFollowers = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const token = getCookies().token;
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await axios.get(
        `${apiURL}/followers/${router.query.id}?size=10&page=${page + 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKEY: apiKEY ?? "",
          },
        }
      );

      console.log("Followers ID:", router.query.id);
      const newFollowers = res.data.data.users;

      setCurrentFollowers((prev) => [...prev, ...newFollowers]);

      if (newFollowers.length < 10) {
        setHasMore(false);
      }
      setpage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more followers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 1
      ) {
        loadMoreFollowers();
      }
    };

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

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div
        ref={containerRef}
        className="w-full border-2 border-dashed h-full rounded-lg border-black place-items-center p-4 overflow-y-auto"
      >
        {/* Card Followers */}
        {currentFollowers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-1">
            {currentFollowers.map((follower) => (
              <div
                key={follower.id}
                onClick={() => handleClickCard(follower.id)}
                className="bg-anastasia-2 rounded-lg border-2 border-black p-3 hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300 hover:shadow-[7px_7px_0px_black] flex justify-center items-center gap-4 w-full cursor-pointer"
              >
                <Image
                  src={follower.profilePictureUrl || "/user.png"}
                  alt="followers"
                  width={200}
                  height={200}
                  className="rounded-lg border border-black"
                />
                <h3 className="text-2xl text-black font-semibold">
                  @{follower.username}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No followers Found</p>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;
