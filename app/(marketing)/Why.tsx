"use client";

import { Icons } from "@/components/icons";
import Image from "next/image";
import React from "react";

type WhyCard = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};

const Why = () => {
  const whyCards: WhyCard[] = [
    {
      icon: "barChart",
      title: "Short And To The Point ",
      description:
        "copy needed* lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: "learn",
      title: "Short And To The Point ",
      description:
        "copy needed* lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: "gauge",
      title: "Short And To The Point ",
      description:
        "copy needed* lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: "celebrate",
      title: "Short And To The Point ",
      description:
        "copy needed* lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <div className="relative overflow-hidden   pt-10 pb-10 z-20">
      <div className="container z-20 relative max-w-screen-xl ">
        <div className="grid grid-cols-2 items-center justify-between">
          <h1 className="text-4xl font-head text-theme1">
            About Short Form Books
          </h1>
          <p className="text- font-head text-black">
            Our mission is simple: we&apos;re bringing short-form content to the
            book publishing industry. We believe in creating books that align
            with modern consumption habits while preserving the charm and depth
            of traditional reading.
          </p>
        </div>
        <div className="grid grid-flow-col gap-3 mt-32 z-10 relative">
          {whyCards.map((card, i) => (
            <Cards
              key={i}
              card={card}
              i={i}
              selected={selectedCard}
              setSelectedCard={setSelectedCard}
            />
          ))}
        </div>
        {/* <div className="relative ">
          <div className="w-[400px] h-[300px] relative z-10 ">
            <Image
              src={"/image/open_book.svg"}
              alt="cover"
              fill
              objectFit="contain"
            />
          </div>
          <div className="w-[350px] h-[350px] bg-theme1 absolute top-0 left-0 -translate-x-6 translate-y-6"></div>
        </div> */}
        {/* <div className="">
          <h2 className="text-base text-neutral-300">About SFB</h2>
          <h1 className="text-3xl text-black font-bold capitalize font-head">
            A dynamic, new-age publishing company
          </h1>
          <div className="w-10 h-[2px] bg-theme1 mt-3"></div>
          <div className="flex flex-col mt-4 gap-4">
            <div className="flex gap-4">
              <div className="aspect-square rounded-full bg-white shadow-lg p-2 justify-center flex items-center h-fit w-fit">
                <Icons.book className="text-theme1 h-6 w-6 " />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold font-head">Short Content</h1>
                <p className="w-[1/2]">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="aspect-square rounded-full bg-white shadow-lg p-2 justify-center flex items-center h-fit w-fit">
                <Icons.book className="text-theme1 h-6 w-6 " />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold font-head">Short Content</h1>
                <p className="w-[1/2]">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et{" "}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="aspect-square rounded-full bg-white shadow-lg p-2 justify-center flex items-center h-fit w-fit">
                <Icons.book className="text-theme1 h-6 w-6 " />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold font-head">Short Content</h1>
                <p className="w-[1/2]">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et{" "}
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      <div className="absolute w-full  bg-white h-[70%] left-0 top-0" />
    </div>
  );
};

export default Why;

const Cards = ({
  card,
  i,
  selected,
  setSelectedCard,
}: {
  card: WhyCard;
  i: number;
  selected: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const Icon = Icons[card.icon];

  return (
    <div
      key={i}
      onMouseEnter={() => setSelectedCard(i)}
      className={`"h-[300px] w-[300px] rounded-lg shadow-lg bg-white border-t-4 flex flex-col gap-3 p-4 transition-all duration-300
      ${i === selected ? "border-t-theme1 -translate-y-12" : " translate-y-0"}
      `}
    >
      <Icon
        className={`${
          i === selected ? "text-theme1" : "text-black"
        }  h-8 w-8 mx-auto mt-5`}
      />
      <h1
        className={` text-2xl font-head text-center ${
          i === selected ? "text-theme1" : "text-black"
        }`}
      >
        {card.title}
      </h1>
      <p className="text-sm font-body text-center text-black mt-6">
        {card.description}
      </p>
    </div>
  );
};