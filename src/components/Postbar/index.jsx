import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Link from "next/link";

// Import Icons
import { GoHeart } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";

const Postbar = ({ posts, totalItems, totalPages, currentPage, pageSize }) => {
  const [currentPosts, setCurrentPosts] = useState(posts || []);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null); // For scroll event detection
  const router = useRouter();

  // Function to load more posts
  const loadMorePosts = async () => {
    if (loading || !hasMore) return; // Prevent double-loading

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
        setPage((prevPage) => prevPage + 1);
      }

      if (newPosts.length < pageSize) {
        setHasMore(false); // No more posts to load
      }
    } catch (error) {
      console.error("Error Loading Posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle post click to navigate to the post detail page
  const handleClickPost = (postId) => {
    router.push(`/post/${postId}`);
  };

  // Handle infinite scroll by detecting when the user reaches the bottom
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 50
      ) {
        loadMorePosts();
      }
    }
  };

  // Attach scroll listener when component mounts
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    // Clean up listener when the component unmounts
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [page, hasMore, loading]);

  return (
    <div
      className="h-[80vh] overflow-auto border-4 rounded-2xl border-dashed border-black px-2 py-2 w-[800px]"
      ref={containerRef}
    >
      {currentPosts.length === 0 ? (
        <p className="text-center text-black text-2xl mt-3">
          Let follow someone!
        </p>
      ) : (
        currentPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleClickPost(post.id)}
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
              <Link href={`/users/${post.user.id}`}>
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
              </Link>

              <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-xl text-black h-96 w-72 flex justify-center items-center text-center">
                {post.caption} {/* caption */}
              </div>
            </div>
          </div>
        ))
      )}

      {loading && (
        <p className="text-center text-black text-2xl mt-3">
          Loading more posts...
        </p>
      )}

      {!hasMore && currentPosts.length > 0 && (
        <p className="text-center text-black text-2xl mt-3">
          No More Posts to Load!
        </p>
      )}
    </div>
  );
};

export default Postbar;
