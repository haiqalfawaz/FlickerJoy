import Image from "next/image";
import React from "react";

//Import Icons
import { GoHeart } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";

const Postbar = () => {
  return (
    <div className="h-full border-4 rounded-2xl border-dashed  border-black px-2 py-2 w-[800px]">
      <div className="flex justify-center items-center h-full gap-7">
        <div className="flex flex-col justify-center items-center gap-10">
          <Image
            src="/user.png"
            alt="Post"
            width={400}
            height={400}
            className="border-2 rounded-xl border-black"
          />
          <div className="flex justify-center items-center gap-10">
            <button className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black">
              <GoHeart />
            </button>
            <button className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black">
              <FaRegCommentAlt />
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black w-full text-center">
            <p>xx-xx-xx</p>
          </div>
          <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-2xl text-black flex justify-center items-center gap-2 w-full">
            <Image
              src="/user.png"
              alt="Post"
              width={50}
              height={50}
              className="border-2 rounded-xl border-black"
            />
            <p>@username</p>
          </div>
          <div className="bg-anastasia-2 rounded-lg [box-shadow:5px_5px_black] border border-black p-2 text-xl text-black h-96 w-72 flex justify-center items-center text-center">
            "In every sunset, I found a story; in every breeze, a memory. This
            trip wasn't just a place, it was a feeling that I'll carry forever."
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postbar;
