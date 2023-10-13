"use client";
import React from "react";
import { Icons } from "@/app/(client)/components/icons";
import { Button } from "@/app/(client)/components/ui/button";
import { LinkButton } from "@/app/(client)/components/ui/link";
import Image from "next/image";
import useScroll from "@/lib/hooks/use-scroll";
import { Input } from "@/app/(client)/components/ui/input";
import { useStorage } from "@/context/storage";
import { useToast } from "@/app/(client)/components/ui/use-toast";
import { siteConfig } from "@/config/site";
import coverImage from "@/public/image/cover-shadow2.png";
const Hero = () => {
  const scrolled = useScroll(50);

  const bookIsAvailable = true;

  return (
    <div className="hero relative pt-8 lg:pt-20" id="hero">
      <div
        id="hero-background1"
        className="h hero-background--top absolute left-1/2 -translate-x-1/2 md:-right-[200px] md:bottom-0 md:translate-y-32 z-10 w-full md:w-[50%] h-screen"
      >
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />
      </div>
      <div
        id="hero-background2"
        className=" hero-background--bottom absolute left-0 -translate-x-1/2 top-0 -translate-y-1/2 z-10 w-[50%] h-screen"
      >
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />
      </div>
      {!scrolled && (
        <div
          className="hero-arrow absolute bottom-10 left-1/2 -translate-x-1/2 border rounded-md w-fit px-4 pt-2 pb-3 h-fit flex flex-col gap-2"
          id="hero-arrow"
        >
          <div className="scroll-arrow" id="scroll-arrow-1" />
          <div className="scroll-arrow" id="scroll-arrow-2" />
        </div>
      )}
      <div
        className="gap-6 flex flex-col md:grid md:grid-cols-2 md:py-10 container min-h-[90vh] max-w-screen-xl relative z-20"
        id="hero-content"
      >
        <div className="hero-content__text flex flex-col md:gap-10 md:mt-10 h-fit md:top-[5%] relative">
          <h1
            className="hero-title text-3xl md:text-5xl lg:text-6xl font-head text-center md:text-left text-test"
            id="hero-title"
          >
            The Perfect Book For Business Junkies
          </h1>
          <h2
            className="hero-subtitle block font-body text-[12px] mt-4 md:mt-0 md:text-base lg:text-xl text-center md:text-left"
            id="hero-subtitle"
          >
            Craving a little motivation? Open this book to dive into a world of
            riveting tales and lessons from history&apos;s most influential
            businessman.
          </h2>
          {bookIsAvailable ? (
            <div className="md:flex gap-4 hidden" id="buy-now-button">
              <LinkButton
                href={
                  "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories"
                }
                variant="blue"
                className=" text-xl p-6"
              >
                Order Book
                {/* <Icons.arrowRight className="ml-2 h-6 w-6" /> */}
              </LinkButton>
            </div>
          ) : (
            <div className="md:block hidden" id="email-form">
              <EmailForm />
            </div>
          )}
        </div>

        <div
          className="hero-image sm:max-w-[60%] md:max-w-full mx-auto relative w-full h-full"
          id="hero-image"
        >
          <div
            className="circle circle-1 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-blue top-[114px] lg:left-[0px] left-[0px]"
            id="circle-1"
          />
          <div
            className="circle circle-2 absolute rounded-full lg:h-1 lg:w-1 h-1 w-1 bg-theme-pink top-[140px] lg:left-[26px] left-[16px]"
            id="circle-2"
          />
          <div
            className="circle circle-3 absolute rounded-full lg:h-3 lg:w-3 h-2 w-2 bg-theme-purple top-[157px] lg:left-[90px] left-[70px]"
            id="circle-3"
          />
          <div
            className="circle circle-4 absolute rounded-full lg:h-3 lg:w-3 h-2 w-2 bg-theme-purple top-[57px] lg:left-[20px] left-[20px]"
            id="circle-4"
          />
          <div
            className="circle circle-5 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-yellow top-[100px] lg:left-[70px] left-[50px]"
            id="circle-5"
          />
          <div
            className="circle circle-6 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-pink top-[162px] lg:left-[60px] left-[40px]"
            id="circle-6"
          />
          <div
            className="circle circle-7 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-blue top-[202px] lg:left-[80px] left-[60px]"
            id="circle-7"
          />

          <div
            className="circle circle-8 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-blue bottom-[220px] lg:right-[80px] right-[6px]"
            id="circle-8"
          />
          <div
            className="circle circle-9 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-yellow bottom-[210px] lg:right-[40px] right-[20px]"
            id="circle-9"
          />
          <div
            className="circle circle-10 absolute rounded-full lg:h-1 lg:w-1 h-1 w-1 bg-theme-pink bottom-[240px] lg:right-[80px] right-[30px]"
            id="circle-10"
          />
          <div
            className="circle circle-11 absolute rounded-full lg:h-3 lg:w-3 h-2 w-2 bg-theme-purple bottom-[270px] lg:right-[110px] right-[40px]"
            id="circle-11"
          />
          <div
            className="circle circle-12 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-yellow bottom-[250px] lg:right-[120px] right-[50px]"
            id="circle-12"
          />
          <div
            className="circle circle-13 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-pink bottom-[190px] lg:right-[98px] right-[48px]"
            id="circle-13"
          />
          <div
            className="circle circle-14 absolute rounded-full lg:h-2 lg:w-2 h-1 w-1 bg-theme-purple bottom-[160px] lg:right-[38px] right-[0px]"
            id="circle-14"
          />

          <div
            className="w-[250px] md:w-[300px] lg:w-[400px] h-[40vh] md:h-[85%] md:top-[45%] md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2 z-20 relative md:absolute mx-auto"
            id="hero-image-container"
          >
            <Image
              id={"hero-image-cover"}
              src={coverImage}
              alt="cover"
              fill
              objectFit="contain"
              sizes="(max-width: 768px) 100vw, 300px"
              className="ml-3"
              loading="eager"
            />
          </div>
        </div>
        {bookIsAvailable ? (
          <div className="flex gap-4 md:hidden" id="buy-now-button">
            <LinkButton
              href={
                "/books/shop/snapshots-of-success-the-50-greatest-business-success-stories"
              }
              variant="blue"
              className=" text-xl p-6 w-full"
            >
              Buy Now
            </LinkButton>
          </div>
        ) : (
          <div className="md:hidden" id="email-form-mobile">
            <EmailForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;

const EmailForm = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit", document.referrer);

    setIsLoading(true);
    await fetch("/api/email-subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LIST: siteConfig.emailLists.book1,
        EMAIL: emailRef.current!.value,
        // SOURCE: { source: "Homepage hero signup form", referrer: "test" },
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
    <form
      id="email-form"
      onSubmit={handleSubmit}
      className="gap-4 flex  w-full md:w-3/4 border border-black p-1 rounded-full bg-transparent  relative z-30"
    >
      <Input
        id="email-input"
        ref={emailRef}
        type="email"
        autoComplete="email"
        placeholder="Want early access? Enter your email"
        className=" border-none text-[12px] md:text-base rounded-l-full"
      />
      <Button
        id="email-submit"
        variant={"pink"}
        className=" text-[12px] md:text-base z-30"
      >
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
};
