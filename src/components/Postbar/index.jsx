import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

//Import Icons
import { GoHeart } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";

const Postbar = ({ posts, totalItems, totalPages, currentPage, pageSize }) => {
  const [currentPosts, setCurrentPosts] = useState(posts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loadMorePosts = async () => {
    setLoading(true);

    try {
      const token = getCookie("token");
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      const res = await axios.get(
        `${apiURL}/following-post?size=${pageSize}&page=${page + 1}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );

      const newPosts = res.data.data.posts;

      if (newPosts && newPosts.length > 0) {
        setCurrentPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevpPage) => prevpPage + 1);
      }

      if (newPosts < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error Loading Posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] overflow-auto border-4 rounded-2xl border-dashed border-black px-2 py-2 w-[800px]">
      {currentPosts.map((post) => (
        <div
          key={post.id}
          className="flex justify-center items-start h-full gap-7 mb-2"
        >
          <div className="flex flex-col justify-center items-center gap-10">
            <Image
              src={post.imageUrl || "/user.png"}
              alt="Post"
              width={400}
              height={400}
              className="border-2 rounded-xl border-black"
            />
            <div className="flex justify-center items-center gap-10">
              <button className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black">
                <GoHeart /> {/* button like */}
              </button>
              <button className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black">
                <FaRegCommentAlt />
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black w-full text-center">
              <p>{new Date(post.createdAt).toLocaleDateString("id-ID")}</p>{" "}
              {/* created at */}
            </div>
            <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black flex justify-center items-center gap-2 w-full">
              <Image
                src={"/user.png"}
                alt="user"
                width={50}
                height={50}
                className="border-2 rounded-xl border-black"
              />
              <p>@{post.user.username}</p> {/* username */}
            </div>
            <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-xl text-black h-96 w-72 flex justify-center items-center text-center">
              {post.caption} {/* caption */}
            </div>
          </div>
        </div>
      ))}
      {hasMore && !loading ? (
        <div className="flex justify-center items-center p-2 border border-black rounded-lg mt-4">
          <button
            className="text-xl text-black font-semibold"
            onClick={loadMorePosts}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Posts"}
          </button>
        </div>
      ) : (
        <p className="text-center text-black text-2xl mt-3">
          No More Post to Load!
        </p>
      )}
    </div>
  );
};

export default Postbar;
