"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useStorage } from "@/context/storage";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";
import { getCheckoutLink } from "@/components/cart-preview";

import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: `${siteConfig.title} - The new era of books`,
  description: siteConfig.description,
});

export default function Product({ productData }: { productData: any }) {
  // const product = {
  //   id: 1,
  //   title: "Snapshots of Success - The 50 greatest business success stories",
  //   author: "Short Form Publishing Group",
  //   type: "Paperback",
  //   price: 29.95,
  //   cover: "/image/cover.png",
  //   description:
  //     "The greatest investment advisor of the twentieth century, Benjamin Graham taught and inspired people worldwide. Graham&apos;s philosophy of “value investing”—which shields investors from substantial error and teaches them to develop long-term strategies—has made The Intelligent Investor the stock market bible ever since its original publication in 1949.",

  //   productVariants: [
  //     {
  //       id: 1,
  //       type: "Paperback",
  //       price: 29.95,
  //     },
  //     {
  //       id: 2,
  //       type: "Hardcover",
  //       price: 39.95,
  //     },
  //     {
  //       id: 3,
  //       type: "Ebook",
  //       price: 10.95,
  //     },
  //   ],
  // };

  // const [selectedVariant, setSelectedVariant] = React.useState(
  //   product.productVariants[0]
  // );

  const product = productData.product;
  console.log("***product==>", product);

  const [redirectToCheckout, setRedirectToCheckout] = React.useState(false);
  const { addToCart, setShowCartPreview, checkoutObject } = useCart();
  const router = useRouter();

  const addItemToCart = () => {
    addToCart(product);
    setShowCartPreview(true);
  };
  const buyNow = async () => {
    await addToCart(product);
    setRedirectToCheckout(true);
  };

  React.useEffect(() => {
    const redirectToLink = async () => {
      if (redirectToCheckout) {
        const checkoutLink = await getCheckoutLink(checkoutObject);
        router.push(checkoutLink);
      }
    };

    redirectToLink();
  }, [redirectToCheckout, checkoutObject, router]);

  return (
    <div className="pt-10 md:pt-20 pb-20 ">
      <div className="grid md:grid-cols-[40%_60%] lg::grid-cols-[50%_50%] md:w-[80%] mx-auto">
        <div className="w-full h-[400px] md:w-[300px] md:h-[500px] lg:w-[400px] lg:h-[600px] z-20 ml-3 md:ml-0 relative mx-auto">
          <Image
            loading="eager"
            src={product.imageSrc}
            alt="logo"
            fill
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col p-10 gap-4">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-head uppercase text-center md:text-left ">
            {product.title}
          </h1>
          <h1 className="capitalize text-base md:text-2xl text-center md:text-left">
            by Short Form Publishing Group
          </h1>
          {/* <h1>{product.type}</h1> */}

          {product.compareAtPrice ? (
            <h1 className="text-base md:text-3xl text-center md:text-left">
              <span className="line-through text-black/60 decoration-black/60">
                ${product.compareAtPrice.amount}
              </span>{" "}
              <span className="text-theme1 font-bold">
                ${product.price.amount}
              </span>
            </h1>
          ) : (
            <h1 className="text-3xl font-bold text-theme1 hidden md:block">
              ${product.price.amount}
            </h1>
          )}

          <div className="gap-6 hidden md:flex">
            {/* {product.productVariants.map((variant) => (
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
            ))} */}
          </div>
          <div className="flex gap-4">
            <Button
              onClick={buyNow}
              className="text-theme1 border-theme1 text-xl w-fit px-10"
            >
              Buy Now
            </Button>
            <Button
              onClick={addItemToCart}
              className="bg-theme1 text-white text-xl w-fit px-10"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <div className="w-[80%] mx-auto">
        <h1 className="text-4xl text-theme1 font-bold mb-4">Overview</h1>
        {/* <p className="text-xl">
          Ever wondered how the most successful entrepreneurs of our time
          transformed their dreams into reality? How they faced adversity,
          overcame hurdles, and pioneered industries? Get ready for an inspiring
          journey through the triumphs and trials of the business world&apos;s
          biggest success stories. <br /> <br /> &quot;Snapshots of
          Success&quot; is not just a book; it&apos;s a thrilling masterclass in
          innovation and grit. Each page is a treasure trove of insights from 50
          of the most impactful business journeys, distilled into riveting,
          short-form narratives. <br /> <br /> This unique compilation is
          perfect for anyone who craves inspiration and insight but struggles to
          find the time to sift through lengthy biographies and business texts.
          Each tale is meticulously crafted to be devoured in just 15-20 minutes
          - a perfect fit for your coffee break or when you need a shot of
          motivation.
          <br /> <br /> So, whether you&apos;re an aspiring entrepreneur seeking
          guidance, a business veteran hunting for inspiration, or just someone
          who enjoys captivating stories, this book is your ticket to a world of
          exciting entrepreneurial journeys.
          <br /> Dive in and discover how empires were built, fortunes were
          made, and how you, too, can etch your name in the annals of business
          history.
        </p>
        {product.description} */}
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
    </div>
  );
}

const EmailForm = () => {
  const emailRef = React.useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const { toast } = useToast();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsLoading(true);
    await fetch("/api/email-subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        LIST: siteConfig.emailLists.book1,
        EMAIL: emailRef.current!.value,
        SOURCE: "Product page waitlist",
      }),
    });
    setIsLoading(false);
    toast({
      title: "Thanks signing up for early access!",
      description: "We will notify you when the book is ready.",
    });
    emailRef.current!.value = "";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 flex  w-full border border-black p-1 rounded-full bg-transparent  relative z-30"
    >
      <Input
        ref={emailRef}
        type="email"
        autoComplete="email"
        placeholder="Want early access? Enter your email"
        className=" border-none text-[12px] md:text-base rounded-l-full"
      />
      <Button className="bg-theme2 text-white text-[12px] md:text-base hover:bg-theme1 z-30">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
};
