import axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import React, { useState } from "react";

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

  const loadMorePosts = async () => {
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

  return (
    <div className="w-full rounded-2xl border-2 border-dashed border-black p-3 h-[630px] overflow-y-auto">
      <div className="flex flex-wrap justify-center items-center gap-5">
        {posts.map((post) => (
          <div
            key={post.id}
            className="border border-black  shadow-lg rounded-lg w-52 h-52 flex justify-center items-center"
          >
            <Image
              src={post.imageUrl ? `/images/${post.imageUrl}` : "/user.png"}
              alt="User Posts"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>

      {page < totalPages && (
        <div className="flex justify-center items-center p-2 border-black border rounded-lg mt-3">
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
  );
};

export default PostsUser;
