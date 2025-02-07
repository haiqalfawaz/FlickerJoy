import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState, useRef, useEffect } from "react";

const PostsUser = ({
  user,
  initialPosts,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
}) => {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  const loadMorePosts = async () => {
    if (loading || page >= totalPages) return;
    setLoading(true);

    try {
      const token = getCookie("token");
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await axios.get(
        `${apiURL}/users-post/${user.id}?size=${pageSize}&page=${page + 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );

      const newPosts = res.data.data.posts;

      if (newPosts && newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error Loading Posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickPost = (postId) => {
    router.push(`post/${postId}`);
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
  }, [page, totalPages, loading]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl border-2 border-dashed border-black p-3 h-[630px] overflow-y-auto"
    >
      <div className="flex flex-wrap justify-center items-center gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-black shadow-lg rounded-lg w-52 h-52 flex justify-center items-center cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => handleClickPost(post.id)}
          >
            <Image
              src={post.imageUrl || "/user.png"}
              alt="User Posts"
              width={200}
              height={200}
              className="object-contain max-w-full max-h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsUser;
