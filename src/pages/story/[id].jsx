import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useDeleteStory from "@/hooks/useDeleteStory";

// Import Icons
import { FaAngleDown } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const token = context.req.cookies.token || "";
    const apiURL = process.env.NEXT_PUBLIC_API_URL;
    const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

    const StoryDetailRes = await axios.get(`${apiURL}/story/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    const StoryViewsRes = await axios.get(`${apiURL}/story-views/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    const loggedUserRes = await axios.get(`${apiURL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: apiKEY ?? "",
      },
    });

    const StoryDetails = StoryDetailRes.data.data;
    const StoryViews = StoryViewsRes.data.data;
    const loggedUserId = loggedUserRes.data.data;

    return {
      props: {
        StoryDetails,
        StoryViews,
        loggedUserId,
      },
    };
  } catch (error) {
    console.error("Error Fetching Data:", error);
    return {
      props: {
        StoryDetails: [],
        StoryViews: [],
        loggedUserId: [],
      },
    };
  }
}

const StoryDetailsPage = ({ StoryDetails, StoryViews, loggedUserId }) => {
  const [currentStoryDetails, setCurrentStoryDetails] = useState(
    StoryDetails || []
  );
  const [currentStoryViews, setCurrentStoryViews] = useState(StoryViews || []);
  const [isViewedOpen, setIsViewedOpen] = useState(false);
  const [isUserStory, setIsUserStory] = useState(false);
  const { deleteStory, loadingDeleteStory } = useDeleteStory();

  const handleViewersToggle = () => {
    setIsViewedOpen(!isViewedOpen);
  };

  useEffect(() => {
    if (loggedUserId.id === StoryDetails.userId) {
      setIsUserStory(true);
    }
  }, [loggedUserId]);

  const handleDeleteStory = (storyId) => {
    deleteStory(storyId, loggedUserId.id);
  };

  return (
    <div className="bg-anastasia-1 h-screen p-5 flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-start gap-20 w-full">
        <Image src="/Logo-crop.png" alt="Logo" width={150} height={150} />
        <Navbar />
      </div>
      <div className="w-full  border-2 border-dashed rounded-lg border-black h-full flex justify-center items-start gap-3 p-3">
        <div className="flex flex-col justify-center items-center gap-3">
          <div className="bg-anastasia-2 rounded-2xl [box-shadow:5px_5px_black] border border-black w-96 flex flex-col justify-center items-center h-16">
            <h1 className="text-4xl font-extrabold font-mono text-black">
              Story!
            </h1>
          </div>
          <div className="flex flex-col justify-center items-center bg-anastasia-2 p-2 gap-4 h-full rounded-xl border-2 border-black">
            <div className="p-2 bg-anastasia-1 rounded-2xl flex justify-center items-center gap-2  transition-all shadow-[5px_5px_0px_black] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] cursor-pointer">
              <Image
                src={currentStoryDetails.user.profilePictureUrl}
                width={50}
                height={50}
                className="rounded-full w-12 h-12 border border-anastasia-3 object-cover"
              />
              <p className="text-anastasia-3 text-xl font-semibold">
                {currentStoryDetails.user.username}
              </p>
            </div>
            <Image
              src={currentStoryDetails.imageUrl}
              alt="Story"
              width={600}
              height={600}
              className="rounded-2xl object-cover"
            />
            <div className="flex justify-center items-center">
              {isUserStory && (
                <button
                  className="text-black text-2xl"
                  onClick={() => handleDeleteStory(currentStoryDetails.id)}
                >
                  <MdDeleteForever />
                </button>
              )}
              <p>{currentStoryDetails.caption}</p>
              <p>Viewer</p>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-col justify-start items-center bg-anastasia-3 rounded-xl border-2 border-anastasia-2 w-96 p-4 gap-3 transition-all duration-500  ${
            isViewedOpen ? "max-h-[575px]" : "max-h-fit"
          } overflow-hidden`}
        >
          <div className="flex justify-between items-center w-full">
            <h2 className="text-4xl">Viewers!</h2>
            <FaAngleDown
              onClick={handleViewersToggle}
              className={`text-4xl cursor-pointer transition-transform duration-100 ease-in-out ${
                isViewedOpen ? "rotate-180 " : ""
              }`}
            />
          </div>

          {isViewedOpen && (
            <div className="flex flex-col justify-start items-start w-full h-[600px] p-2 border-t border-white">
              {currentStoryViews.length > 0 ? (
                currentStoryViews.map((view) => (
                  <div
                    key={view.id}
                    className="flex justify-start items-center gap-2"
                  >
                    <Image
                      src={view.user.profilePictureUrl}
                      alt={view.user.username}
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <p>{view.user.name}</p>
                  </div>
                ))
              ) : (
                <p>No viewers yet.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryDetailsPage;
