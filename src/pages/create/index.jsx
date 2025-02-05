import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import useCreatePost from "@/hooks/useCreatePost";
import useCreateStory from "@/hooks/useCreateStory";

// Import Icons
import { ImCross } from "react-icons/im";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreatePostStoryPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(true);
  const [isCreateStoryOpen, setIsCreateStoryOpen] = useState(false);
  const {
    handleUploadImage,
    handleCreatePost,
    handleChange,
    urlImage,
    postData,
    uploadLoading,
    postLoading,
    error,
  } = useCreatePost();

  const {
    handleUploadImageStory,
    handleCreateStory,
    handleChangeCaption,
    urlImageStory,
    storyData,
    storyLoading,
  } = useCreateStory();

  const handleToggleCreatepost = () => {
    setIsCreatePostOpen(!isCreatePostOpen);
    if (!isCreatePostOpen) setIsCreateStoryOpen(false);
  };

  const handleToggleCreateStory = () => {
    setIsCreateStoryOpen(!isCreateStoryOpen);
    if (!isCreateStoryOpen) setIsCreatePostOpen(false);
  };

  const handleImageChangePost = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadImage(file);
    }
  };

  const handleImageChangeStory = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadImageStory(file);
    }
  };

  const isDisabledPost = !urlImage || !postData.caption;

  const isDisabledStory = !urlImageStory || !storyData.caption;

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full p-2 border-2 border-dashed rounded-lg border-black h-full flex flex-col justify-center items-center gap-5">
        {/* Panel Create Post */}
        <div
          className={`${
            isCreatePostOpen ? "h-96" : "h-32"
          } w-full border-2 border-black bg-anastasia-2 rounded-lg flex justify-center items-center transition-all duration-300 relative overflow-hidden`}
        >
          {isCreatePostOpen ? (
            <div className="flex flex-col justify-center items-center h-80 p-2 gap-7">
              <h3 className="text-2xl font-semibold text-black">
                Don't forget to choose your gorgeous image and sweet words!
              </h3>
              <div className="flex justify-center items-start p-3 rounded-xl shadow-[5px_5px_0_black] bg-anastasia-1 border border-black">
                <input
                  type="file"
                  className="text-black"
                  onChange={handleImageChangePost}
                />
                <input
                  type="text"
                  placeholder="Write your captions!"
                  className="text-center p-2 w-60 h-40 outline outline-black rounded-lg text-black"
                  name="caption"
                  onChange={handleChange}
                />
              </div>
              <button
                className={`bg-anastasia-3 p-2 w-52 rounded-lg border border-anastasia-2 transition-all  ${
                  isDisabledPost
                    ? "opacity-30"
                    : "active:shadow-none active:translate-x-[3px] active:translate-y-[3px] shadow-[5px_5px_0px_black]"
                } text-white text-xl`}
                onClick={handleCreatePost}
                disabled={isDisabledPost}
              >
                {postLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  "Create Post!"
                )}
              </button>
            </div>
          ) : (
            <h2 className="text-4xl font-extrabold text-black tracking-tighter">
              Create Post!
            </h2>
          )}
          <button
            onClick={handleToggleCreatepost}
            disabled={isCreatePostOpen}
            className="absolute right-5"
          >
            <ImCross
              className={`${
                isCreatePostOpen ? "" : "rotate-45"
              } text-4xl text-black transition-all duration-300`}
            />
          </button>
        </div>

        {/* Panel Create Story */}
        <div
          className={`${
            isCreateStoryOpen ? "h-96" : "h-32"
          } w-full bg-anastasia-2 rounded-lg flex justify-center items-center transition-all duration-300 relative border-2 border-black overflow-hidden`}
        >
          {isCreateStoryOpen ? (
            <div className="flex flex-col justify-center items-center h-80 p-2 gap-7">
              <h3 className="text-2xl font-semibold text-black">
                Don't forget to choose your gorgeous image and sweet words!
              </h3>
              <div className="flex justify-center items-start p-3 rounded-xl shadow-[5px_5px_0_black] bg-anastasia-1 border border-black">
                <input
                  type="file"
                  className="text-black"
                  onChange={handleImageChangeStory}
                />
                <input
                  type="text"
                  placeholder="Write your captions!"
                  className="text-center p-2 w-60 h-40 outline outline-black rounded-lg text-black"
                  onChange={handleChangeCaption}
                  name="caption"
                />
              </div>
              <button
                className={`bg-anastasia-3 p-2 w-52 rounded-lg border border-anastasia-2 transition-all  ${
                  isDisabledStory
                    ? "opacity-30"
                    : "active:shadow-none active:translate-x-[3px] active:translate-y-[3px] shadow-[5px_5px_0px_black]"
                } text-white text-xl`}
                onClick={handleCreateStory}
                disabled={isDisabledStory}
              >
                Create Story!
              </button>
            </div>
          ) : (
            <h2 className="text-4xl font-extrabold text-black tracking-tighter">
              Create Story!
            </h2>
          )}
          <button
            onClick={handleToggleCreateStory}
            disabled={isCreateStoryOpen}
            className="absolute left-5"
          >
            <ImCross
              className={`${
                isCreateStoryOpen ? "" : "rotate-45"
              } text-4xl text-black transition-all duration-300`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostStoryPage;
