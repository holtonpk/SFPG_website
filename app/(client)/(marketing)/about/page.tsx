import React from "react";
import Image from "next/image";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: siteConfig.pages.about.title,
  description: siteConfig.pages.about.description,
});
const Page = () => {
  return (
    <div className="pt-20 pb-20">
      <div
        id="about"
        className="bg-theme-blue/5 w-full p-20 flex flex-col items-center relative"
      >
        <Image src="/image/brush2.svg" alt="logo" fill objectFit="contain" />

        <h1 className="text-xl font-body font-semibold text-center">
          We are Short Form Books
        </h1>
        <h1 className="text-3xl font-body font-bold text-center">
          Here’s Our{" "}
          <span className="decoration-theme-blue underline font-body">
            Origin
          </span>{" "}
          Story
        </h1>

        <p className="text-lg font-body mt-4 w-1/2 text-center">
          Born from the vision of three Gen Z trailblazers, we&apos;re not just
          another company, we are three bookworms united by a passion for
          literature and fueled by a collective dissatisfaction with the old
          norms of publishing.
          <br />
          <br />
          Our generation, shaped by the beauty of short, captivating content,
          started a seismic shift in content consumption and we decided to
          revolutionize the book industry to align with this new paradigm.
          <br />
          <br />
          Witnessing the fading allure of 500 page novels and the magnetic pull
          of bite-sized stories, we took action. Enter Short Form Books: our
          revolutionary response to a generational call. Dive in, and experience
          the future of reading.
        </p>
      </div>
      <h1 className="text-3xl text-center font-medium mt-20">
        Our
        <span className="text-theme-blue underline ml-1 font-body">
          Mission
        </span>
      </h1>
      <div
        id="mission-content"
        className="bg-background border shadow-xl container mt-4 rounded-md p-8 w-1/2"
      >
        <h1 className="text-2xl font-body font-semibold">
          <span className="decoration-theme-blue underline ml-1 font-body">
            Bringing short-form content to the book publishing industry.
          </span>
        </h1>
        <p className="text-lg font-body mt-4">
          We believe in creating books that align with modern consumption habits
          while preserving the charm and depth of traditional reading. Short
          form books offer a compilation of short stories, each of which can be
          enjoyed in 15-20 minutes.
          <br />
          <br />
          It&apos;s the perfect balance for young readers seeking intriguing,
          quick-to-read stories without having to commit to a boring 500-page
          novel. We aim to make reading accessible, engaging, and appealing to a
          new generation of readers who live in a digital age characterized by
          instant gratification.
        </p>
        <h1 id="team" className="text-2xl font-head font-semibold mt-10">
          - The Short Form Books Family
        </h1>
      </div>
    </div>
  );
};

export default Page;
