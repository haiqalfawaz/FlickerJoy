import React, { useEffect, useState } from "react";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export async function getServerSideProps(context) {
  const token = context.req.cookies.token || "";

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const EditProfilePage = () => {
  const {
    handleUpdateProfile,
    handleChangeData,
    handleUploadImage,
    loadingUpdateProfile,
    errorUpload,
    errorProfileUpdate,
    urlImage,
  } = useUpdateProfile();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full p-4 border-2 border-dashed rounded-lg border-black h-full flex justify-center items-center gap-5">
        <div className="flex justify-center items-center p-3 rounded-xl shadow-[5px_5px_0_black] bg-anastasia-3 border border-black w-[850px] h-[570px] gap-4">
          <div>
            <h1 className="text-4xl font-bold -rotate-90">Update Profile!</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            {/* Name */}
            <div className="flex flex-col justify-center items-start gap-2  w-full">
              <h3 className="text-2xl font-semibold tracking-wider">Name</h3>
              <input
                type="text"
                name="name"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>

            {/* Username */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">
                Username
              </h3>
              <input
                type="text"
                name="username"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">Email</h3>
              <input
                type="email"
                name="email"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>

            {/* Photo */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">
                Profile Picture
              </h3>
              <input
                type="file"
                name="profilePictureUrl"
                className="outline-none bg-transparent w-full"
                onChange={handleImageChange}
              />
            </div>

            {/* Phone Number */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">
                Phone Number
              </h3>
              <input
                type="text"
                name="phoneNumber"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>

            {/* Bio */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">Bio</h3>
              <input
                type="text"
                name="bio"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>

            {/* Website */}
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">Website</h3>
              <input
                type="text"
                name="website"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>
          </div>
          <div className="h-full p-2 flex justify-end items-end">
            <button
              className="bg-anastasia-2 text-black p-2 rounded-lg border border-black text-xl active:shadow-none active:translate-x-[3px] active:translate-y-[3px] shadow-[5px_5px_0px_black] transition-all duration-200"
              onClick={handleUpdateProfile}
              disabled={loadingUpdateProfile}
            >
              {loadingUpdateProfile ? "Updating..." : "Confirm Update"}
            </button>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {errorUpload && <div className="text-red-500 text-sm">{errorUpload}</div>}
      {errorProfileUpdate && (
        <div className="text-red-500 text-sm">{errorProfileUpdate}</div>
      )}
    </div>
  );
};

export default EditProfilePage;
