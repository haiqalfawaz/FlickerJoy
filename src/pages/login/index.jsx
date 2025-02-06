import React from "react";
import FormLogin from "@/components/FormLogin";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center justify-evenly items-center gap-2 text-black bg-anastasia-1 lg:h-screen min-h-screen px-[30px] pt-[20px] pb-[10px] lg:pl-[29px] lg:pr-[42px] lg:py-[20px] ">
      <div className="w-full flex flex-col justify-between items-center gap-4">
        <Image
          src="/Logo-crop.png"
          alt="Logo"
          width={400}
          height={400}
          className="w-48 h-auto sm:w-64 md:w-80 lg:w-96 xl:w-[400px] mx-auto"
        />
        <h1 className="lg:text-4xl text-xl text-center font-bold">
          Capturing the Spark of Joy in Every Blink!
        </h1>
      </div>
      <FormLogin />
    </div>
  );
};

export default LoginPage;
