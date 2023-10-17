"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "@/app/(client)/components/ui/button";
import { LinkButton } from "@/app/(client)/components/ui/link";
import { useStorage } from "@/context/storage";
import { toast, useToast } from "@/app/(client)/components/ui/use-toast";
import { Input } from "@/app/(client)/components/ui/input";
import { Icons } from "@/app/(client)/components/icons";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";
import { getCheckoutLink } from "@/app/(client)/components/cart-preview";
import Iphone from "@/public/image/iphone.png";
import { Progress } from "@/app/(client)/components/ui/progress";
import { cn } from "@/lib/utils";
import { Label } from "@/app/(client)/components/ui/label";
import { Textarea } from "@/app/(client)/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/(client)/components/ui/accordion";
import { timeSince } from "@/lib/utils";
import { is } from "date-fns/locale";
import { set } from "date-fns";
// import previewVideo from "@/public/video/Video1.mp4";

export default function Product({ productData }: { productData: any }) {
  const product = productData.product;

  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;

  const [accordionValue, setAccordionValue] =
    React.useState<string>("overview");

  const Router = useRouter();

  const jumpToReviews = () => {
    setAccordionValue("reviews");
    Router.push("#product-reviews");
  };

  return (
    <div className="w-screen  overflow-hidden md:pt-20 pb-20 md:container bg-white md:bg-background">
      <div className="grid md:grid-cols-[40%_60%] lg::grid-cols-[50%_50%] md:w-[80%] mx-auto  ">
        <div className="w-full max-w-screen h-[400px] md:w-[300px] md:h-[500px] lg:w-[400px] lg:h-[600px] z-20  md:pl-0 relative mx-auto bg-background pt-10 rounded-b-[20px]  ">
          <Image
            loading="eager"
            src={product.imageSrc}
            alt="logo"
            fill
            objectFit="contain"
            className="pl-4 pt-4 md:p-0"
          />
        </div>
        <div className="flex flex-col  p-4 md:p-10 gap-2 md:gap-4 relative ">
          <span className="text-base md:text-xl lg:text2xl  uppercase font-body text-muted-foreground ">
            {product.collection}
            <h1 className="text-theme-blue text-2xl md:text-3xl lg:text-5xl font-body font-bold ">
              {product.title}
            </h1>
          </span>
          {/* <h1 className="capitalize text-[12px] md:text-xl">
            by Short Form Publishing Group
          </h1> */}
          <div className="flex items-center gap-1   w-fit ">
            <Stars rating={productRating} />
            <Button
              onClick={jumpToReviews}
              className="p-0  h-fit text-muted-foreground"
              variant={"link"}
            >
              ({product.reviews.length})
            </Button>
          </div>
          {product.quantityAvailable > 0 ? (
            <SaleBox product={product} />
          ) : (
            <>
              Sorry this book is unavailable at the moment. Please sign up for
              the waitlist below and we will notify you when it is ready.
              <EmailForm />
            </>
          )}
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="w-[90%] mx-auto"
      >
        <AccordionItem value="overview" id="product-overview">
          <AccordionTrigger className="underline-0">
            Book Overview
          </AccordionTrigger>
          <AccordionContent>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping">
          <AccordionTrigger className="underline-0">
            Shipping & Delivery
          </AccordionTrigger>
          <AccordionContent>
            Shipping usually takes 5-7 business days. We ship to all countries
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="reviews" id="product-reviews">
          <AccordionTrigger className="underline-0">Reviews</AccordionTrigger>
          <AccordionContent>
            <ProductReviews
              productRating={productRating}
              productId={product.id}
              reviews={product.reviews}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const SaleBox = ({ product }: { product: any }) => {
  const [redirectToCheckout, setRedirectToCheckout] = React.useState(false);
  const { addToCart, setShowCartPreview, checkoutObject } = useCart();
  const [quantityLocal, setQuantityLocal] = React.useState<number>(1);
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = React.useState(
    product.variants[0]
  );

  const [isBuyButtonFixed, setIsBuyButtonFixed] = React.useState(true);
  const buyNowButtonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      const buttonContainer = document.getElementById("buy-button-container");
      if (buttonContainer) {
        const buttonContainerTop =
          window.innerHeight - buttonContainer.getBoundingClientRect().top;
        if (buttonContainerTop < 16 + buyNowButtonRef.current!.offsetHeight) {
          // The button container is above the viewport, set the button position to fixed
          setIsBuyButtonFixed(true);
        } else {
          // The button container is in or below the viewport, set the button position to relative
          setIsBuyButtonFixed(false);
        }
      }
    };

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    const redirectToLink = async () => {
      if (redirectToCheckout) {
        const checkoutLink = await getCheckoutLink(checkoutObject);
        router.push(checkoutLink);
      }
    };

    redirectToLink();
  }, [redirectToCheckout, checkoutObject, router]);

  const addItemToCart = () => {
    addToCart({ ...product, selectedVariant: selectedVariant }, quantityLocal);
    setShowCartPreview(true);
  };

  const buyNow = async () => {
    await addToCart(
      { ...product, selectedVariant: selectedVariant },
      quantityLocal
    );
    setRedirectToCheckout(true);
  };

  // Random number for the "people are viewing this" section
  const [randomNumber, setRandomNumber] = React.useState<number>();

  useEffect(() => {
    const updateRandomNumber = () => {
      const min = 50;
      const max = 170;
      const newRandomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      setRandomNumber(newRandomNumber);
    };

    // Initial update
    updateRandomNumber();

    // Schedule updates every 30 seconds (3,000 milliseconds)
    const interval = setInterval(updateRandomNumber, 30000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="  gap-4 flex items-center">
        {selectedVariant.compareAtPriceV2 ? (
          <>
            <span className="text-theme-blue font-bold text-2xl md:text-3xl  text-center md:text-left">
              ${selectedVariant.priceV2.amount}
            </span>
            <span className="line-through text-xl md:text-2xl mt-1 text-theme-blue/40 decoration-theme-blue/40 text-center md:text-left">
              ${selectedVariant.compareAtPriceV2.amount}
            </span>
            <div className="bg-theme-blue p-2 py-1 text-sm  text-white rounded-full">
              {"SAVE " +
                Math.round(
                  ((selectedVariant.compareAtPriceV2.amount -
                    selectedVariant.priceV2.amount) /
                    selectedVariant.compareAtPriceV2.amount) *
                    100
                ) +
                "%"}
            </div>
          </>
        ) : (
          <h1 className=" font-bold text-theme-blue hidden md:block text-2xl md:text-3xl text-center md:text-left">
            ${selectedVariant.priceV2.amount}
          </h1>
        )}

        {/* <div className="md:block hidden">
          <QuantitySelector2
            product={selectedVariant}
            quantityLocal={quantityLocal}
            setQuantityLocal={setQuantityLocal}
          />
        </div> */}
      </div>
      <p className="text-muted-foreground">
        Craving a little motivation? Open this book to dive into a world of
        riveting tales and lessons from history&apos;s most influential
        businessman.
      </p>

      <div className="w-full flex  items-center gap-2 font-bold">
        <Icons.showPassword className="h-6 w-6 text-muted-foreground" />
        {randomNumber} people are viewing this right now.
      </div>
      <div className="w-full flex  p-2 items-center  bg-theme-pink/20 text-theme-pink rounded-md whitespace-nowrap">
        <Icons.fire className="h-5 w-5 mr-2 " />
        <p>
          <span className="font-bold"> 75 copies sold </span> in the last 15
          hours.
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full md:hidden">
        <p>
          Hurry! only <span className="font-bold"> 25 items </span> left in
          stock{" "}
        </p>
        <Progress className="h-2" value={33} />
      </div>

      <div className="flex flex-col gap-2">
        <p>
          {" "}
          <span className="font-bold">Style:</span> {selectedVariant.title}
        </p>
        <div className="flex gap-4">
          {product.variants.map((variant: any) => (
            <ProductVariants
              key={variant.id}
              product={variant}
              selectedVariant={selectedVariant}
              setSelectedVariant={setSelectedVariant}
            />
          ))}
        </div>
      </div>

      <div
        id="buy-button-container"
        className={`z-[50] relative gap-4 w-full grid  `}
      >
        <div
          id="fixed-button-container"
          className={`w-full px-6 z-20 flex flex-col items-center shadow-inner left-0 md:hidden  bg-white ${
            isBuyButtonFixed ? "fixed bottom-0 py-4 " : "hidden "
          }`}
        >
          <Button
            id="buy-now-button-fixed"
            onClick={buyNow}
            variant={"blue"}
            className={`text-base md:text-xl hover:bg-theme-blue/80  hover:text-white w-full border-theme-blue rounded-md `}
            size={"lg"}
          >
            {redirectToCheckout ? (
              <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              "Buy Now"
            )}
          </Button>
          <div className="mt-2  gap-4 flex items-center">
            {selectedVariant.compareAtPriceV2 ? (
              <div className="flex items-center gap-2">
                <span className="text-theme-blue font-bold text-2xl md:text-3xl  text-center md:text-left">
                  ${selectedVariant.priceV2.amount}
                </span>
                <span className="line-through text-base md:text-2xl text-theme-blue/40 decoration-theme-blue/40 text-center md:text-left">
                  ${selectedVariant.compareAtPriceV2.amount}
                </span>
                <div className="h-[16px] w-[1px] bg-theme-blue"></div>
                <div className="  text-sm text-theme-blue ">
                  {"SAVE " +
                    Math.round(
                      ((selectedVariant.compareAtPriceV2.amount -
                        selectedVariant.priceV2.amount) /
                        selectedVariant.compareAtPriceV2.amount) *
                        100
                    ) +
                    "%"}
                </div>
              </div>
            ) : (
              <h1 className=" font-bold text-theme-blue hidden md:block text-2xl md:text-3xl text-center md:text-left">
                ${selectedVariant.priceV2.amount}
              </h1>
            )}

            <div className="md:block hidden">
              <QuantitySelector2
                product={selectedVariant}
                quantityLocal={quantityLocal}
                setQuantityLocal={setQuantityLocal}
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4  overflow-hidden md:grid-cols-[1fr_70%] items-end w-full">
          <QuantitySelector2
            product={selectedVariant}
            quantityLocal={quantityLocal}
            setQuantityLocal={setQuantityLocal}
          />

          <Button
            id="add-to-cart-button"
            onClick={addItemToCart}
            size={"lg"}
            className="text-base whitespace-nowrap md:text-xl hover:bg-theme-blue/10 hover:text-theme-blue rounded-none w-full "
            variant={"blueOutline"}
          >
            <Icons.shoppingBag className="h-4 w-4 mr-2" />
            Add to Bag
          </Button>
        </div>
        <Button
          id="buy-now-button-relative"
          onClick={buyNow}
          ref={buyNowButtonRef}
          variant={"blue"}
          className={`text-base md:text-xl hover:bg-theme-blue/80  hover:text-white border-theme-blue rounded-none ${
            isBuyButtonFixed ? "invisible md:visible  " : "relative  "
          }}`}
          size={"lg"}
        >
          {redirectToCheckout ? (
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Buy Now"
          )}
        </Button>
      </div>

      <div className="hidden md:flex flex-col gap-2 w-full">
        <p>
          Hurry! only <span className="font-bold"> 25 items </span> left in
          stock{" "}
        </p>
        <Progress className="h-2" value={33} />
      </div>
    </div>
  );
};

const ProductReviews = ({
  productRating,
  productId,
  reviews,
}: {
  productRating: number;
  productId: string;
  reviews: {
    id: string;
    name: string;
    email: string;
    productId: string;
    rating: number;
    date: number;
    title: string;
    body: string;
  }[];
}) => {
  const { SaveReview } = useStorage()!;

  // create a review

  const [writeReview, setWriteReview] = React.useState<boolean>(false);
  const [ratingValue, setRatingValue] = React.useState<number>(5);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const nameInputRef = React.useRef<HTMLInputElement>(null);
  const emailInputRef = React.useRef<HTMLInputElement>(null);
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const bodyInputRef = React.useRef<HTMLTextAreaElement>(null);

  const saveReview = async () => {
    setIsLoading(true);
    if (
      !nameInputRef.current!.value ||
      !emailInputRef.current!.value ||
      !titleInputRef.current!.value ||
      !bodyInputRef.current!.value
    ) {
      toast({
        title: "You left one or more fields blank",
        description: "Please fill out all fields to leave a review",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    await SaveReview(
      nameInputRef.current!.value,
      productId,
      emailInputRef.current!.value,
      ratingValue,
      Date.now(),
      titleInputRef.current!.value,
      bodyInputRef.current!.value
    );

    toast({
      title: "Thanks for your review!",
      description: "Your review will be posted shortly.",
    });
    setIsLoading(false);
    setWriteReview(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-theme-blue/10 rounded-md flex flex-col gap-2 justify-center items-center p-8">
        <div className="flex items-center gap-1   w-fit ">
          <Stars rating={productRating} />
        </div>
        <p className="text-xl">Based on {reviews.length} reviews</p>
        <Button
          variant={"blueOutline"}
          onClick={() => setWriteReview(!writeReview)}
        >
          Write a review
        </Button>
      </div>
      {writeReview && (
        <div className="flex flex-col mt-6 gap-4 px-2">
          <h1 className="text-2xl font-bold">Write a review</h1>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Name</Label>
            <Input
              ref={nameInputRef}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Email</Label>
            <Input
              ref={emailInputRef}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Rating</Label>
            <div className="flex gap-2">
              {[...Array(5)].map((_, index: number) => (
                <Button
                  key={index}
                  onClick={() => setRatingValue(index + 1)}
                  variant={ratingValue >= index + 1 ? "blue" : "blueOutline"}
                  className="aspect-square p-1"
                >
                  <Icons.star className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Review Title</Label>
            <Input ref={titleInputRef} placeholder="Give your review a title" />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="font-bold">Body of Review</Label>
            <Textarea
              ref={bodyInputRef}
              placeholder="Enter your email"
              className="bg-none ring-none"
            />
          </div>
          <Button onClick={saveReview} variant={"blue"}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.send className="h-4 w-4 mr-2" />
            )}
            Submit Review
          </Button>
        </div>
      )}
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col bg-theme-blue/10 md:px-6 p-4 md:py-10 gap-2 rounded-md"
        >
          <div className="flex items-center gap-1   w-fit ">
            <Stars rating={review.rating} />
          </div>
          <p className="text-sm">
            {review.name + " - " + timeSince(review.date)}
          </p>
          <h1 className="text-xl font-bold">{review.title}</h1>
          <p className="text-muted-foreground">{review.body}</p>
        </div>
      ))}
    </div>
  );
};

const Stars = ({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) => {
  const rounded = Math.round(rating * 2) / 2;

  return (
    <>
      {[...Array(5)].map((_, index: number) => {
        if (index + 0.5 === rounded) {
          return (
            <Icons.halfStar
              key={index}
              className={cn(
                `h-5 w-5 text-theme-blue fill-theme-blue`,
                className
              )}
              color="red"
            />
          );
        } else if (index < rounded) {
          return (
            <Icons.star
              key={index}
              className={cn(
                `h-5 w-5 text-theme-blue fill-theme-blue`,
                className
              )}
            />
          );
        } else {
          return (
            <Icons.star
              key={index}
              className={cn(`h-5 w-5 text-theme-blue`, className)}
            />
          );
        }
      })}
    </>
  );
};

const ProductVariants = ({
  product,
  selectedVariant,
  setSelectedVariant,
}: {
  product: any;
  selectedVariant: any;
  setSelectedVariant: any;
}) => {
  return (
    <button
      onClick={() => setSelectedVariant(product)}
      className={`text-theme-blue flex flex-col items-center py-2 px-6 text-[12px] md:text-sm border  border-theme-blue rounded-md  transition-colors ease-in 
    ${
      product.id == selectedVariant.id
        ? "bg-theme-blue/10 "
        : " hover:bg-theme-blue/10  border-theme-blue/40"
    }`}
    >
      {product.title}
      <span className="font-bold text-base  md:text-xl">
        ${product.priceV2.amount}
      </span>
    </button>
  );
};

const QuantitySelector2 = ({
  product,
  quantityLocal,
  setQuantityLocal,
}: {
  product: any;
  quantityLocal: number;
  setQuantityLocal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const changeQuantity = (amount: number) => {
    if (
      quantityLocal + amount < 1 ||
      quantityLocal + amount > product.quantityAvailable
    )
      return;
    setQuantityLocal(quantityLocal + amount);
  };

  return (
    <div className="font-bold   text-base  relative md:flex-col md:items-start md:gap-2  flex w-full   gap-4 items-center">
      Quantity
      <div className="flex-grow border-theme-blue/30 px-2 flex border md:w-full  justify-between items-center">
        <Button
          onClick={() => changeQuantity(-1)}
          className="text-theme-blue/60 hover:bg-theme-blue/20 hover:text-theme-blue aspect-square"
          variant={"ghost"}
        >
          -
        </Button>
        <span className="text-theme-blue font-bold">{quantityLocal}</span>
        <Button
          onClick={() => changeQuantity(1)}
          className="text-theme-blue/60 hover:bg-theme-blue/20 hover:text-theme-blue aspect-square"
          variant={"ghost"}
        >
          +
        </Button>
      </div>
    </div>
  );
};

const QuantitySelector = ({
  product,
  quantityLocal,
  setQuantityLocal,
}: {
  product: any;
  quantityLocal: number;
  setQuantityLocal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const updateQuantity = () => {};

  const changeQuantity = (amount: number) => {
    if (quantityLocal + amount < 1) return;
    setQuantityLocal(quantityLocal + amount);
  };

  return (
    <div className="flex items-center gap-2 md:gap-4 w-1/2">
      <Button
        onClick={() => changeQuantity(-1)}
        className="rounded-full text-sm md:text-base w-fit p-0  md:pb-[2px] aspect-square bg-theme-blue/10 text-theme-blue/80 border-none hover:bg-theme-blue/70 hover:text-theme-blue"
      >
        -
      </Button>
      <div className=" h-full  rounded-md w-fit group relative ">
        <label className="flex fontfont-body top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 absolute text-lg md:text-2xl  pointer-events-none text-theme-blue ">
          {quantityLocal}
        </label>
        <Icons.chevronDown className="h-4 w-4  absolute -bottom-3 left-1/2 -translate-x-1/2  pointer-events-none text-theme-blue hidden group-hover:block" />
        <Icons.chevronUp className="h-4 w-4  absolute -top-3 left-1/2 -translate-x-1/2  pointer-events-none text-theme-blue hidden group-hover:block" />
        <select
          onChange={updateQuantity}
          className="bg-transparent text-transparent w-full cursor-pointer"
          name="qtySelect"
        >
          {[...Array(product.quantityAvailable)].map(
            (_: any, index: number) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            )
          )}
        </select>
      </div>
      <Button
        onClick={() => changeQuantity(1)}
        className="rounded-full text-sm md:text-base w-fit p-0  md:pb-[2px] aspect-square bg-theme-blue/10 text-theme-blue/80 border-none hover:bg-theme-blue/70 hover:text-theme-blue"
      >
        +
      </Button>
    </div>
  );
};

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
        placeholder="Enter your email"
        className=" border-none text-[12px] md:text-base rounded-l-full"
      />
      <Button className="bg-theme-pink text-white text-[12px] md:text-base hover:bg-theme-blue z-30">
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Submit
      </Button>
    </form>
  );
};

const AmazonButton = () => {
  return (
    <LinkButton
      href="https://www.amazon.com/"
      target="blank"
      className="h-fit bg-background  w-full hover:bg-[#FF9900]/10 "
    >
      <span className="flex  items-center uppercase font-body text-black">
        Order now on
      </span>
      <Icons.AmazonLogo className="h-5 w-20 mt-2" />
      <Icons.chevronRight className="h-6 w-6 text-[#FF9900]" />
    </LinkButton>
  );
};
