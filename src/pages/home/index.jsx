import Navbar from "@/components/Navbar";
import Postbar from "@/components/Postbar";
import Storybar from "@/components/Storybar";
import Image from "next/image";
import React from "react";
import MiniProfile from "@/components/Miniprofile";
import axios from "axios";

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;
    const { page = 1, size = 10 } = context.query;

    const UserRes = await axios.get(`${apiURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    const PostRes = await axios.get(
      `${apiURL}/following-post?size=${size}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      }
    );

    const StoryRes = await axios.get(
      `${apiURL}/following-story?size=${size}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      }
    );

    const user = UserRes.data.data;

    const {
      posts,
      totalItems: totalPosts,
      totalPages: totalPostPages,
      currentPage: currentPostPage,
    } = PostRes.data.data;

    const {
      stories,
      totalItems: totalStories,
      totalPages: totalStoryPages,
      currentPage: currentStoryPage,
    } = StoryRes.data.data;

    return {
      props: {
        user: user || null,
        posts,
        totalPosts,
        totalPostPages,
        currentPostPage: parseInt(currentPostPage, 10),
        stories,
        totalStories,
        totalStoryPages,
        currentStoryPage: parseInt(currentStoryPage, 10),
        pageSize: parseInt(size, 10),
      },
    };
  } catch (error) {
    console.error("API Error", error);
    return {
      props: {
        user: null,
        posts: [],
        totalPosts: 0,
        totalPostPages: 0,
        currentPostPage: 1,
        stories: [],
        totalStories: 0,
        totalStoryPages: 0,
        currentStoryPage: 1,
        pageSize: 10,
      },
    };
  }
}

const HomePage = ({
  user,
  posts,
  totalPosts,
  totalPostPages,
  currentPostPage,
  pageSize,
  stories,
  totalStories,
  totalStoryPages,
  currentStoryPage,
}) => {
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full flex justify-start items-start gap-5">
        <Storybar
          stories={stories}
          totalItems={totalStories}
          totalPages={totalStoryPages}
          currentPage={currentStoryPage}
        />
        <Postbar
          posts={posts}
          totalItems={totalPosts}
          totalPages={totalPostPages}
          currentPage={currentPostPage}
          pageSize={pageSize}
        />
        <MiniProfile user={user} />
      </div>
    </div>
  );
};

export default HomePage;
