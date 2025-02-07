import React, { useState } from "react";
import { getCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";

const useCreateStory = () => {
  const [urlImageStory, setUrlImageStory] = useState(null);
  const [storyData, setStoryData] = useState({ caption: "" });
  const [uploadStoryLoading, setUploadStoryLoading] = useState(false);
  const [storyLoading, setStoryLoading] = useState(false);
  const [succsessCreateStory, setSuccsessCreateStory] = useState("");
  const [errorStory, setErrorStory] = useState(null);
  const router = useRouter();

  const handleChangeCaption = (e) => {
    setStoryData({
      ...storyData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUploadImageStory = async (imageFile) => {
    const token = getCookies().token;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const formData = new FormData();
    formData.append("image", imageFile);

    setUploadStoryLoading(true);

    try {
      const res = await axios.post(`${apiURL}/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      console.log("Image uploaded successfully. URL:", res.data.url);
      setUrlImageStory(res.data.url);
    } catch (error) {
      setError("Error to get URL");
    } finally {
      setUploadStoryLoading(false);
    }
  };

  const handleCreateStory = async () => {
    const token = getCookies().token;
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    if (!urlImageStory || !storyData.caption) {
      console.log("missing imageURL and Captions!");
      return;
    }

    const payload = {
      imageUrl: urlImageStory,
      caption: storyData.caption,
    };

    console.log(payload);

    setStoryLoading(true);
    setErrorStory(null);

    try {
      const res = await axios.post(`${apiURL}/create-story`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          apiKey: apiKEY ?? "",
        },
      });

      console.log(res.data);
      setSuccsessCreateStory("Create Story Success!");
      router.push("/home");
    } catch (error) {
      setError(error.response ? error.response.data.error : error.message);
    } finally {
      setStoryLoading(false);
    }
  };

  return {
    handleUploadImageStory,
    handleCreateStory,
    handleChangeCaption,
    urlImageStory,
    storyData,
    storyLoading,
    succsessCreateStory,
  };
};

export default useCreateStory;
