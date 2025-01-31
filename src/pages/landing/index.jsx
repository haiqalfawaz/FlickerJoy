import Image from "next/image";
import React from "react";
import Link from "next/link";

// Import Icons
import { MdCameraRoll } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";

const LandingPage = () => {
  return (
    <>
      <section className="relative bg-[url('/Background.jpg')] bg-cover bg-center h-screen">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 p-8 h-full flex justify-center items-center">
          {/* card photo 1 */}
          <div className="w-96 h-96 bg-slate-50 flex justify-center items-start py-4 px-4 rotate-12 absolute z-20 top-0 right-12 shadow-xl hover:scale-105 transition-all duration-200">
            <div className="w-full h-64 shadow-inner bg-slate-200"></div>
          </div>
          {/* card photo 2 */}
          <div className="w-96 h-96 bg-slate-50 flex justify-center items-start py-4 px-4 -rotate-12 absolute z-20 -bottom-36 left-0 shadow-xl hover:scale-105 transition-all duration-200">
            <div className="w-full h-64 shadow-inner bg-slate-200"></div>
          </div>
          <div className="w-[1000px] bg-anastasia-1 h-fit px-2 py-4  opacity-85 rounded-lg flex flex-col justify-center items-center gap-5">
            <Image src="/Logo-crop.png" alt="logo" width={200} height={200} />
            <h1 className="text-3xl text-black">
              A Silent Story, Told in Every Frame.
            </h1>
            <div className="flex justify-center items-center">
              <div className="place-items-center p-2  border-r-2 border-black space-y-3">
                <h4 className="text-xl font-semibold text-black">
                  Don't have an account yet?
                </h4>
                <p className="text-base font-light text-black text-center">
                  Sign up now to start sharing your memories and explore new
                  ones!
                </p>
                <Link href="/register">
                  <button className="p-2 border border-anastasia-2 rounded-lg text-anastasia-2 bg-anastasia-4 shadow-[5px_5px_0px_black] active:shadow-none w-72">
                    Sign Up
                  </button>
                </Link>
              </div>
              <div className="place-items-center p-2  space-y-3">
                <h4 className="text-xl font-semibold text-black">
                  Already have an account?
                </h4>
                <p className="text-base font-light text-black text-center">
                  Log in to continue sharing your stories and connect with
                  others. ones!
                </p>
                <Link href="/login">
                  <button className="p-2 border border-anastasia-2 rounded-lg text-anastasia-2 bg-anastasia-4 shadow-[5px_5px_0px_black] active:shadow-none w-72">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-anastasia-3 min-h-screen relative z-0 p-6">
        <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
          <div className="flex justify-between items-center gap-10">
            <div className="space-y-2">
              <h2 className="text-white text-5xl font-mono">
                Preserve Your Memories
              </h2>
              <p className="text-white text-lg font-sans">
                Flickerjoy makes it easy to capture and store your most
                cherished moments. Whether it's a family gathering, <br /> a
                vacation, or a simple day with friends, you can save and relive
                those memories anytime, anywhere.
              </p>
            </div>
            <div className="w-96 h-96 bg-anastasia-1  text-black flex justify-center items-center text-9xl hover:text-[140px] rounded-lg hover:rounded-2xl hover:shadow-[7px_7px_0px_black] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 border-2 border-black rotate-2 border-dashed">
              <MdCameraRoll />
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="w-96 h-96 bg-anastasia-1 text-black flex justify-center items-center text-9xl hover:text-[140px] rounded-lg hover:rounded-2xl hover:shadow-[-7px_7px_0px_black] hover:-translate-y-2 hover:translate-x-2 transition-all duration-300 border-2 border-black -rotate-2 border-dashed ">
              <LuNotebookPen />
            </div>
            <div className="space-y-2">
              <h2 className="text-white text-5xl font-mono">
                Share Your Story
              </h2>
              <p className="text-white text-lg font-sans">
                With Flickerjoy, you can share your personal memories with those
                who matter most. Connect with friends and family, <br /> and let
                them experience your special moments through photos and
                videos—creating a digital scrapbook of your life.
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <div className="space-y-2">
              <h2 className="text-white text-5xl font-mono">
                Preserve Your Memories
              </h2>
              <p className="text-white text-lg font-sans">
                Explore the world through the eyes of others. Flickerjoy lets
                you dive into a sea of <br />
                unique memories shared by users from all over the globe, giving
                you endless inspiration and the opportunity <br /> to connect
                with people who share similar experiences.
              </p>
            </div>
            <div className="w-96 h-96 bg-anastasia-1 text-black flex justify-center items-center text-9xl hover:text-[140px] rounded-lg hover:rounded-2xl border-2 border-black rotate-2 hover:shadow-[7px_7px_0px_black] hover:-translate-y-2 hover:-translate-x-2 transition-all duration-300 border-dashed ">
              <BsGlobeCentralSouthAsia />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingPage;
