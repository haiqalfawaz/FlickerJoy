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

    const MyFollowingRes = await axios.get(
      `${apiURL}/my-following?size=${size}&page=${page}`,
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
      users,
      totalItems: totalFollowing,
      totalPages: totalFollowingPages,
      currentPage: currentFollowingPage,
    } = MyFollowingRes.data.data;

    return {
      props: {
        user: user || null,
        posts,
        totalPosts,
        totalPostPages,
        currentPostPage: parseInt(currentPostPage, 10),
        users,
        totalFollowing,
        totalFollowingPages,
        currentFollowingPage: parseInt(currentFollowingPage, 10),
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
        users,
        totalFollowing: 0,
        totalFollowingPages: 0,
        currentFollowingPage: 1,
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
  users,
  totalFollowing,
  totalFollowingPages,
  currentFollowingPage,
  pageSize,
}) => {
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full flex justify-start items-start gap-5">
        <Storybar
          user={user}
          users={users}
          totalFollowing={totalFollowing}
          totalFollowingPages={totalFollowingPages}
          currentFollowingPage={currentFollowingPage}
          pageSize={pageSize}
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
