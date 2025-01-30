import FormRegister from "@/components/FormRegister";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center gap-2 text-black bg-anastasia-1 h-screen px-[44px] pt-[20px] pb-[100px] lg:pl-[29px] lg:pr-[42px] lg:py-[20px] ">
      <div className="w-full flex flex-col justify-between items-center gap-4">
        <Image src="/Logo.png" alt="Logo" width={400} height={400} />
        <h1 className="text-4xl font-bold mb-4">
          Capturing the Spark of Joy in Every Blink!
        </h1>
        <Link href="/">
          <div className="rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">
            <h3 className="text-xl text-black">Return to Landing Page!</h3>
          </div>
        </Link>
      </div>
      <FormRegister />
    </div>
  );
};

export default RegisterPage;
