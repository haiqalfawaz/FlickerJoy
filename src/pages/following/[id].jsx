import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const token = context.req.cookies.token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;
    const { page = 1, size = 10 } = context.query;

    const FollowingRes = await axios.get(
      `${apiURL}/following/${id}?size=${size}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      }
    );

    const followings = FollowingRes.data.data.users;

    return {
      props: {
        followings,
      },
    };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return {
      props: {
        followers: [],
      },
    };
  }
}

const FollowersPage = ({ followings }) => {
  const router = useRouter();

  const handleClickCard = (followingId) => {
    router.push(`/users/${followingId}`);
  };

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full border-2 border-dashed h-full rounded-lg border-black place-items-center p-4 overflow-y-auto">
        {/* Card Followings */}
        {followings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-1">
            {followings.map((following) => (
              <div
                key={following.id}
                onClick={() => handleClickCard(following.id)}
                className="bg-anastasia-2 rounded-lg border-2 border-black p-3 hover:-translate-x-2 hover:-translate-y-2 transition-all duration-300 hover:shadow-[7px_7px_0px_black] flex justify-center items-center gap-4 w-full cursor-pointer"
              >
                <Image
                  src={following.profilePictureUrl || "/user.png"}
                  alt="followings"
                  width={200}
                  height={200}
                  className="rounded-lg border border-black"
                />
                <h3 className="text-2xl text-black font-semibold">
                  @{following.username}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p>No Followings Found</p>
        )}
      </div>
    </div>
  );
};

export default FollowersPage;
