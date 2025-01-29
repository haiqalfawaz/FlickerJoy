import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useState } from "react";
import Image from "next/image";

// Import Icons
import { GoHeart } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const token = context.req.cookies.token || "";

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const res = await axios.get(`${apiUrl}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    return {
      props: {
        postDetails: res.data.data,
      },
    };
  } catch (error) {
    console.error("Error Fetching data:", error);
    return {
      props: {
        postDetails: [],
      },
    };
  }
}

const PostDetailsPage = ({ postDetails }) => {
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full p-2 border border-dashed rounded-lg border-black">
        <div className="flex justify-center items-start h-full gap-7 mb-2">
          <div className="flex flex-col justify-center items-center gap-10">
            <Image
              src={postDetails.imageUrl || "/user.png"}
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
              <p>
                {new Date(postDetails.createdAt).toLocaleDateString("id-ID")}
              </p>{" "}
              {/* created at */}
            </div>
            <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black flex justify-center items-center gap-2 w-full">
              <Image
                src={postDetails.user.profilePictureUrl || "/user.png"}
                alt="user"
                width={50}
                height={50}
                className="border-2 rounded-xl border-black"
              />
              <p>@{postDetails.user.username}</p> {/* username */}
            </div>
            <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-xl text-black h-96 w-72 flex justify-center items-center text-center">
              {postDetails.caption} {/* caption */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
