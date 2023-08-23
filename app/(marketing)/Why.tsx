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
      title: "Ditch the long reads.",
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

  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <div className="relative overflow-hidden   pt-10 pb-10 z-20">
      <div className="md:container  z-20 relative  md:max-w-screen-xl ">
        <div className="container grid grid-cols-2 items-center justify-between gap-2">
          <h1 className="lg:text-4xl text-2xl font-head text-theme1">
            About Short Form Books
          </h1>
          <p className="text-[12px] lg:text-base font-head text-black">
            Our mission is simple: we&apos;re bringing short-form content to the
            book publishing industry. We believe in creating books that align
            with modern consumption habits while preserving the charm and depth
            of traditional reading.
          </p>
        </div>
        <div
          id="scrollBox"
          className=" max-w-screen-xl no-scrollbar overflow-scroll md:overflow-hidden  px-20 md:px-0 snap-x"
        >
          <div className="grid grid-flow-col md:grid-cols-4 gap-6 md:gap-3 mt-32 z-10 relative  w-fit md:w-full">
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
        </div>
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

  const [centerPosition, setCenterPosition] = React.useState(i == 0 ? 0 : 1000);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      const center = window.innerWidth / 2;
      const card = cardRef.current;
      if (card) {
        const cardPosition = card.getBoundingClientRect().left;
        const cardCenter = cardPosition + card.offsetWidth / 2;
        const distance = center - cardCenter;
        setCenterPosition(distance);
      }
    };

    const scrollBox = document.getElementById("scrollBox");
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => scrollBox.removeEventListener("scroll", handleScroll);
    }
  }, [i]);

  return (
    <>
      <div
        ref={cardRef}
        className={`snap-centers md:hidden h-[300px] w-[300px] md:w-full rounded-lg shadow-lg bg-white border-t-4 flex flex-col gap-3 p-4 transition-all duration-300
      ${
        centerPosition < 150 && centerPosition > -150
          ? "border-t-theme1 -translate-y-12 "
          : "translate-y-0"
      }
      `}
      >
        <Icon
          className={`
          ${
            centerPosition < 150 && centerPosition > -150
              ? "text-theme1"
              : "text-black"
          }
        }  h-8 w-8 mx-auto mt-5`}
        />
        <h1
          className={` text-2xl font-head text-center
          ${
            centerPosition < 150 && centerPosition > -150
              ? "text-theme1"
              : "text-black"
          }
        }`}
        >
          {card.title}
        </h1>
        <p className="text-sm font-body text-center text-black mt-6">
          {card.description}
        </p>
      </div>
      <div
        onMouseEnter={() => setSelectedCard(i)}
        className={`md:flex hidden h-fit w-[300px] md:w-full rounded-lg shadow-lg bg-white border-t-4 flex-col gap-3 p-4 transition-all duration-300
     ${
       i === selected
         ? "md:border-t-theme1 md:-translate-y-12"
         : "md:translate-y-0"
     }
  
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
    </>
  );
};
