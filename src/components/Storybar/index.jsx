import Image from "next/image";
import React from "react";

const Storybar = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="py-3 px-10 bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-72">
        <h1 className="font-semibold text-4xl text-center text-black">Story</h1>
      </div>
      <div className="px-10 bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-72 space-y-10 pb-3">
        <div className="flex flex-col justify-center items-center border-black border-b-2 pb-2">
          <Image src="/user.png" alt="user" width={100} height={100} />
          <p className="text-black text-2xl">Your Story</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src="/user.png" alt="user" width={100} height={100} />
          <p className="text-black text-2xl">Your Story</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src="/user.png" alt="user" width={100} height={100} />
          <p className="text-black text-2xl">Your Story</p>
        </div>
      </div>
    </div>
  );
};

export default Storybar;
