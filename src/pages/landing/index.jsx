import React from "react";

const LandingPage = () => {
  return (
    <>
      <section className="relative bg-[url('/Background.jpg')] bg-cover bg-center h-screen">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 p-8 h-full flex justify-center items-center">
          {/* card photo 1 */}
          <div className="w-96 h-96 bg-slate-50 flex justify-center items-start py-4 px-4 rotate-12 absolute z-20 top-0 right-10">
            <div className="w-full h-64 shadow-inner bg-slate-200"></div>
          </div>
          {/* card photo 2 */}
          <div className="w-96 h-96 bg-slate-50 flex justify-center items-start py-4 px-4 -rotate-12 absolute z-20 -bottom-20 left-0">
            <div className="w-full h-64 shadow-inner bg-slate-200"></div>
          </div>
          <div className="w-[1000px] bg-anastasia-1 h-80 opacity-40"></div>
        </div>
      </section>
      <section className="bg-anastasia-3 h-screen relative z-0"></section>
    </>
  );
};

export default LandingPage;
