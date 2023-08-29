"use client";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useScroll from "@/lib/hooks/use-scroll";
import { Input } from "@/components/ui/input";
import { useStorage } from "@/context/storage";
import { useToast } from "@/components/ui/use-toast";

const Hero = () => {
  const scrolled = useScroll(50);

  return (
    <div className=" relative pt-8 lg:pt-20  ">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 md:-right-[200px] md:bottom-0 md:translate-y-32 z-10 w-full md:w-[50%] h-screen  ">
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
      <div className="gap-6 flex flex-col md:grid md:grid-cols-2  md:py-10 container min-h-[90vh] max-w-screen-xl relative  z-20">
        <div className="flex flex-col md:gap-10 md:mt-10 h-fit md:top-[5%] relative ">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-head text-center md:text-left ">
            The Perfect Book For Business Junkies
          </h1>
          <h2 className="block font-body text-[12px] mt-4 md:mt-0 md:text-base lg:text-xl text-center md:text-left">
            Craving a little motivation? Open this book to dive into a world of
            riveting tales and lessons from history&apos;s most influential
            businessman.
          </h2>
          <div className="md:block hidden ">
            <EmailForm />
          </div>
        </div>

        <div className=" sm:max-w-[60%] md:max-w-full mx-auto  relative w-full h-full  ">
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme1 top-[114px] lg:left-[0px] left-[0px]" />
          <div className="absolute rounded-full lg:h-1 lg:w-1 h-1 w-1 bg-theme2 top-[140px] lg:left-[26px] left-[16px]" />
          <div className="absolute rounded-full lg:h-3 lg:w-3 h-2 w-2 bg-theme3 top-[157px] lg:left-[90px] left-[70px]" />
          <div className="absolute rounded-full lg:h-3 lg:w-3 h-2 w-2 bg-theme3 top-[57px] lg:left-[20px] left-[20px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme4 top-[100px] lg:left-[70px] left-[50px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme2 top-[162px] lg:left-[60px] left-[40px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme1 top-[202px] lg:left-[80px] left-[60px]" />

          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme1 bottom-[220px] lg:right-[80px] right-[6px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme4 bottom-[210px] lg:right-[40px] right-[20px]" />
          <div className="absolute rounded-full lg:h-1 lg:w-1 h-1 w-1 bg-theme2 bottom-[240px] lg:right-[80px] right-[30px]" />
          <div className="absolute rounded-full lg:h-3 lg:w-3 h-2 w-2 bg-theme3 bottom-[270px] lg:right-[110px] right-[40px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme4 bottom-[250px] lg:right-[120px] right-[50px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme2 bottom-[190px] lg:right-[98px] right-[48px]" />
          <div className="absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme3 bottom-[160px] lg:right-[38px] right-[0px]" />

          <div className="w-[250px] md:w-[300px] lg:w-[400px] h-[40vh] md:h-[85%] md:top-[45%] md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2  z-20 relative md:absolute mx-auto">
            <Image
              src="/image/cover-shadow.png"
              alt="cover"
              fill
              objectFit="contain"
              className="ml-3"
            />
          </div>
        </div>
        <div className="md:hidden ">
          <EmailForm />
        </div>
      </div>
    </div>
  );
};

export default Hero;

const EmailForm = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { SignUpForEmailList } = useStorage()!;

  const { toast } = useToast();

  const SUBSCRIBE_TO = "XhGP4t";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    await fetch("/api/email-subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LIST: SUBSCRIBE_TO,
        EMAIL: emailRef.current!.value,
        SOURCE: "Homepage hero signup form",
      }),
    });

    setIsLoading(false);
    toast({
      title: "Thanks signing up for early access!",
      description: "We will notify you when the book is ready.",
    });
    emailRef.current!.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 flex  w-full md:w-3/4 border border-black p-1 rounded-full bg-transparent  relative z-30"
    >
      <Input
        ref={emailRef}
        type="email"
        autoComplete="email"
        placeholder="Want early access? Enter your email"
        className=" border-none text-[12px] md:text-base rounded-l-full"
      />
      <Button className="bg-theme2 text-white text-[12px] md:text-base hover:bg-theme1 z-30">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
};
