"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/app/(client)/components/ui/input";
import { Button } from "@/app/(client)/components/ui/button";
import { Icons } from "@/app/(client)/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validations/auth";
import * as z from "zod";
import { useToast } from "@/app/(client)/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import coverImage from "@/public/image/cover-shadow2.png";

const Waitlist = () => {
  const SUBSCRIBE_TO = "XhGP4t";

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    await fetch("/api/email-subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LIST: siteConfig.emailLists.book1,
        EMAIL: emailRef.current!.value,
        SOURCE: document.referrer,
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
    <div className="bg-background h-screen max-h-screen w-screen ">
      <div className="md:max-w-xl mx-auto relative h-screen p-4  w-screen ">
        <div className="absolute  top-0 left-1/2 -translate-x-1/2 z-10 w-screen md:w-[150%] h-screen  ">
          <Image src="/image/brush2.svg" alt="brush" fill objectFit="contain" />
        </div>
        <span className="text-2xl p-2 text-primary font-bold w-fit  flex items-center mx-auto ">
          <div className="h-12 w-12 relative ">
            <Icons.logo className="text-white" color="rgb(238 33 127)" />
          </div>
          <span className="ml-1 font-head text-theme-pink">
            Short Form Books
          </span>
        </span>
        <h1 className="font-head text-3xl font-bold text-center mt-4">
          The Perfect Book For Business Junkies
        </h1>

        <div className="translate-x-4 h-[40%] w-[70%] z-20 relative mx-auto mt-8">
          <Image
            src={coverImage}
            alt="book cover"
            fill
            objectFit="contain"
            loading="eager"
          />
        </div>
        <h2 className="capitalize text-theme-blue mx-auto w-fit text-sm">
          Sign up for our Waitlist here
        </h2>
        <div className="scroll-arrow-theme mx-auto mt-3" />

        <form onSubmit={handleSubmit} className="">
          <div className="border border-black rounded-full  flex mt-6 overflow-hidden relative z-20 p-1">
            <Input
              ref={emailRef}
              placeholder="Enter your email"
              className="w-full border-none"
              type="email"
              id="email"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
            />

            <Button
              className="rounded-full bg-theme-blue text-white whitespace-nowrap border-none"
              disabled={isLoading}
            >
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Waitlist;
