import Navbar from "@/components/Navbar";
import axios from "axios";
import { getCookies } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";

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
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const router = useRouter();

  const handleImageError = (postId) => {
    setImageErrors((prevState) => ({
      ...prevState,
      [postId]: true,
    }));
  };

  const handleClickPost = (postId) => {
    router.push(`post/${postId}`);
  };

  const loadMorePosts = async () => {
    setLoading(true);
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
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more Posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="border-2 border-dashed border-black w-full h-full rounded-lg p-4 overflow-auto">
        <div className="flex flex-wrap justify-center items-center gap-2">
          {currentExplorePosts.map((explorePost) => (
            <div
              key={explorePost.id}
              className="border border-black shadow-lg rounded-lg w-64 h-64 flex justify-center items-center cursor-pointer"
              onClick={() => handleClickPost(explorePost.id)}
            >
              <Image
                src={
                  imageErrors[explorePost.id] || !explorePost.imageUrl
                    ? "/user.png"
                    : explorePost.imageUrl
                }
                alt={explorePost.caption || "User Post"}
                width={320}
                height={320}
                className="object-cover text-black "
                onError={() => handleImageError(explorePost.id)}
              />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center items-center p-2 border border-black rounded-lg mt-4 ">
            <button
              className="text-xl text-black font-semibold"
              onClick={loadMorePosts}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More Posts"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExplorePage;
