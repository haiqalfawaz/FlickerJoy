import axios from "axios";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";

const useUpdateProfile = () => {
  const router = useRouter();
  const [loadingUpdateProfile, setLoadingUpdateProfile] = useState(false);
  const [loadingUpdateNewImage, setLoadingUpdateNewImage] = useState(false);
  const [urlImage, setUrlImage] = useState(null);
  const [errorUpload, setErrorUpload] = useState(null);
  const [errorProfileUpdate, setErrorProfileUpdate] = useState(null);
  const [updateData, setUpdateData] = useState({
    name: "",
    username: "",
    email: "",
    profilePictureUrl: "",
    phoneNumber: "",
    bio: "",
    website: "",
  });

  const handleChangeData = (e) => {
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = async (imageFile) => {
    const token = getCookies().token;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const formData = new FormData();
    formData.append("image", imageFile);

    setLoadingUpdateNewImage(true);
    setErrorUpload(null);

    try {
      const res = await axios.post(`${apiURL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      setUrlImage(res.data.url);
      setUpdateData({
        ...updateData,
        profilePictureUrl: res.data.url,
      });
    } catch (error) {
      setErrorUpload("Error uploading image, please try again.");
      console.error("Error uploading image:", error);
    } finally {
      setLoadingUpdateNewImage(false);
    }
  };

  const handleUpdateProfile = async () => {
    const token = getCookies().token;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const payload = {
      name: updateData.name,
      username: updateData.username,
      email: updateData.email,
      profilePictureUrl: updateData.profilePictureUrl,
      phoneNumber: updateData.phoneNumber,
      bio: updateData.bio,
      website: updateData.website,
    };

    setLoadingUpdateProfile(true);
    setErrorProfileUpdate(null);

    try {
      const res = await axios.post("/api/updateProfile", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });
      console.log("Profile updated:", res.data.message);
      router.push("/profile");
    } catch (error) {
      setErrorProfileUpdate("Failed to update profile, please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoadingUpdateProfile(false);
    }
  };

  return {
    handleUpdateProfile,
    handleChangeData,
    handleUploadImage,
    loadingUpdateProfile,
    errorUpload,
    errorProfileUpdate,
    urlImage,
  };
};

export default useUpdateProfile;
