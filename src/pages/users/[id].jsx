import axios from "axios";
import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import PostUsers from "@/components/PostsUsers";
import useFollow from "@/hooks/useFollow";

//import icons
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiUserFollowFill } from "react-icons/ri";
import { RiUserUnfollowFill } from "react-icons/ri";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const { page = 1, size = 10 } = context.query;
  const token = context.req.cookies.token || "";
  const apiURL = process.env.NEXT_PUBLIC_API_URL;
  const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

  try {
    const UsersRes = await axios.get(`${apiURL}/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    const User = UsersRes.data.data;

    const PostsUsersRes = await axios.get(
      `${apiURL}/users-post/${User.id}?size=${size}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      }
    );

    const { posts, totalPages, currentPage, totalItems } =
      PostsUsersRes.data.data;

    return {
      props: {
        User,
        posts,
        totalPages,
        currentPage: parseInt(currentPage, 10),
        totalItems,
        pageSize: parseInt(size, 10),
      },
    };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return {
      props: {
        User: null,
        posts: [],
        totalPages: 0,
        currentPage: 1,
        pageSize: 10,
      },
    };
  }
}

const UsersProfile = ({
  User,
  posts,
  totalPages,
  currentPage,
  totalItems,
  pageSize,
}) => {
  const { isFollowed, isLoading, error, handleFollowUnfollow } = useFollow();

  const handleFollowOrUnfollow = (userId) => {
    handleFollowUnfollow(userId);
  };
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full flex justify-start items-start gap-5">
        {/* User Info Section */}
        <div className="w-1/2 h-full">
          <div className="flex flex-col justify-start items-center gap-3 h-full">
            <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-fit p-3">
              <Image
                src={User.profilePictureUrl || "/user.png"}
                alt="profile"
                width={300}
                height={300}
                className="rounded-xl"
              />
            </div>
            <div className="flex justify-center items-center gap-3 w-full">
              <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-1/2 p-2 flex justify-center items-center gap-3 flex-col h-32">
                <h3 className="text-xl font-semibold text-black">
                  {User.name}
                </h3>
                <h3 className="text-xl font-semibold text-black">
                  @{User.username}
                </h3>
              </div>
              <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-1/2 p-2 flex flex-col justify-center items-center gap-3 h-32">
                <h3 className="text-xl font-semibold text-black">
                  {User.email}
                </h3>
                <h3 className="text-xl font-semibold text-black">
                  {User.website}
                </h3>
                <h3 className="text-xl font-semibold text-black">
                  {User.phoneNumber}
                </h3>
              </div>
            </div>
            <div className="flex justify-center items-center gap-2">
              <Link href={`/following/${User.id}`}>
                <button className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black p-2">
                  <h3 className="text-xl font-semibold text-black">
                    {User.totalFollowing} Following
                  </h3>
                </button>
              </Link>
              <Link href={`/followers/${User.id}`}>
                <button className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black p-2">
                  <h3 className="text-xl font-semibold text-black">
                    {User.totalFollowers} Followers
                  </h3>
                </button>
              </Link>
              <button
                className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black p-2"
                onClick={() => handleFollowOrUnfollow(User.id)}
              >
                <h3 className="text-xl font-semibold text-black">
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin" />
                  ) : isFollowed ? (
                    <div className="flex justify-center items-center gap-2">
                      <RiUserUnfollowFill />
                      <p>Unfollow</p>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center gap-2">
                      <RiUserFollowFill />
                      <p>Follow</p>
                    </div>
                  )}
                </h3>
              </button>
            </div>
            <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-full flex justify-center items-center h-24">
              <p className="text-lg font-semibold text-black">{User.bio}</p>
            </div>
          </div>
        </div>
        <PostUsers
          initialPosts={posts}
          totalItems={totalItems}
          totalPages={totalPages}
          currentPage={currentPage}
          pageSize={pageSize}
          User={User}
        />
      </div>
    </div>
  );
};

export default UsersProfile;
