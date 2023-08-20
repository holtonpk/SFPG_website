"use client";

import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userAuthSchema } from "@/lib/validations/auth";
import * as z from "zod";

const Waitlist = () => {
  type FormData = z.infer<typeof userAuthSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit() {
    setIsLoading(true);
    console.log("subbmiting");
    // email storage
    // figure out react form submission
    // submit verification
  }

  return (
    <div className="bg-theme1/10 h-screen max-h-screen w-screen ">
      <div className="md:max-w-xl mx-auto relative h-screen p-4  w-screen ">
        <div className="absolute  top-0 left-1/2 -translate-x-1/2 z-10 w-screen md:w-[150%] h-screen  ">
          <Image src="/image/brush2.svg" alt="brush" fill objectFit="contain" />
        </div>
        <span className="text-2xl p-2 text-primary font-bold w-fit  flex items-center mx-auto ">
          <div className="h-7 w-7 relative mb-1 mr-2">
            <Icons.logo className="text-white" color="rgb(238 33 127)" />
          </div>
          <span className="ml-1 font-head text-theme2">Short Form Books</span>
        </span>
        <h1 className="font-head text-3xl font-bold text-center mt-4">
          The Perfect Book For Business Junkies
        </h1>

        <div className="translate-x-4 h-[40%] w-[70%] z-20 relative mx-auto mt-8">
          <Image
            src="/image/cover-shadow.svg"
            alt="book cover"
            fill
            objectFit="contain"
          />
        </div>
        <h2 className="capitalize text-theme1 mx-auto w-fit text-sm">
          Sign up for our Waitlist here
        </h2>
        <div className="scroll-arrow-theme mx-auto mt-3" />
        {errors?.email && (
          <p className="px-1 text-xs text-red-600 whitespace-nowrap">
            *{errors.email.message}
          </p>
        )}
        <form onSubmit={onSubmit} className="">
          <div className="border border-black rounded-full  flex mt-6 overflow-hidden relative z-20 p-1">
            <Input
              placeholder="Enter your email"
              className="w-full border-none"
              type="email"
              id="email"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />

            <Button
              className="rounded-full bg-theme1 text-white whitespace-nowrap border-none"
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
