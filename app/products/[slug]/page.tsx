"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
export default function Page({ params }: { params: { slug: string } }) {
  const product = {
    id: 1,
    title: "Snapshots of Success - The 50 greatest business success stories",
    author: "Mohamed Omar",
    type: "Paperback",
    price: 29.95,
    cover: "/image/cover.png",
    description:
      "The greatest investment advisor of the twentieth century, Benjamin Graham taught and inspired people worldwide. Graham&apos;s philosophy of “value investing”—which shields investors from substantial error and teaches them to develop long-term strategies—has made The Intelligent Investor the stock market bible ever since its original publication in 1949.",

    productVariants: [
      {
        id: 1,
        type: "Paperback",
        price: 29.95,
      },
      {
        id: 2,
        type: "Hardcover",
        price: 39.95,
      },
      {
        id: 3,
        type: "Ebook",
        price: 10.95,
      },
    ],
  };

  const [selectedVariant, setSelectedVariant] = React.useState(
    product.productVariants[0]
  );

  return (
    <div className="pt-20 pb-20 ">
      <div className="grid grid-cols-[50%_50%] w-[80%] mx-auto">
        <div className="w-[400px] h-[600px] z-20 relative mx-auto">
          <Image
            src="/image/cover-shadow.svg"
            alt="logo"
            fill
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col p-10 gap-4">
          <h1 className="text-5xl font-head uppercase">{product.title}</h1>
          <h1 className="capitalize text-2xl">by {product.author}</h1>
          {/* <h1>{product.type}</h1> */}

          <h1 className="text-3xl font-bold text-theme1">
            ${selectedVariant.price}
          </h1>

          <div className="flex gap-6">
            {product.productVariants.map((variant) => (
              <button
                onClick={() => setSelectedVariant(variant)}
                key={variant.id}
                className={`border w-fit p-2
              ${
                selectedVariant.id === variant.id
                  ? "border-theme1 border-2"
                  : "border-gray-300"
              }
              `}
              >
                <h1 className="capitalize">{variant.type}</h1>
                <h1 className="text-lg font-bold text-black">
                  ${variant.price}
                </h1>
              </button>
            ))}
          </div>
          <Button className="bg-theme1 text-white text-xl w-fit px-10">
            Add to Cart
          </Button>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <h1 className="text-4xl text-theme1 font-bold mb-4">Overview</h1>
        <p>
          Ever wondered how the most successful entrepreneurs of our time
          transformed their dreams into reality? How they faced adversity,
          overcame hurdles, and pioneered industries? Get ready for an inspiring
          journey through the triumphs and trials of the business world&apos;s
          biggest success stories. <br /> &quotSnapshots of Success&quot is not
          just a book; it&apos;s a thrilling masterclass in innovation and grit.
          Each page is a treasure trove of insights from 50 of the most
          impactful business journeys, distilled into riveting, short-form
          narratives. <br /> This unique compilation is perfect for anyone who
          craves inspiration and insight but struggles to find the time to sift
          through lengthy biographies and business texts. Each tale is
          meticulously crafted to be devoured in just 15-20 minutes - a perfect
          fit for your coffee break or when you need a shot of motivation.
          <br /> So, whether you&apos;re an aspiring entrepreneur seeking
          guidance, a business veteran hunting for inspiration, or just someone
          who enjoys captivating stories, this book is your ticket to a world of
          exciting entrepreneurial journeys.
          <br /> Dive in and discover how empires were built, fortunes were
          made, and how you, too, can etch your name in the annals of business
          history.
        </p>
      </div>
    </div>
  );
}
