import Navbar from "@/components/Navbar";
import Image from "next/image";
import React from "react";

const HomePage = () => {
  return (
    <div className="bg-anastasia-1 h-screen p-5">
      <div className="flex justify-center items-start gap-10">
        <Image src="/Logo-crop.png" alt="Logo" width={200} height={200} />
        <Navbar />
      </div>
    </div>
  );
};

export default HomePage;
