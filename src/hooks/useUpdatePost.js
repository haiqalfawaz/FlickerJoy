import axios from "axios";
import React, { useState } from "react";
import { getCookies } from "cookies-next";
import { useRouter } from "next/router";

const useUpdatePost = () => {
  const [updateData, setUpdateData] = useState({
    imageUrl: "",
    caption: "",
  });
  const [loadingUpdatePost, setLoadingUpdatePost] = useState(false);
  const [errorUpdatePost, setErrorUpdatePost] = useState(false);
  const [urlImage, setUrlImage] = useState(null);
  const [loadingUploadImage, setLoadingUploadImage] = useState(null);
  const [errorUploadImage, setErrorUploadImage] = useState(null);
  const router = useRouter();

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

    setLoadingUploadImage(true);
    setErrorUpdatePost(null);

    try {
      const res = await axios.post(`${apiURL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      console.log("imageUrl berhasil:", res.data.url);
      setUrlImage(res.data.url);
      setUpdateData({
        ...updateData,
        imageUrl: res.data.url,
      });
    } catch (error) {
      setErrorUploadImage("error uploading image, please try again.");
      console.error("Error uploading image:", error);
    } finally {
      setLoadingUploadImage(false);
    }
  };

  const handleUpdatePost = async (postId) => {
    const token = getCookies().token;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    setLoadingUpdatePost(true);
    setErrorUpdatePost(null);

    try {
      const res = await axios.post(
        `/api/updatePost?postId=${postId}`,
        {
          imageUrl: updateData.imageUrl,
          caption: updateData.caption,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: apiKEY ?? "",
          },
        }
      );

      console.log(res.data.message);
      router.push(`/post/${postId}`);
    } catch (error) {
      setErrorUpdatePost("Error update post");
      console.error("Error update post:", error);
    } finally {
      setLoadingUpdatePost(false);
    }
  };

  return {
    handleUpdatePost,
    handleChangeData,
    handleUploadImage,
    loadingUpdatePost,
    errorUpdatePost,
  };
};

export default useUpdatePost;
