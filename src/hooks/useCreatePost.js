import React, { useState } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

const useCreatePost = () => {
  const [urlImage, setUrlImage] = useState(null);
  const [postData, setPostData] = useState({ caption: "" });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [succsessCreatePost, setSuccsessCreatePost] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImage = async (imageFile) => {
    const token = getCookies().token;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploadLoading(true);

    try {
      const res = await axios.post(`${apiURL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      console.log("Image uploaded successfully. URL:", res.data.url);
      setUrlImage(res.data.url);
    } catch (error) {
      setError("Error to get URL");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleCreatePost = async () => {
    const token = getCookies().token;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    if (!urlImage || !postData.caption) {
      console.log("missing imageURL and Captions!");
      return;
    }

    const payload = {
      imageUrl: urlImage,
      caption: postData.caption,
    };

    console.log(payload);

    setPostLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${apiURL}/create-post`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      console.log(res.data);
      setSuccsessCreatePost("Create Post Succsess!");
      router.push("/home");
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    } finally {
      setPostLoading(false);
    }
  };

  return {
    handleUploadImage,
    handleCreatePost,
    handleChange,
    urlImage,
    postData,
    uploadLoading,
    postLoading,
    error,
    succsessCreatePost,
  };
};

export default useCreatePost;
