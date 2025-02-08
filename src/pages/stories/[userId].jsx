import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getCookie } from "cookies-next";

// Import Icons
import { GrChapterPrevious, GrChapterNext } from "react-icons/gr";

export async function getServerSideProps(context) {
  const { userId } = context.params;

  try {
    const token = context.req.cookies.token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const UserRes = await axios.get(`${apiURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });
    const loggedUser = UserRes.data.data;

    let stories = [];
    let totalPages = 0;

    if (userId === loggedUser.id) {
      const StoryRes = await axios.get(`${apiURL}/my-story?size=10&page=1`, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });
      stories = StoryRes.data.data.stories;
      totalPages = StoryRes.data.data.totalPages;
    } else {
      const StoryRes = await axios.get(
        `${apiURL}/following-story?size=10&page=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );
      const filteredStories = StoryRes.data.data.stories.filter(
        (story) => story.userId === userId
      );

      stories = filteredStories;
      totalPages = StoryRes.data.data.totalPages;
    }

    return {
      props: {
        initialStories: stories,
        totalPages: totalPages,
        loggedUser: loggedUser,
      },
    };
  } catch (error) {
    console.error("Error Fetching Stories:", error);
    return {
      props: {
        initialStories: [],
        totalPages: 0,
        loggedUser: null,
      },
    };
  }
}

const StoriesPage = ({ initialStories, totalPages, loggedUser }) => {
  const [userStories, setUserStories] = useState(initialStories || []);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { userId } = useRouter().query;
  const router = useRouter();

  useEffect(() => {
    if (userId && page > 1) {
      getStories(userId, page);
    }
  }, [userId, page]);

  const getStories = async (userId, page) => {
    setLoading(true);
    try {
      const token = getCookie("token");
      const apiURL = process.env.NEXT_PUBLIC_API_URL;
      const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

      let res;

      if (userId === loggedUser.id) {
        res = await axios.get(`${apiURL}/my-story?size=10&page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        });
      } else {
        res = await axios.get(
          `${apiURL}/following-story?size=10&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: apiKEY ?? "",
            },
          }
        );
      }

      const filteredStories = res.data.data.stories.filter(
        (story) => story.userId === userId
      );

      setUserStories((prev) => [...prev, ...filteredStories]);

      if (page >= res.data.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error Fetching Stories:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadNextStory = () => {
    if (currentStoryIndex < userStories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      if (hasMore) {
        loadMoreStories();
      }
    }
  };

  const loadPrevStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  const loadMoreStories = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleClickStory = (storyId) => {
    router.push(`/story/${storyId}`);
  };

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full  border-2 border-dashed rounded-lg border-black h-full flex flex-col justify-center items-center gap-5 p-5">
        <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-96 flex flex-col justify-center items-center h-16">
          <h1 className="text-4xl font-extrabold font-mono text-black">
            Stories!
          </h1>
        </div>
        {userStories.length === 0 ? (
          <p>No stories available.</p>
        ) : (
          <div className="flex flex-col justify-center items-center gap-5 h-[500px]">
            <div
              className="bg-anastasia-2 p-4 gap-2 flex flex-col justify-center items-center rounded-lg"
              onClick={() =>
                handleClickStory(userStories[currentStoryIndex]?.id)
              }
            >
              <img
                src={userStories[currentStoryIndex]?.imageUrl}
                alt={userStories[currentStoryIndex]?.caption}
                width={300}
                height={300}
                className="rounded-lg"
              />
              <p className="text-black">{userStories[currentStoryIndex]?.id}</p>
            </div>
            <div className="flex justify-center items-center gap-4">
              <button
                className="bg-anastasia-4 border-2 border-anastasia-2 rounded-lg p-2 text-4xl transition-all shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                onClick={loadPrevStory}
              >
                <GrChapterPrevious />
              </button>
              <button
                className="bg-anastasia-4 border-2 border-anastasia-2 rounded-lg p-2 text-4xl transition-all shadow-[3px_3px_0px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px]"
                onClick={loadNextStory}
              >
                <GrChapterNext />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesPage;
