import React from "react";
import Image from "next/image";
import techImage from "@/public/image/tech.png";
import { Icons } from "@/app/(client)/components/icons";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: siteConfig.pages.books.title,
  description: siteConfig.pages.books.description,
});

const Page = () => {
  return (
    <div className="pt-20 pb-32">
      <div
        id="block1"
        className="flex flex-col items-center py-20 bg-theme-blue/5 container"
      >
        <h1 id="block1__title" className="text-3xl font-body text-center">
          Welcome to Short Form Books
        </h1>
        <h2
          id="block1__subtitle"
          className="text-5xl w-3/4 font-body font-medium text-center"
        >
          A world of{" "}
          <span
            id="block1__subtitle-link"
            className="underline text-theme-blue "
          >
            captivating short reads
          </span>{" "}
          for the modern bookworm.
        </h2>
      </div>
      <div
        id="block2"
        className="flex flex-col items-center py-20 container relative"
      >
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />

        <h2
          id="block2__title"
          className="text-2xl font-bold w-3/4 font-body text-center"
        >
          Why
          <span id="block2__title-highlight" className="text-theme-blue ml-2">
            Short Form Books
          </span>
        </h2>
        <p id="block2__description" className="w-1/2 text-center mt-4">
          We saw the shift in how our generation consumed content - short,
          quick, and digital - and decided to disrupt the old fashioned book
          industry to align with this new paradigm. Gone are the days of 500
          page novels. With Short Form Books, you get compelling books filled
          with a compilation of short stories, each of which can be enjoyed in
          15-20 minute intervals.
        </p>
      </div>
      <div className="container">
        <div className="container grid grid-cols-2 w-3/4 items-center">
          <div id="block3" className="relative flex flex-col gap-3">
            <h1 id="block3__title" className="text-4xl">
              Ditch The Long Reads
            </h1>
            <div className="w-8 bg-theme-blue h-1"></div>
            <p id="block3__description">
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
              sizes="(max-width: 768px) 100vw, 300px"
            />
          </div>
        </div>
        <div
          id="block4"
          className="flex flex-col items-center py-20 container relative"
        >
          <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />

          <h2
            id="block4__title"
            className="text-4xl w-3/4 font-body text-center"
          >
            About Short Form Books
          </h2>
          <p id="block4__description" className="w-1/2 text-center mt-4">
            A new-age publishing company bringing the digital era&apos;s
            short-form content trend to traditional books.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-20">
          <div
            id="block5"
            className="w-full h-[200px] bg-background shadow-lg rounded-md relative p-4"
          >
            <div className="h-20 w-20 rounded-full bg-theme-blue shadow-lg flex justify-center items-center absolute top-0 -translate-y-1/2 left-4">
              <Icons.circuitBoard className="h-14 w-14 text-white" />
            </div>
            <h1 id="block5__title" className="text-2xl mt-10 text-primary">
              Born from the digital age
            </h1>
            <p id="block5__description" className="text-base text-primary">
              Founded by three young enthusiasts with a knack for modern media,
              Short Form Books fuse the allure of traditional books with the
              rapid content style of the modern era.
            </p>
          </div>
          <div
            id="block6"
            className="w-full h-[200px] bg-background shadow-lg rounded-md relative p-4"
          >
            <div className="h-20 w-20 rounded-full bg-theme-blue shadow-lg flex justify-center items-center absolute top-0 -translate-y-1/2 left-4">
              <Icons.graduationCap className="h-14 w-14 text-white" />
            </div>
            <h1 id="block6__title" className="text-2xl mt-10 text-primary">
              We are changing how you read
            </h1>
            <p id="block6__description" className="text-base text-primary">
              The liberty to pick up our books, flip to any story, and consume
              it in one sitting is our gift to readers today. No more boring 500
              page novels to get to the punchline.
            </p>
          </div>
          <div
            id="block7"
            className="w-full h-[200px] bg-background shadow-lg rounded-md relative p-4"
          >
            <div className="h-20 w-20 rounded-full bg-theme-blue shadow-lg flex justify-center items-center absolute top-0 -translate-y-1/2 left-4">
              <Icons.bookX className="h-14 w-14 text-white" />
            </div>
            <h1 id="block7__title" className="text-2xl mt-10 text-primary">
              Instant satisfaction in every genre
            </h1>
            <p id="block7__description" className="text-base text-primary">
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

export default Page;
