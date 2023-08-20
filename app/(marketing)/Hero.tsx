"use client";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useScroll from "@/lib/hooks/use-scroll";
import { Input } from "@/components/ui/input";
const Hero = () => {
  const scrolled = useScroll(50);

  return (
    <div className=" relative pt-20 ">
      <div className="absolute -right-[200px] bottom-0 translate-y-32 z-10 w-[50%] h-screen  ">
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />
      </div>
      <div className="absolute left-0 -translate-x-1/2  top-0 -translate-y-1/2 z-10 w-[50%] h-screen  ">
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />
      </div>
      {!scrolled && (
        // <div className="absolute bottom-10 left-1/2 -translate-x-1/2  w-fit px-4 pt-1 pb-3 h-fit flex flex-col gap-2 ">
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 border rounded-md w-fit px-4 pt-2 pb-3 h-fit flex flex-col gap-2 ">
          <div className="scroll-arrow" />
          <div className="scroll-arrow" />
        </div>
      )}
      <div className="grid grid-cols-2  py-10 container min-h-[90vh] max-w-screen-xl ">
        <div className="flex flex-col gap-10 mt-10 h-fit  top-[5%] relative ">
          <h1 className="text-6xl font-head ">
            The Perfect Book For Business Junkies
          </h1>
          <h2 className="font-body text-xl">
            Craving a little motivation? Open this book to dive into a world of
            riveting tales and lessons from history&apos;s most influential
            businessman.
          </h2>
          {/* <div className="flex gap-6">
            <Button size="lg" className=" text-white bg-theme1">
              Buy Now
            </Button>
            <Button variant="secondary" size="lg" className=" bg-theme1/10 ">
              Browse Books
            </Button>
          </div> */}
          <form className="flex gap-4 w-3/4 border border-black p-1 rounded-full bg-transparent  ">
            <Input
              type="email"
              placeholder="Want early access? Join our newsletter"
              className=" border-none"
            />
            <Button className="bg-theme2 text-white">Submit</Button>
          </form>
        </div>

        <div className="relative w-full h-full  ">
          {/* <div className="absolute left-0 z-10 h-8 w-8   ">
            <Image src="/image/dots1.svg" alt="logo" fill objectFit="contain" />
          </div>
          <div className="absolute right-10 bottom-20 z-10 h-8 w-8   ">
            <Image src="/image/dots2.svg" alt="logo" fill objectFit="contain" />
          </div> */}
          <div className="absolute rounded-full h-2 w-2 bg-theme1 top-[114px] left-[0px]" />
          <div className="absolute rounded-full h-1 w-1 bg-theme2 top-[140px] left-[26px]" />
          <div className="absolute rounded-full h-3 w-3 bg-theme3 top-[157px] left-[90px]" />
          <div className="absolute rounded-full h-3 w-3 bg-theme3 top-[57px] left-[20px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme4 top-[100px] left-[70px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme2 top-[162px] left-[60px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme1 top-[202px] left-[80px]" />

          <div className="absolute rounded-full h-2 w-2 bg-theme1 bottom-[220px] right-[80px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme4 bottom-[210px] right-[40px]" />
          <div className="absolute rounded-full h-1 w-1 bg-theme2 bottom-[240px] right-[80px]" />
          <div className="absolute rounded-full h-3 w-3 bg-theme3 bottom-[270px] right-[110px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme4 bottom-[250px] right-[120px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme2 bottom-[190px] right-[98px]" />
          <div className="absolute rounded-full h-2 w-2 bg-theme3 bottom-[160px] right-[38px]" />

          <div className="w-[400px] h-[85%] z-20 relative mx-auto">
            {/* <div className="h-24 absolute z-30 right-0 -translate-y-1/3  mx-auto">
              <Icons.star
                className=" h-full w-full z-10"
                color=" rgb(77 164 224)"
              />
              <h1 className="absolute top-1/2 -translate-x-1/2 left-1/2  w-[80%] -translate-y-1/2 z-20 text-[12px] text-center text-white font-extrabold ">
                Pre-Order Today
              </h1>
            </div> */}
            <Image
              src="/image/cover-shadow.svg"
              alt="logo"
              fill
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
