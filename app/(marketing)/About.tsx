"use client";

import { Icons } from "@/components/icons";
import Image from "next/image";
import React, { use, useEffect } from "react";
import { useLockBody } from "@/lib/hooks/use-lock-body";
type WhyCard = {
  icon: keyof typeof Icons;
  title: string;
  description: string;
};
const whyCards: WhyCard[] = [
  {
    icon: "circuitBoard",
    title: "Born from the digital age",
    description:
      "Founded by three young enthusiasts with a knack for modern media, Short Form Books fuse the allure of traditional books with the rapid content style of the modern era.",
  },
  {
    icon: "graduationCap",
    title: "We are changing how you read",
    description:
      "The liberty to pick up our books, flip to any story, and consume it in one sitting is our gift to readers today. No more boring 500 page novels to get to the punchline.",
  },
  {
    icon: "bookX",
    title: "Ditch the long reads",
    description:
      "Filled with a compilation of short stories that can be enjoyed in 15-20 minutes, Short Form Books offers the perfect escape for readers seeking captivating, quick-to-read stories.",
  },
  {
    icon: "celebrate",
    title: "Relevant and captivating stories",
    description:
      "Dive into stories curated for the modern reader. From inspiring business tales to spine-tingling conspiracies, our diverse range is here to captivate your curiosity.",
  },
];

const About = () => {
  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <div
      id="About"
      className=" overflow-hidden relative top-0  h-fit pb-10    pt-10 z-40"
    >
      <div className="md:container relative md:top-20  z-20  flex flex-col md:max-w-screen-xl ">
        <div className="container grid md:grid-cols-2 items-center justify-between gap-4 md:gap-2">
          <h1 className="lg:text-4xl text-center md:text-left text-2xl font-head text-theme1">
            About Short Form Books
          </h1>
          <p className="text-[12px] text-center md:text-left lg:text-base font-head text-black">
            Our mission is simple: we&apos;re bringing short-form content to the
            book publishing industry. We believe in creating books that align
            with modern consumption habits while preserving the charm and depth
            of traditional reading.
          </p>
        </div>
        <div
          id="mobileScrollBox"
          className="md:hidden max-w-screen-xl h-fit px-20 flex justify-center"
        >
          <div className="grid gap-10 mt-10 z-10 relative items-center mx-auto w-fit ">
            {whyCards.map((card, i) => (
              <MobileCard key={i} card={card} i={i} />
            ))}
          </div>
        </div>

        <div
          id="desktopScrollBox"
          className="md:block hidden max-w-screen-xl no-scrollbar  overflow-hidden  px-0 snap-x"
        >
          <div className="grid grid-cols-4  gap-3 mt-32 z-10 relative w-full">
            {whyCards.map((card, i) => (
              <DesktopCard
                key={i}
                card={card}
                i={i}
                selected={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute w-full  bg-white h-full md:h-[70%] left-0 top-0" />
    </div>
  );
};

export default About;

const DesktopCard = ({
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
    <div className=" h-[368px] relative snap-center px-3 md:px-0 ">
      <div
        onMouseEnter={() => setSelectedCard(i)}
        className={`flex h-[320px] w-full  rounded-lg shadow-lg bg-white border-t-4 flex-col gap-3 p-4 transition-all duration-300
     ${i === selected ? "border-t-theme1 -translate-y-12" : "translate-y-0"}
  
     `}
      >
        <Icon
          className={`${i === selected ? "text-theme1" : "text-black"}

       }  h-8 w-8 mx-auto mt-5`}
        />
        <h1
          className={`text-base lg:text-2xl font-head text-center ${
            i === selected ? "text-theme1" : "text-black"
          }
       }`}
        >
          {card.title}
        </h1>
        <p className="text-[12px] lg:text-sm font-body text-center text-black lg:mt-6">
          {card.description}
        </p>
      </div>
    </div>
  );
};

const MobileCard = ({ card, i }: { card: WhyCard; i: number }) => {
  const [displayed, setDisplayed] = React.useState(false);

  const [centerPosition, setCenterPosition] = React.useState(i == 0 ? 0 : 1000);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const Icon = Icons[card.icon];

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const card = cardRef.current?.getBoundingClientRect().top;
    if (card) {
      card < window.innerHeight * 0.75 && setDisplayed(true);
      card > window.innerHeight * 0.75 && setDisplayed(false);
    }
  };

  return (
    <div
      ref={cardRef}
      className={`snap-centers relative  md:hidden bottom-0 h-[300px] w-[300px] md:w-full rounded-lg shadow-lg bg-white border-t-4 flex flex-col gap-3 p-4 transition-all duration-300
      ${
        displayed
          ? "border-t-theme1 -translate-x-0 "
          : i % 2 == 0
          ? "-translate-x-20 opacity-0"
          : "translate-x-20 opacity-0"
      }
      `}
    >
      <Icon
        className={`
          ${displayed ? "text-theme1" : "text-black"}
        }  h-8 w-8 mx-auto mt-5`}
      />
      <h1
        className={` text-2xl font-head text-center
          ${displayed ? "text-theme1" : "text-black"}
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
