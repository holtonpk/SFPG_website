import React from "react";
import Image from "next/image";
import techImage from "@/public/image/tech.png";
import { Icons } from "@/components/icons";
const page = () => {
  return (
    <div className="pt-20 pb-32">
      <div className="flex flex-col items-center py-20 bg-theme-blue/5 container">
        <h1 className="text-3xl font-body   text-center">
          <span className="text-red-500 text-[12px]">b1</span>
          Short Form Books
        </h1>
        <h2 className="text-5xl w-3/4 font-body font-medium text-center ">
          <span className="text-red-500 text-[12px]">b2</span>
          We can&apos;t wait for you to
          <span className="underline text-theme-blue ml-4">join us</span> on
          this exciting journey.
        </h2>
      </div>
      <div className="flex flex-col items-center py-20  container relative">
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />

        <h2 className="text-2xl font-bold w-3/4 font-body  text-center ">
          <span className="text-red-500 text-[12px]">b3</span>
          Whats behind
          <span className="text-theme-blue ml-2">Short Form Books</span>
        </h2>
        <p className="w-1/2 text-center mt-4">
          <span className="text-red-500 text-[12px]">b4</span>
          *needs copy Starting with business niche stories, we aim to deliver
          compelling narratives from successful founders that resonate with
          young readers.
        </p>
      </div>
      <div className="container">
        <div className="container grid grid-cols-2 w-3/4 items-center">
          <div className="relative flex flex-col gap-3">
            <h1 className="text-4xl">
              <span className="text-red-500 text-[12px]">b5</span>
              Our Impact
            </h1>
            <div className="w-8 bg-theme-blue h-1"></div>
            <p>
              <span className="text-red-500 text-[12px]">b6</span>
              In a landscape where traditional book companies are struggling to
              stay relevant, Short Form Books is a breath of fresh air,
              representing the new evolution of the book industry. The liberty
              to pick up our books, flip to any story, and consume it in its
              entirety in one sitting is our gift to our audience. By bringing
              this exciting twist to the book space, we&apos;re offering an
              innovative model that blends the contemporary love for short-form
              content with the time-honored tradition of reading books. In our
              eyes, the book industry is far from dying; it&apos;s evolving. And
              we are that evolution.
            </p>
          </div>
          <div className="relative w-full h-[400px]">
            <Image
              src={techImage}
              alt="logo"
              fill
              objectFit="contain"
              sizes={"(max-width: 768px) 100vw, 300px"}
            />
          </div>
        </div>
        <div className="flex flex-col items-center py-20  container relative">
          <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />

          <h2 className="text-4xl  w-3/4 font-body  text-center ">
            <span className="text-red-500 text-[12px]">b7</span>
            Our Books
          </h2>
          <p className="w-1/2 text-center mt-4">
            <span className="text-red-500 text-[12px]">b8</span>
            Starting with business niche stories, we aim to deliver compelling
            narratives from successful founders that resonate with young
            readers.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-20">
          <div className="w-full h-[200px] bg-background shadow-lg rounded-md relative p-4">
            <div className="h-20 w-20 rounded-full bg-theme-blue shadow-lg flex justify-center items-center absolute top-0 -translate-y-1/2 left-4">
              <Icons.circuitBoard className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-2xl mt-10 text-primary">
              <span className="text-red-500 text-[12px]">b9</span>
              Born from the digital age
            </h1>
            <p className="text-base text-primary">
              <span className="text-red-500 text-[12px]">b10</span>
              Founded by three young enthusiasts with a knack for modern media,
              Short Form Books fuse the allure of traditional books with the
              rapid content style of the modern era.
            </p>
          </div>
          <div className="w-full h-[200px] bg-background shadow-lg rounded-md relative p-4">
            <div className="h-20 w-20 rounded-full bg-theme-blue shadow-lg flex justify-center items-center absolute top-0 -translate-y-1/2 left-4">
              <Icons.graduationCap className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-2xl mt-10 text-primary">
              <span className="text-red-500 text-[12px]">b11</span>
              We are changing how you read
            </h1>
            <p className="text-base text-primary">
              <span className="text-red-500 text-[12px]">b12</span>
              The liberty to pick up our books, flip to any story, and consume
              it in one sitting is our gift to readers today. No more boring 500
              page novels to get to the punchline.
            </p>
          </div>
          <div className="w-full h-[200px] bg-background shadow-lg rounded-md relative p-4">
            <div className="h-20 w-20 rounded-full bg-theme-blue shadow-lg flex justify-center items-center absolute top-0 -translate-y-1/2 left-4">
              <Icons.bookX className="h-14 w-14 text-white" />
            </div>
            <h1 className="text-2xl mt-10 text-primary">
              <span className="text-red-500 text-[12px]">b13</span>
              Ditch the long reads
            </h1>
            <p className="text-base text-primary">
              <span className="text-red-500 text-[12px]">b14</span>
              Dive into stories curated for the modern reader. From inspiring
              business tales to spine-tingling conspiracies, our diverse range
              is here to captivate your curiosity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
