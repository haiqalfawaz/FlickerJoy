import Navbar from "@/components/Navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useComment from "@/hooks/useComment";
import useLike from "@/hooks/useLike";
import useDeletePost from "@/hooks/useDeletePost";
import useDeleteComment from "@/hooks/useDeleteComment";
import Link from "next/link";

// Import Icons
import { GoHeart } from "react-icons/go";
import { FaRegCommentAlt } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import { IoSend } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const token = context.req.cookies.token || "";

  try {
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const res = await axios.get(`${apiURL}/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    const UserRes = await axios.get(`${apiURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    return {
      props: {
        postDetails: res.data.data,
        userId: UserRes.data.data.id,
      },
    };
  } catch (error) {
    console.error("Error Fetching data:", error);
    return {
      props: {
        postDetails: [],
      },
    };
  }
}

const PostDetailsPage = ({ postDetails, userId }) => {
  const {
    comments,
    comment,
    setComment,
    sendComment,
    isLoading,
    error,
    handleCommentChange,
    setComments,
  } = useComment();

  const {
    isLiked,
    isLoading: isloadingLike,
    handleLikeUnlike,
    error: errorLike,
    totalLikes,
    setIsLiked,
    setTotalLikes,
  } = useLike();

  const { deletePost } = useDeletePost();

  const { deleteComment, isLoadingDeleteComment } = useDeleteComment();

  const [isUserPost, setIsUserPost] = useState(false);

  useEffect(() => {
    if (postDetails.comments) {
      setComments(postDetails.comments);
    }

    if (postDetails.isLike !== undefined) {
      setIsLiked(postDetails.isLike);
    }

    if (postDetails.totalLikes !== undefined) {
      setTotalLikes(postDetails.totalLikes);
    }

    if (userId === postDetails.user.id) {
      setIsUserPost(true);
    }
  }, [postDetails, userId, setComments]);

  const handleDelete = () => {
    if (postDetails && postDetails.id) {
      deletePost(postDetails.id);
    }
  };

  const handleDeleteComment = (commentId) => {
    deleteComment(commentId, comments, setComments);
  };

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full p-2 border-2 border-dashed rounded-lg border-black h-full">
        <div className="flex justify-center items-start h-full gap-7 mb-2">
          <div className="flex flex-col justify-center items-center w-1/2 gap-4">
            <Image
              src={postDetails.imageUrl || "/noImage.png"}
              alt="Post"
              width={700}
              height={700}
              className="border-2 rounded-xl border-black object-cover h-[450px] w-[700px]"
            />
            <div className="flex justify-center items-center gap-5">
              <div className="flex justify-center items-center gap-2 py-1 px-2 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black] active:[box-shadow:0px_0px_black]">
                <button
                  className="text-black font-bold text-5xl"
                  onClick={() => handleLikeUnlike(postDetails.id)}
                  disabled={isloadingLike}
                >
                  {isLiked ? <GoHeartFill /> : <GoHeart />}
                </button>
                <p className="text-xl text-black">{totalLikes}</p>
              </div>
              <div className="flex justify-center items-center gap-4 p-1 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black] active:[box-shadow:0px_0px_black]">
                <button className="text-black text-5xl">
                  <FaRegCommentAlt />
                </button>
              </div>
              {isUserPost && (
                <div className="flex justify-center items-center gap-4 p-1 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black] active:[box-shadow:0px_0px_black]">
                  <button
                    className="text-black text-5xl"
                    onClick={handleDelete}
                  >
                    <MdDeleteForever />
                  </button>
                </div>
              )}
              {isUserPost && (
                <Link href={`/edit/edit-post/${postDetails.id}`}>
                  <div className="flex justify-center items-center gap-4 p-1 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black] active:[box-shadow:0px_0px_black]">
                    <button className="text-black text-5xl">
                      <AiFillEdit />
                    </button>
                  </div>
                </Link>
              )}
              <div className="flex justify-center items-center gap-4 p-1 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black] h-[59px]">
                <h3 className="text-black text-2xl">
                  {new Date(postDetails.createdAt).toLocaleDateString("id-ID")}
                </h3>
              </div>
              <Link
                href={
                  userId === postDetails.userId
                    ? "/profile"
                    : `/users/${postDetails.userId}`
                }
              >
                <div className="flex justify-center items-center gap-4 p-1 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black]">
                  <Image
                    src={postDetails.user?.profilePictureUrl || "/user.png"}
                    width={50}
                    height={50}
                    className="border border-black rounded-full"
                  />
                  <h3 className="text-black font-semibold text-2xl">
                    @{postDetails.user?.username || "Username"}
                  </h3>
                </div>
              </Link>
            </div>
            <div className="bg-anastasia-2 border border-black [box-shadow:5px_5px_black] rounded-lg p-2 w-full text-center">
              <p className="text-xl text-black">{postDetails.caption}</p>
            </div>
          </div>
          <div className="bg-anastasia-4 rounded-lg [box-shadow:5px_5px_black] h-full w-1/2 border-2 border-anastasia-2 py-3 px-9 flex flex-col justify-center items-center">
            <div className="mb-3">
              <h1 className="text-center font-bold text-3xl text-anastasia-2">
                Comments
              </h1>
            </div>
            <div className="border-2 border-anastasia-2 p-2 rounded-lg w-full h-[450px] mb-3 flex flex-col items-center overflow-y-auto text-anastasia-2 gap-3">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex justify-start items-center w-full"
                  >
                    <Image
                      src={comment.user.profilePictureUrl || "/user.png"}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full border border-anastasia-2 mr-2"
                    />
                    <Link href={`/users/${comment.user.id}`}>
                      <p className="text-xl font-semibold mr-4">
                        @{comment.user.username} :
                      </p>
                    </Link>
                    <p className="text-base">{comment.comment}</p>
                    {comment.user.id === userId && (
                      <div className="flex justify-center items-center gap-2 py-1 px-2 bg-anastasia-2 rounded-lg border border-black [box-shadow:5px_5px_black] active:[box-shadow:0px_0px_black]">
                        <button
                          className="text-lg text-black"
                          onClick={() => handleDeleteComment(comment.id)}
                          disabled={isLoadingDeleteComment}
                        >
                          {isLoadingDeleteComment ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                          ) : (
                            <MdDeleteForever />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center">
                  <p>Be the first to send a message!</p>
                </div>
              )}
            </div>
            <div className="gap-2 flex justify-center items-center border border-anastasia-2 p-2 rounded-lg w-full">
              <input
                type="text"
                placeholder="Send a comment!"
                className="bg-transparent focus:outline-none w-full text-center"
                onChange={handleCommentChange}
                name="comment"
                value={comment}
              />
              <button
                onClick={() => sendComment(postDetails.id)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <IoSend />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailsPage;
