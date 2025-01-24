import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import MegaProfile from "@/components/Megaprofile";
import axios from "axios";

export async function getServerSideProps(context) {
  try {
    const token = context.req.cookies.token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const UserRes = await axios.get(`${apiURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

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

const ProfilePage = ({ user }) => {
  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full flex justify-start items-start gap-5">
        <MegaProfile user={user} />
        <div className="w-full rounded-2xl border-2 border-dashed p-2 grid grid-cols-3 grid-rows-3 gap-2 border-black place-items-center">
          <Image
            src="/user.png"
            alt="post"
            width={200}
            height={200}
            className="border border-black"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
