import useLogout from "@/hooks/useLogout";
import Image from "next/image";
import React from "react";
import Link from "next/link";

//Import Icons
import { FaRegEdit } from "react-icons/fa";

const MegaProfile = ({ user }) => {
  const { handleLogout } = useLogout();

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-start items-center gap-3 h-full">
        <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-fit p-3">
          <Image
            src={user.profilePictureUrl || "/user.png"}
            alt="post"
            width={300}
            height={300}
            className="rounded-xl"
          />
        </div>
        <div className="flex justify-center items-center gap-3 w-full">
          <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-1/2 p-2 flex justify-center items-center gap-3 flex-col h-32">
            <h3 className="text-xl font-semibold text-black">{user.name}</h3>
            <h3 className="text-xl font-semibold text-black">
              @{user.username}
            </h3>
          </div>
          <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-1/2 p-2 flex flex-col justify-center items-center gap-3 h-32">
            <h3 className="text-xl font-semibold text-black">{user.email}</h3>
            <h3 className="text-xl font-semibold text-black">{user.website}</h3>
            <h3 className="text-xl font-semibold text-black">
              {user.phoneNumber}
            </h3>
          </div>
        </div>
        <div className="flex justify-center items-center gap-2">
          <Link href={`following/${user.id}`}>
            <button className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black p-2">
              <h3 className="text-xl font-semibold text-black">
                {user.totalFollowing} Following
              </h3>
            </button>
          </Link>
          <Link href={`followers/${user.id}`}>
            <button className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black p-2">
              <h3 className="text-xl font-semibold text-black">
                {user.totalFollowers} Followers
              </h3>
            </button>
          </Link>
          <Link href={"/edit/edit-profile"}>
            <button className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black py-2 px-3">
              <FaRegEdit className="text-xl font-semibold text-black" />
            </button>
          </Link>
          <button
            className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black py-2 px-3 active:[box-shadow:0px_0px_black]"
            onClick={handleLogout}
          >
            <h3 className="text-xl font-semibold text-black">Logout</h3>
          </button>
        </div>
        <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-full flex justify-center items-center h-24">
          <p className="textlg font-semibold text-black">{user.bio}</p>
        </div>
      </div>
    </div>
  );
};

export default MegaProfile;
