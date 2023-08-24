"use client";
import Link from "next/link";
import React from "react";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type DisplayedProduct = {
  title: string;
  id: number;
  image: string;
  href: string;
  color: string;
};

const Display = () => {
  const displayedProducts: DisplayedProduct[] = [
    {
      id: 1,
      title: "Business Success Stories",

      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme1",
    },
    {
      id: 2,
      title: "Heartwarming Chronicles of Love",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme2",
    },
    {
      id: 3,
      title: "Biggest Mysteries of the World",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme3",
    },
    {
      id: 4,
      title: "Greatest Conspiracy Theories",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme4",
    },
    {
      id: 5,
      title: "Business Failures and Notorious Scams",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme1",
    },
    {
      id: 6,
      title: "Origin Story of Every President",
      image: "/image/cover.svg",
      href: "/products/1",
      color: "theme2",
    },
  ];

  const [displayedCards, setDisplayedCards] = React.useState<number[]>([
    1, 2, 3, 4,
  ]);

  const [selectedCard, setSelectedCard] = React.useState(2);
  const [startIndex, setStartIndex] = React.useState(0);

  const moveCarousel = (direction: "left" | "right") => {
    const increment = direction === "left" ? -1 : 1;
    const newIndex =
      (startIndex + increment + displayedProducts.length) %
      displayedProducts.length;
    setStartIndex(newIndex);
  };

  const visibleProducts = [];
  for (let i = startIndex; i < startIndex + 4; i++) {
    const product = displayedProducts[i % displayedProducts.length];
    visibleProducts.push(product);
  }

  return (
    <div
      id="Display"
      className="pt-20 relative pb-10  flex flex-col items-center "
    >
      <h1 className="text-theme1 font-head  text-2xl lg:text-5xl text-center relative z-20">
        Exciting Reads in Every Genre
      </h1>

      <div
        id="desktopView"
        className="hidden md:grid md:grid-cols-4 grid-flow-col  gap-8  mx-auto relative z-10 mt-10 mb-4 justify-between w-[80%]   bg-white rounded-lg h-[432px]  p-4"
      >
        <Button
          onClick={() => moveCarousel("right")}
          className="absolute top-1/2 -right-20 z-20 w-fit"
        >
          <Icons.arrowRight className="h-5 w-5 " />
        </Button>
        <Button
          onClick={() => moveCarousel("left")}
          className="absolute top-1/2 -left-20 z-20 w-fit"
        >
          <Icons.arrowRight className="h-5 w-5 rotate-180" />
        </Button>
        {visibleProducts.map((product, i) => (
          <ProductCardDesktop
            key={product.id}
            {...{ product, selectedCard, setSelectedCard }}
          />
        ))}
      </div>

      <div
        id="mobileDisplayScrollBox"
        className="w-screen overflow-x-scroll px-10 no-scrollbar snap-x grid md:hidden grid-flow-col overflow-hidden gap-8  mx-auto relative z-10 mt-10 mb-4 justify-between  bg-white rounded-lg h-[432px]  p-4 "
      >
        {displayedProducts.map((product, i) => (
          <ProductCardMobile key={i} {...{ product }} />
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

const ProductCardDesktop = ({
  product,
  selectedCard,
  setSelectedCard,
}: {
  product: DisplayedProduct;

  selectedCard: number;
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div
      onMouseEnter={() => setSelectedCard(product.id)}
      className="flex h-[350px] w-full relative  flex-col items-center group "
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
  );
};

const ProductCardMobile = ({ product }: { product: DisplayedProduct }) => {
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

    const scrollBox = document.getElementById("mobileDisplayScrollBox");
    if (scrollBox) {
      scrollBox.addEventListener("scroll", handleScroll);
      return () => scrollBox.removeEventListener("scroll", handleScroll);
    }
  }, [product.id]);

  return (
    <div
      ref={cardRef}
      className="flex w-[300px] b-b h-fit relative  flex-col items-center group snap-center "
    >
      <Link
        href={`${product.href}`}
        className="w-full h-full absolute  group z-20"
      />
      <div
        className={`w-full  rounded-lg relative p-2 delay-[100ms] flex items-center flex-col transition-all  duration-500 cursor-pointer
${
  centerPosition < 150 && centerPosition > -150
    ? `bg-${product.color} py-4 h-[400px] `
    : " pt-0 h-[400px] "
}
`}
      >
        <Link
          href={product.href}
          className={`font-head b-b  h-20  font-bold text-center text-base  w-full hover:underline  group-hover:underline delay-[100ms]
${centerPosition < 150 && centerPosition > -150 ? "text-white" : `black`}
`}
        >
          {product.title}
        </Link>

        <div
          className={`relative z-10 p-4 py-6 rounded-md  w-full left-1/2 -translate-x-1/2  transition-all duration-500 bg-theme-1  delay-[100ms]
${
  centerPosition < 150 && centerPosition > -150
    ? "flex-grow bg-white/10"
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
  );
};
