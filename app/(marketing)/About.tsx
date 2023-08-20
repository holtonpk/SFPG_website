import React from "react";
import Image from "next/image";
import { Icons } from "@/components/icons";
const About = () => {
  return (
    <div className=" h-[80vh]  items-center justify-center relative overflow-hidden bg-white">
      <div className="h-[80vh] w-[90%] mx-auto items-center justify-center relative overflow-hidden gap-4 grid grid-cols-2">
        <div className="flex flex-col mx-auto w-full ">
          <h1 className="text-base font-bold font-head text-theme1 text-left">
            The Author
          </h1>
          <h1 className="text-3xl font-bold font-head text-black text-left">
            Mohamed Omar
          </h1>
          <p className="mt-8 text-body text-lg text-left w-full ">
            ** copy needed Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <div className="relative h-[120px]  w-[170px] mt-10">
            <Image
              src="/image/mo-sig.svg"
              alt="signature"
              fill
              objectFit="contain"
            />
            {/* <Icons.close className="absolute bottom-6 left-0 h-6 w-6" /> */}
            {/* <div className="absolute h-[2px] w-full bg-black bottom-4 left-0"></div> */}
          </div>

          {/* <div className="absolute left-1/2  top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-[50%] h-screen  ">
            <Image
              src="/image/brush3.svg"
              alt="logo"
              fill
              objectFit="contain"
            />
          </div> */}
        </div>
        <div className="w-full relative justify-center flex">
          <div className="w-[60%] border-theme1 border  aspect-square absolute -translate-y-2 translate-x-2 z-10" />
          <div className="w-[60%]  aspect-square bg-neutral-200 relative z-20"></div>
        </div>
      </div>
    </div>
  );
};

export default About;
