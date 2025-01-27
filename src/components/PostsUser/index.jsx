import Image from "next/image";
import React from "react";

const PostsUser = ({ posts }) => {
  return (
    <div className="w-full rounded-2xl border-2 border-dashed border-black p-3 h-[630px] overflow-y-auto">
      <div className="flex flex-wrap justify-center items-center gap-5">
        {posts.map((post, index) => (
          <div
            key={index}
            className="border border-black  shadow-lg rounded-lg w-52 h-52 flex justify-center items-center"
          >
            <Image
              src={post.imageUrl || "/user.png"}
              alt="User Posts"
              width={200}
              height={200}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsUser;
