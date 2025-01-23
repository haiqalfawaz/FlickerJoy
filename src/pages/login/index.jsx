import React from "react";
import FormLogin from "@/components/FormLogin";
import Image from "next/image";

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-black bg-anastasia-1 h-screen px-[44px] pt-[20px] pb-[100px] lg:pl-[29px] lg:pr-[42px] lg:py-[20px] ">
      <div className="w-full flex flex-col justify-between items-center gap-4">
        <Image src="/Logo.png" alt="Logo" width={400} height={400} />
        <h1 className="text-4xl font-bold">
          Capturing the Spark of Joy in Every Blink!
        </h1>
      </div>
      <FormLogin />
    </div>
  );
};

export default LoginPage;
