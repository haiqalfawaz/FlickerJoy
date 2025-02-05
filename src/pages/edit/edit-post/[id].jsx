import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import useUpdatePost from "@/hooks/useUpdatePost";
import { useRouter } from "next/router";

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

const EditPostPage = () => {
  const {
    handleUpdatePost,
    handleChangeData,
    handleUploadImage,
    loadingUpdatePost,
    errorUpdatePost,
  } = useUpdatePost();

  const { query } = useRouter();
  const { id } = query;
  console.log("post id:", id);

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
            <h1 className="text-4xl font-bold -rotate-90">Update Post!</h1>
          </div>
          <div className="flex flex-col justify-center items-center gap-3">
            <div className="flex flex-col justify-center items-start gap-2 w-full">
              <h3 className="text-2xl font-semibold tracking-wider">
                Profile Picture
              </h3>
              <input
                type="file"
                name="imageUrl"
                className="outline-none bg-transparent w-full"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col justify-center items-start gap-2  w-full">
              <h3 className="text-2xl font-semibold tracking-wider">
                New Caption
              </h3>
              <input
                type="text"
                name="caption"
                onChange={handleChangeData}
                className="outline-none border-b-2 border-black bg-transparent w-full"
              />
            </div>
          </div>
          <div className="h-full p-2 flex justify-end items-end">
            <button
              className="bg-anastasia-2 text-black p-2 rounded-lg border border-black text-xl active:shadow-none active:translate-x-[3px] active:translate-y-[3px] shadow-[5px_5px_0px_black] transition-all duration-200"
              onClick={() => handleUpdatePost(id)}
              disabled={loadingUpdatePost}
            >
              {loadingUpdatePost ? "Updating..." : "Confirm Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
