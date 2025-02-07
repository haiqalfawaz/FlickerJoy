import Navbar from "@/components/Navbar";
import axios from "axios";
import { getCookies } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token || "";
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

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
        explorePosts: [],
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
  const containerRef = useRef(null);
  const router = useRouter();

  const handleClickPost = (postId) => {
    router.push(`post/${postId}`);
  };

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const token = getCookies().token;
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await axios.get(
        `${apiUrl}/explore-post?size=10&page=${page + 1}`,
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

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 1
      ) {
        loadMorePosts();
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
  }, [hasMore, loading]);

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div
        ref={containerRef}
        className="border-2 border-dashed border-black w-full h-full rounded-lg p-4 overflow-y-auto"
      >
        <div className="flex flex-wrap justify-center items-center gap-5">
          {currentExplorePosts.map((explorePost) => (
            <div
              key={explorePost.id}
              className="border border-black shadow-lg rounded-lg flex w-72 h-72 justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300"
              onClick={() => handleClickPost(explorePost.id)}
            >
              <Image
                src={explorePost.imageUrl || "/noImage.png"}
                alt={explorePost.caption || "User Post"}
                width={320}
                height={320}
                className="object-contain max-w-full max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
