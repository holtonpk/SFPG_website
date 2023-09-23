import React from "react";

const page = () => {
  return (
    <div className="pt-20 pb-20   ">
      <div className="bg-theme-blue/5 w-full  p-20 flex flex-col items-center relative">
        <h1 className="text-xl font-body font-semibold text-center">
          Short Form Books
        </h1>
        <h1 className="text-3xl font-body font-bold text-center">
          The
          <span className="decoration-theme-blue  underline ml-1 font-body">
            Origin
          </span>{" "}
          Story
        </h1>

        <p className="text-lg font-body mt-4 w-1/2 text-center">
          Our mission is simple: we&apos;re bringing short-form content to the
          book publishing industry. We believe in creating books that align with
          modern consumption habits while preserving the charm and depth of
          traditional reading. <br /> <br /> Our commitment is to publish
          compelling books filled with a compilation of short stories, each of
          which can be enjoyed within 15-20 minutes. It&apos;s the perfect
          balance for young readers seeking intriguing, quick-to-read stories
          without having to commit to a 500-page novel. We aim to make reading
          accessible, engaging, and appealing to a new generation of readers who
          live in a digital age characterized by instant gratification.
        </p>
      </div>
      <h1 className="text-3xl text-center font-medium mt-20">
        The{" "}
        <span className="text-theme-blue underline ml-1 font-body">
          Mission
        </span>{" "}
        that Drives Our Work Everyday
      </h1>
      <div className="bg-background border shadow-xl container mt-4 rounded-md p-8 w-1/2">
        <h1 className="text-2xl font-body font-semibold">
          Our mission is{" "}
          <span className="decoration-theme-blue  underline ml-1 font-body">
            to bring short-form content to the book publishing industry.
          </span>
        </h1>
        <p className="text-lg font-body mt-4">
          Our mission is simple: we&apos;re bringing short-form content to the
          book publishing industry. We believe in creating books that align with
          modern consumption habits while preserving the charm and depth of
          traditional reading. <br /> <br /> Our commitment is to publish
          compelling books filled with a compilation of short stories, each of
          which can be enjoyed within 15-20 minutes. It&apos;s the perfect
          balance for young readers seeking intriguing, quick-to-read stories
          without having to commit to a 500-page novel. We aim to make reading
          accessible, engaging, and appealing to a new generation of readers who
          live in a digital age characterized by instant gratification.
        </p>
        <h1 className="text-2xl font-head font-semibold mt-10">- SFPG Team</h1>
      </div>
    </div>
  );
};

export default page;
