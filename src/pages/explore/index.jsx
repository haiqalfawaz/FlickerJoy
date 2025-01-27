import Navbar from "@/components/Navbar";
import axios from "axios";
import { getCookies } from "cookies-next";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token || "";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const ExploreRes = await axios.get(
      `${apiUrl}/explore-post?size=10&page=1`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      }
    );

    return {
      props: {
        explorePosts: ExploreRes.data.data.posts,
      },
    };
  } catch (error) {
    console.error("API Error", error);
    return {
      props: {
        explorePost: [],
      },
    };
  }
}

const ExplorePage = ({ explorePosts }) => {
  const [currentExplorePosts, setCurrentExplorePosts] = useState(explorePosts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current;

      if (scrollHeight - scrollTop <= clientHeight + 50 && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    const loadMorePosts = async () => {
      try {
        const token = getCookies().token;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

        const res = await axios.get(
          `${apiUrl}/explore-post?size=10&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: apiKEY ?? "",
            },
          }
        );

        const newPosts = res.data.data.posts;

        setCurrentExplorePosts((prev) => [...prev, ...newPosts]);

        if (newPosts.length < 10) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error loading more Posts:", error);
      }
    };
    if (page > 1) {
      loadMorePosts();
    }
  }, [page]);

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div
        className="border-2 border-dashed border-black w-full h-full rounded-lg p-4 overflow-auto"
        ref={containerRef}
        onScroll={handleScroll}
      >
        <div className="flex flex-wrap justify-center items-center gap-2">
          {currentExplorePosts.map((explorePost) => (
            <div
              key={explorePost.id}
              className="border border-black shadow-lg rounded-lg w-64 h-64 flex justify-center items-center"
            >
              <Image
                src={explorePost.imageUrl || "/user.png"}
                alt={explorePost.caption || "User Post"}
                width={320}
                height={320}
                className="object-cover text-black "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
