"use client";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Display = () => {
  type DisplayedProduct = {
    title: string;
    description: string;
    image: string;
    href: string;
    color: string;
  };

  const displayedProducts: DisplayedProduct[] = [
    {
      title: "Business Failures and Biggest Scams",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme1",
    },
    {
      title: "Romance",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all. Learn about the biggest business failures and scams in history.Learn about the biggest business failures and scams in history.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme2",
    },
    {
      title: "Business Success Stories",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme3",
    },
    {
      title: "Story of every president ",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme4",
    },
  ];

  const [selectedCard, setSelectedCard] = React.useState(2);

  return (
    <div className="pt-20 relative pb-10  flex flex-col items-center ">
      <h1 className="text-theme1 font-head  text-6xl text-center relative z-20">
        Exciting Reads in Every Genre
      </h1>

      <div className="grid grid-cols-4  mx-auto relative z-10 mt-10 mb-4 justify-between w-[80%]   bg-white rounded-lg h-[432px]  p-4">
        {displayedProducts.map((product, i) => (
          <div
            onMouseEnter={() => setSelectedCard(i)}
            key={i}
            className="h-[350px] w-full relative flex flex-col items-center group "
          >
            <Link
              href={`${product.href}`}
              className="w-full h-full absolute  group z-20"
            />
            <div
              className={`w-full  rounded-lg relative p-2 delay-[100ms] flex items-center flex-col transition-all  duration-500 cursor-pointer
            ${
              i === selectedCard
                ? `bg-${product.color} py-4 h-[400px]`
                : " pt-0 h-[400px] "
            }
            `}
            >
              <Link
                href={product.href}
                className={`font-head   h-20  font-bold text-center text-base  w-full hover:underline  group-hover:underline delay-[100ms]
              ${i === selectedCard ? "text-white" : `black`}
              `}
              >
                {product.title}
              </Link>

              <div
                className={`relative z-10 p-4 py-6 rounded-md  w-full left-1/2 -translate-x-1/2  transition-all duration-500 bg-theme-1  delay-[100ms]
              ${
                i === selectedCard
                  ? "h-[350px] bg-white/10"
                  : "bg-theme1/10 h-[350px] "
              }
              `}
              >
                <div className="w-full h-full relative z-10">
                  <Image
                    src={product.image}
                    alt="cover"
                    fill
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="h-fit mt-4 relative w-full  gap-2 transition-all duration-100 justify-between items-center delay-[100ms] z-30 ">
                <Button
                  className={`w-full text-white  border-white  h-fit items-center delay-[100ms] 
                ${i === selectedCard ? " visible" : " invisible"}
                `}
                >
                  Jump the line
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button className="border-black">
        View All Books
        <Icons.arrowRight className="h-5 w-5 ml-4" />
      </Button>
    </div>
  );
};

export default Display;
