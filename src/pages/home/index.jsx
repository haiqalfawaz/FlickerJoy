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

    const UserRes = await axios.get(`${apiURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    });
    console.log(UserRes.data);
    return {
      props: {
        user: UserRes.data.data,
      },
    };
  } catch (error) {
    console.error("API Error", error);
    return {
      props: {
        user: null,
      },
    };
  }
}

const HomePage = ({ user }) => {
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full flex justify-start items-start gap-5">
        <Storybar />
        <Postbar />
        <MiniProfile user={user} />
      </div>
    </div>
  );
};

export default HomePage;
