import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

// Import Icons
import { GoHeart, GoHeartFill } from "react-icons/go";

const Postbar = ({
  posts,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
  myPosts,
  totalMyPosts,
  totalMyPostsPages,
  currentMyPostsPage,
}) => {
  const [currentPosts, setCurrentPosts] = useState(posts || []);
  const [page, setPage] = useState(currentPage || 1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const combinedPosts = [...posts, ...myPosts];
    setCurrentPosts(combinedPosts);
  }, [posts, myPosts]);

  const handlelikeUnlike = async (postId, isLike) => {
    const token = getCookie("token");
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    if (isLike === true) {
      await axios.post(
        `${apiURL}/unlike`,
        {
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
    } else {
      await axios.post(
        `${apiURL}/like`,
        {
          postId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
    }

    setCurrentPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLike: !isLike,
              totalLikes: isLike ? post.totalLikes - 1 : post.totalLikes + 1,
            }
          : post
      )
    );
  };

  const loadMorePosts = async () => {
    if (loading || !hasMore) return;

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
      const newMyPosts = myPosts || [];

      const combinedPosts = [...currentPosts, ...newPosts, ...newMyPosts];

      if (newPosts && newPosts.length > 0) {
        setCurrentPosts(combinedPosts);
        setPage((prevPage) => prevPage + 1);
      }

      if (newPosts.length < pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error Loading Posts:", error);
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
        loadMorePosts();
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

  const handleClickPost = (postId) => {
    router.push(`/post/${postId}`);
  };

  const handleClickUser = (userId) => {
    router.push(`/users/${userId}`);
  };

  return (
    <div
      className="lg:h-[80vh] overflow-auto lg:border-4 rounded-2xl lg:border-dashed lg:border-black lg:px-2 lg:py-2 lg:w-[800px] w-full"
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
            className="flex flex-col justify-center items-center gap-10  w-full h-full"
          >
            <div className="lg:w-full sm:w-96 sm:h-96">
              <Image
                src={post.imageUrl || "/noImage.png"}
                alt="Post"
                width={900}
                height={900}
                className="border-2 rounded-xl border-black object-contain max-w-full max-h-full"
                onClick={() => handleClickPost(post.id)}
              />
            </div>
            <div className="flex justify-center items-center gap-5">
              <button
                className="bg-anastasia-2 rounded-lg active:shadow-none active:translate-x-[3px] active:translate-y-[3px] shadow-[5px_5px_0px_black] border border-black p-2 text-2xl text-black flex justify-center items-center gap-2 transition-all duration-200"
                onClick={() => handlelikeUnlike(post.id, post.isLike)}
              >
                {post.isLike ? (
                  <GoHeartFill className="text-4xl" />
                ) : (
                  <GoHeart className="text-4xl" />
                )}
                {post.totalLikes}
              </button>
              <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black">
                <h3>{new Date(post.createdAt).toLocaleDateString("id-ID")}</h3>
              </div>
              <div
                className="flex justify-center items-center bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-xl text-black cursor-pointer"
                onClick={() => handleClickUser(post.user.id)}
              >
                <Image
                  src={post.user.profiePictureUrl || "/user.png"}
                  width={30}
                  height={30}
                  className="max-w-full max-h-full object-contain"
                />
                <h3>{post.user.username}</h3>
              </div>
            </div>
            <div className="flex justify-center items-center bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-xl text-black cursor-pointer w-full">
              <h3>{post.caption}</h3>
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
