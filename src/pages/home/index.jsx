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

    const { posts, totalItems, totalPages, currentPage } = PostRes.data.data;

    return {
      props: {
        user: UserRes.data.data,
        posts,
        totalItems,
        totalPages,
        currentPage: parseInt(currentPage, 10),
        pageSize: parseInt(size, 10),
      },
    };
  } catch (error) {
    console.error("API Error", error);
    return {
      props: {
        user: null,
        posts: [],
        totalItems: 0,
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  }
}

const HomePage = ({
  user,
  posts,
  totalItems,
  totalPages,
  currentPage,
  pageSize,
}) => {
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full flex justify-start items-start gap-5">
        <Storybar />
        <Postbar
          posts={posts}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
        />
        <MiniProfile user={user} />
      </div>
    </div>
  );
};

export default HomePage;
