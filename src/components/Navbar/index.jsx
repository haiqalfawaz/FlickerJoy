import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="bg-anastasia-4 py-3 px-5 round rounded-2xl w-full h-fit">
      <div className="px-10 py-5 bg-anastasia-2 flex justify-center items-center rounded-lg gap-52">
        <Link href="/home">Home</Link>
        <p>Post</p>
        <Link href="/explore">Explore</Link>
        <Link href="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;
