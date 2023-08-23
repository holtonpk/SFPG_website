"use client";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type DisplayedProduct = {
  title: string;
  id: number;
  description: string;
  image: string;
  href: string;
  color: string;
};

const Display = () => {
  const displayedProducts: DisplayedProduct[] = [
    {
      id: 1,
      title: "Business Failures and Biggest Scams",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme1",
    },
    {
      id: 2,

      title: "Romance",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all. Learn about the biggest business failures and scams in history.Learn about the biggest business failures and scams in history.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme2",
    },
    {
      id: 3,

      title: "Business Success Stories",
      description:
        "Learn about the biggest business failures and scams in history. From the Enron scandal to the Theranos fraud, we cover it all.",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme3",
    },
    {
      id: 4,

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
      <h1 className="text-theme1 font-head  text-2xl lg:text-5xl text-center relative z-20">
        Exciting Reads in Every Genre
      </h1>
      <div
        id="DisplayScrollBox"
        className="w-screen overflow-scroll px-10 no-scrollbar"
      >
        <div className="grid md:grid-cols-4 grid-flow-col  gap-8  mx-auto relative z-10 mt-10 mb-4 justify-between w-fit  md:w-[80%]   bg-white rounded-lg h-[432px]  p-4">
          {displayedProducts.map((product, i) => (
            <ProductCard
              key={i}
              {...{ product, selectedCard, setSelectedCard }}
            />
          ))}
        </div>
      </div>
      <Button className="border-black">
        View All Books
        <Icons.arrowRight className="h-5 w-5 ml-4" />
      </Button>
    </div>
  );
};

export default Display;

const ProductCard = ({
  product,

  selectedCard,
  setSelectedCard,
}: {
  product: DisplayedProduct;

  selectedCard: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [centerPosition, setCenterPosition] = React.useState(
    product.id == 1 ? 0 : 1000
  );
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

    const scrollBox = document.getElementById("DisplayScrollBox");
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => scrollBox.removeEventListener("scroll", handleScroll);
    }
  }, [product.id]);

  return (
    <>
      <div
        onMouseEnter={() => setSelectedCard(product.id)}
        className="hidden md:flex w-[300px] h-[350px] md:w-full relative  flex-col items-center group "
      >
        <Link
          href={`${product.href}`}
          className="w-full h-full absolute  group z-20"
        />
        <div
          className={`w-full  rounded-lg relative p-2 delay-[100ms] flex items-center flex-col transition-all  duration-500 cursor-pointer
  ${
    product.id === selectedCard
      ? `bg-${product.color} py-4 h-[400px]`
      : " pt-0 h-[400px] "
  }
  `}
        >
          <Link
            href={product.href}
            className={`font-head   h-20  font-bold text-center text-base  w-full hover:underline  group-hover:underline delay-[100ms]
    ${product.id === selectedCard ? "text-white" : `black`}
    `}
          >
            {product.title}
          </Link>

          <div
            className={`relative z-10 p-4 py-6 rounded-md  w-full left-1/2 -translate-x-1/2  transition-all duration-500 bg-theme-1  delay-[100ms]
    ${
      product.id === selectedCard
        ? "h-[350px] bg-white/10"
        : "bg-theme1/10 h-[350px] "
    }
    `}
          >
            <div className="w-full h-full relative z-10">
              <Image src={product.image} alt="cover" fill objectFit="contain" />
            </div>
          </div>
          <div className="h-fit mt-4 relative w-full  gap-2 transition-all duration-100 justify-between items-center delay-[100ms] z-30 ">
            <Button
              className={`w-full text-white  border-white  h-fit items-center delay-[100ms] 
      ${product.id === selectedCard ? " visible" : " invisible"}
      `}
            >
              Jump the line
            </Button>
          </div>
        </div>
      </div>

      <div
        ref={cardRef}
        className="flex md:hidden w-[300px] h-[350px] md:w-full relative  flex-col items-center group "
      >
        <Link
          href={`${product.href}`}
          className="w-full h-full absolute  group z-20"
        />
        <div
          className={`w-full  rounded-lg relative p-2 delay-[100ms] flex items-center flex-col transition-all  duration-500 cursor-pointer
${
  centerPosition < 150 && centerPosition > -150
    ? `bg-${product.color} py-4 h-[400px]`
    : " pt-0 h-[400px] "
}
`}
        >
          <Link
            href={product.href}
            className={`font-head   h-20  font-bold text-center text-base  w-full hover:underline  group-hover:underline delay-[100ms]
${centerPosition < 150 && centerPosition > -150 ? "text-white" : `black`}
`}
          >
            {product.title}
          </Link>

          <div
            className={`relative z-10 p-4 py-6 rounded-md  w-full left-1/2 -translate-x-1/2  transition-all duration-500 bg-theme-1  delay-[100ms]
${
  centerPosition < 150 && centerPosition > -150
    ? "h-[350px] bg-white/10"
    : "bg-theme1/10 h-[350px] "
}
`}
          >
            <div className="w-full h-full relative z-10">
              <Image src={product.image} alt="cover" fill objectFit="contain" />
            </div>
          </div>
          <div className="h-fit mt-4 relative w-full  gap-2 transition-all duration-100 justify-between items-center delay-[100ms] z-30 ">
            <Button
              className={`w-full text-white  border-white  h-fit items-center delay-[100ms] 
${centerPosition < 150 && centerPosition > -150 ? " visible" : " invisible"}
`}
            >
              Jump the line
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
