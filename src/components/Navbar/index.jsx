import Link from "next/link";

import React from "react";

const Navbar = () => {
  return (
    <div className="bg-anastasia-4 py-3 px-5 round rounded-2xl w-full h-fit hidden lg:flex">
      <div className="px-10 py-5 bg-anastasia-2 flex justify-center items-center rounded-lg gap-52 w-full">
        <Link href="/home">
          <h4 className="text-2xl font-mono text-black font-semibold active:animate-ping">
            HOME
          </h4>
        </Link>
        <Link href="/create">
          <h4 className="text-2xl font-mono text-black font-semibold active:animate-ping">
            POST
          </h4>
        </Link>
        <Link href="/explore">
          <h4 className="text-2xl font-mono text-black font-semibold active:animate-ping">
            EXPLORE
          </h4>
        </Link>
        <Link href="/profile">
          <h4 className="text-2xl font-mono text-black font-semibold active:animate-ping">
            PROFILE
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
