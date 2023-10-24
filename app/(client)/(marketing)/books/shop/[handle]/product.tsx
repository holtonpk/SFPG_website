"use client";
import Image from "next/image";
import React, {useEffect} from "react";
import {Button} from "@/app/(client)/components/ui/button";
import {LinkButton} from "@/app/(client)/components/ui/link";
import {useStorage} from "@/context/storage";
import {toast, useToast} from "@/app/(client)/components/ui/use-toast";
import {Input} from "@/app/(client)/components/ui/input";
import {Icons} from "@/app/(client)/components/icons";
import {siteConfig} from "@/config/site";
import {useCart} from "@/context/cart";
import {useRouter} from "next/navigation";
import {getCheckoutLink} from "@/app/(client)/components/cart-preview";
import Iphone from "@/public/image/iphone.png";
import {Progress} from "@/app/(client)/components/ui/progress";
import {cn} from "@/lib/utils";
import {Label} from "@/app/(client)/components/ui/label";
import {Textarea} from "@/app/(client)/components/ui/textarea";
import {logEvent} from "firebase/analytics";
import {analytics} from "@/config/firebase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/(client)/components/ui/accordion";
import {timeSince} from "@/lib/utils";
import {is} from "date-fns/locale";
import {set} from "date-fns";
// import previewVideo from "@/public/video/Video1.mp4";

export default function Product({productData}: {productData: any}) {
  const product = productData.product;

  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;

  const [accordionValue, setAccordionValue] = React.useState<string[]>([
    "overview",
  ]);

  const Router = useRouter();

  const jumpToReviews = () => {
    setAccordionValue([...accordionValue, "reviews"]);
    Router.push("#product-reviews");
  };

  return (
    <div
      id="product"
      className="w-screen  overflow-hidden md:pt-20 pb-20 md:container bg-white md:bg-background "
    >
      <div
        id="product-box"
        className="grid md:grid-cols-[45%_55%] items-center md:items-start    mx-auto  "
      >
        <div className="md:hidden block">
          <ProductImagesMobile product={product} />
        </div>
        <div className="hidden md:block ">
          <ProductImages product={product} />
        </div>

        <div
          id="product-saleBox-container"
          className="flex flex-col  p-4 md:p-10 gap-2 md:gap-4 relative "
        >
          <span
            id="product-collection-header"
            className="text-base md:text-xl lg:text2xl  uppercase font-body text-muted-foreground "
          >
            {product.collection}
          </span>
          <h1
            id="product-title-header"
            className="text-theme-blue text-2xl md:text-3xl lg:text-5xl font-body font-bold "
          >
            {product.title}
          </h1>
          <div
            id="product-rating-preview"
            className="flex items-center gap-1   w-fit "
          >
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
            <div id="product-action-unavailable">
              Sorry this book is unavailable at the moment. Please sign up for
              the waitlist below and we will notify you when it is ready.
              <EmailForm />
            </div>
          )}
        </div>
      </div>
      <Accordion
        type="multiple"
        value={accordionValue}
        onValueChange={setAccordionValue}
        className="w-[90%] mx-auto"
      >
        <AccordionItem value="overview" id="product-overview">
          <AccordionTrigger
            id="product-overview-trigger"
            className="underline-0"
          >
            Book Overview
          </AccordionTrigger>
          <AccordionContent id="product-overview-content">
            <div
              id="product-overview-content-body"
              dangerouslySetInnerHTML={{__html: product.description}}
            />
            <h1 className="my-3 font-bold">
              The book includes stories of the following entrepreneurs:
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {storyNames.map((name) => (
                <div className="font-bold" key={name}>
                  -{name}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="details" id="product-details">
          <AccordionTrigger
            id="product-details-trigger"
            className="underline-0"
          >
            Details
          </AccordionTrigger>
          <AccordionContent id="product-delivery-details-content">
            <div className="grid grid-cols-2  sm:w-1/2 sm:mx-auto gap-4 bg-theme-blue/20 p-4 rounded-md">
              <h1 className="font-bold">Publisher:</h1>
              <h2 className="">Short Form Books</h2>
              <h1 className="font-bold">Publication date:</h1> 10/9/2023
              <h1 className="font-bold">Pages:</h1> 165
              <h1 className="font-bold">Book dimensions:</h1> (6 x 9 in / 152 x
              229 mm)
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="shipping" id="product-delivery-details">
          <AccordionTrigger
            id="product-delivery-details-trigger"
            className="underline-0"
          >
            Shipping & Delivery
          </AccordionTrigger>
          <AccordionContent id="product-delivery-details-content">
            Shipping usually takes 5-7 business days. We ship to all countries
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="reviews" id="product-reviews">
          <AccordionTrigger
            id="product-reviews-trigger"
            className="underline-0"
          >
            Reviews
          </AccordionTrigger>
          <AccordionContent id="product-reviews-content">
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

const ProductImages = ({product}: {product: any}) => {
  const [selectedImage, setSelectedImage] = React.useState<string>(
    product.images[0].node.src
  );

  return (
    <div id="product-image-container" className="flex w-full   pt-10 ">
      <div
        className="flex flex-col gap-4"
        id="product-image-selector-container"
      >
        {product.images.map((image: any, i: any) => (
          <div
            onClick={() => setSelectedImage(image.node.src)}
            id={`product-image-${i}`}
            key={i}
            className={`snap-center cursor-pointer  relative h-[50px] w-[30px]  lg:h-[75px] lg:w-[57px]  pt-10 rounded-md border-4 
            ${
              selectedImage === image.node.src
                ? "border-theme-blue"
                : "hover:border-theme-blue/60"
            }
            `}
          >
            <Image
              id="product-image"
              loading="eager"
              src={image.node.src}
              alt="logo"
              fill
              objectFit="contain"
              className="p-0 pointer-events-none"
            />
          </div>
        ))}
      </div>
      <div
        id={`product-image-main`}
        className="w-[300px] h-[400px]  lg:w-[400px] lg:h-[500px] z-20 relative mx-auto bg-background rounded-b-[20px] "
      >
        <Image
          id="product-image"
          loading="eager"
          src={selectedImage}
          alt="logo"
          fill
          objectFit="contain"
          className="p-0"
        />
      </div>
    </div>
  );
};

const ProductImagesMobile = ({product}: {product: any}) => {
  const [selectedImage, setSelectedImage] = React.useState<number>(0);
  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollArea = scrollAreaRef.current;

    if (scrollArea) {
      const handleScroll = () => {
        const scrollSnapPoints = Array.from(
          scrollArea.querySelectorAll(".snap-center")
        );
        const scrollLeft = scrollArea.scrollLeft;
        const containerWidth = scrollArea.offsetWidth;

        for (let i = 0; i < scrollSnapPoints.length; i++) {
          const image = scrollSnapPoints[i];
          const {left, width} = image.getBoundingClientRect();
          const rightEdgePosition = left + width;

          // Check if the right edge's left position is greater than half of the container width
          if (rightEdgePosition > containerWidth / 2) {
            setSelectedImage(i);
            break; // No need to check the rest
          }
        }
      };

      scrollArea.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check

      return () => {
        scrollArea.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  return (
    <div className="relative">
      <div
        id="product-image-scroll-area"
        className="w-screen hideScrollbar snap-mandatory snap-x overflow-scroll flex items-center z-20 relative bg-background  pb-4"
        ref={scrollAreaRef}
      >
        <div id="product-image-container" className="flex w-fit">
          {product.images.map((image: any, i: any) => (
            <div
              id={`product-image-${i}`}
              key={i}
              className="snap-center   relative h-[400px] w-[300px]  pt-10"
            >
              <Image
                id="product-image"
                loading="eager"
                src={image.node.src}
                alt="logo"
                fill
                objectFit="contain"
                className="pl-4 pt-4 md:p-0"
              />
            </div>
          ))}
        </div>
      </div>
      <div
        id="scroll-position-container"
        className="flex gap-1 w-fit h-2 absolute bottom-2 left-1/2 -translate-x-1/2 z-30"
      >
        {product.images.map((image: any, i: any) => (
          <div
            key={`scroll-position-indicator-${i}`}
            id={`scroll-position-indicator-${i}`}
            className={`rounded-full  h-[7px] w-[7px] ${
              selectedImage === i ? "bg-theme-blue/80" : "bg-theme-blue/20 "
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const SaleBox = ({product}: {product: any}) => {
  const [redirectToCheckout, setRedirectToCheckout] = React.useState(false);
  const {addToCart, setShowCartPreview, checkoutObject, cartTotalPrice} =
    useCart();
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
      const buttonContainer = document.getElementById(
        "buy-now-button-relative"
      );
      if (buttonContainer) {
        const buttonContainerTop =
          window.innerHeight - buttonContainer.getBoundingClientRect().top;
        if (buttonContainerTop < 100 + buyNowButtonRef.current!.offsetHeight) {
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
    logEvent(analytics, "add_to_cart", {
      currency: "USD",
      value: selectedVariant.priceV2.amount,
      items: [selectedVariant],
    });

    addToCart({...product, selectedVariant: selectedVariant}, quantityLocal);
    setShowCartPreview(true);
  };

  const buyNow = async () => {
    logEvent(analytics, "begin_checkout", {
      currency: "USD",
      value: cartTotalPrice,
      items: [checkoutObject],
    });
    await addToCart(
      {...product, selectedVariant: selectedVariant},
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
    <div id="product-saleBox" className="flex flex-col gap-4">
      <div id="product-saleBox-prices" className="  gap-4 flex items-center">
        {selectedVariant.compareAtPriceV2 ? (
          <>
            <span
              id="product-saleBox-price1"
              className="text-theme-blue font-bold text-2xl md:text-3xl  text-center md:text-left"
            >
              ${selectedVariant.priceV2.amount}
            </span>
            <span
              id="product-saleBox-compareAtPrice"
              className="line-through text-xl md:text-2xl mt-1 text-theme-blue/40 decoration-theme-blue/40 text-center md:text-left"
            >
              ${selectedVariant.compareAtPriceV2.amount}
            </span>
            <div
              id="product-saleBox-discountPercent"
              className="bg-theme-blue p-2 py-1 text-sm  text-white rounded-full"
            >
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
          <h1
            id="product-saleBox-price1"
            className=" font-bold text-theme-blue hidden md:block text-2xl md:text-3xl text-center md:text-left"
          >
            ${selectedVariant.priceV2.amount}
          </h1>
        )}
      </div>
      <p id="product-saleBox-description" className="text-muted-foreground">
        Craving a little motivation? Open this book to dive into a world of
        riveting tales and lessons from history&apos;s most influential
        entrepreneurs.
      </p>

      {/* <div
        id="product-saleBox-pageViews"
        className="w-full flex  items-center gap-2 font-bold"
      >
        <Icons.showPassword className="h-6 w-6 text-muted-foreground" />
        {randomNumber} people are viewing this right now.
      </div>
      <div
        id="product-saleBox-salesNumber"
        className="w-full flex  p-2 items-center  bg-theme-pink/20 text-theme-pink rounded-md whitespace-nowrap"
      >
        <Icons.fire
          id="product-saleBox-salesNumber-icon"
          className="h-5 w-5 mr-2 "
        />
        <p id="product-saleBox-salesNumber-body">
          <span id="product-saleBox-salesNumber-bold" className="font-bold">
            {" "}
            46 copies sold{" "}
          </span>{" "}
          in the last 12 hours.
        </p>
      </div> */}

      <div id="product-saleBox-variants" className="flex flex-col gap-2">
        <p id="product-saleBox-variants-label">
          <span
            className="font-bold"
            id="product-saleBox-variants-label-selected"
          >
            Style:
          </span>{" "}
          {selectedVariant.title}
        </p>
        <div id="product-saleBox-variants-options" className="flex gap-4">
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
        {/* <div
          id="fixed-button-container"
          className={`w-full px-6 z-20 flex flex-col items-center shadow-inner left-0 md:hidden  bg-white top-shadow ${
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
          <div
            id="buy-now-button-fixed-priceRow"
            className="mt-2  gap-4 flex items-center "
          >
            {selectedVariant.compareAtPriceV2 ? (
              <div
                id="buy-now-button-fixed-prices"
                className="flex items-center gap-2"
              >
                <span
                  id="buy-now-button-fixed-price1"
                  className="text-theme-blue font-bold text-2xl md:text-3xl  text-center md:text-left"
                >
                  ${selectedVariant.priceV2.amount}
                </span>
                <span
                  id="buy-now-button-fixed-compareAtPrice"
                  className="line-through text-base md:text-2xl text-theme-blue/40 decoration-theme-blue/40 text-center md:text-left"
                >
                  ${selectedVariant.compareAtPriceV2.amount}
                </span>
                <div
                  id="buy-now-button-fixed-divider"
                  className="h-[16px] w-[1px] bg-theme-blue"
                ></div>
                <div
                  id="buy-now-button-fixed-discountPercent"
                  className="  text-sm text-theme-blue "
                >
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
              <h1
                id="buy-now-button-fixed-price1"
                className=" font-bold text-theme-blue hidden md:block text-2xl md:text-3xl text-center md:text-left"
              >
                ${selectedVariant.priceV2.amount}
              </h1>
            )}

            <div
              id="product-saleBox-desktop-quantity"
              className="md:block hidden"
            >
              <QuantitySelector2
                product={selectedVariant}
                quantityLocal={quantityLocal}
                setQuantityLocal={setQuantityLocal}
              />
            </div>
          </div>
        </div> */}
        <div
          id="product-saleBox-buy-container"
          className="grid gap-4   md:grid-cols-[1fr_70%]  items-end w-full"
        >
          <QuantitySelector2
            product={selectedVariant}
            quantityLocal={quantityLocal}
            setQuantityLocal={setQuantityLocal}
          />

          <Button
            id="add-to-cart-button"
            onClick={addItemToCart}
            size={"lg"}
            className="text-base whitespace-nowrap md:text-xl hover:bg-theme-blue/10 hover:text-theme-blue rounded-md w-full "
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
          className={`text-base md:text-xl hover:bg-theme-blue/80  hover:text-white border-theme-blue rounded-md 
          ${isBuyButtonFixed ? "visible  " : "relative  "}
        }`}
          size={"lg"}
        >
          {redirectToCheckout ? (
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Buy Now"
          )}
        </Button>
      </div>

      {/* <div
        id="product-saleBox-available"
        className="flex flex-col gap-2 w-full"
      >
        <p id="product-saleBox-available-body">
          Hurry! only{" "}
          <span
            id="product-saleBox-quantity-available-bold"
            className="font-bold"
          >
            {" "}
            25 items{" "}
          </span>{" "}
          left in stock{" "}
        </p>
        <div id="product-saleBox-available-progress">
          <Progress className="h-2" value={33} />
        </div>
      </div> */}
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
  const {SaveReview} = useStorage()!;

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

  const orderedReviews = reviews.sort((a, b) => b.date - a.date);

  return (
    <div id="product-reviews-container" className="w-full flex flex-col gap-4">
      <div
        id="product-reviews-header"
        className="w-full bg-theme-blue/10 rounded-md flex flex-col gap-2 justify-center items-center p-8"
      >
        <div
          id="product-reviews-header-rating"
          className="flex items-center gap-1   w-fit "
        >
          <Stars rating={productRating} />
        </div>
        <p id="product-reviews-header-rating-quantity" className="text-xl">
          Based on {reviews.length} reviews
        </p>
        <Button
          id="product-reviews-header-create-review"
          variant={"blueOutline"}
          onClick={() => setWriteReview(!writeReview)}
        >
          Write a review
        </Button>
      </div>
      {writeReview && (
        <div
          id="product-reviews-create"
          className="flex flex-col mt-6 gap-4 px-2"
        >
          <h1 id="product-reviews-create-title" className="text-2xl font-bold">
            Write a review
          </h1>
          <div
            id="product-reviews-create-name-container"
            className="flex flex-col gap-2"
          >
            <Label id="product-reviews-create-name-label" className="font-bold">
              Name
            </Label>
            <Input
              id="product-reviews-create-name-input"
              ref={nameInputRef}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>
          <div
            id="product-reviews-create-email-container"
            className="flex flex-col gap-2"
          >
            <Label
              className="font-bold"
              id="product-reviews-create-email-label"
            >
              Email
            </Label>
            <Input
              id="product-reviews-create-email-input"
              ref={emailInputRef}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div
            id="product-reviews-create-rating-container"
            className="flex flex-col gap-2"
          >
            <Label
              id="product-reviews-create-rating-label"
              className="font-bold"
            >
              Rating
            </Label>
            <div
              id="product-reviews-create-rating-stars"
              className="flex gap-2"
            >
              {[...Array(5)].map((_, index: number) => (
                <Button
                  id={`product-reviews-create-rating-stars-button-${index}`}
                  key={index}
                  onClick={() => setRatingValue(index + 1)}
                  variant={ratingValue >= index + 1 ? "blue" : "blueOutline"}
                  className="aspect-square p-1 hover:bg-theme-blue hover:text-white"
                >
                  <Icons.star className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
          <div
            id="product-reviews-create-title-container"
            className="flex flex-col gap-2"
          >
            <Label
              id="product-reviews-create-title-label"
              className="font-bold"
            >
              Review Title
            </Label>
            <Input
              id="product-reviews-create-title-input"
              ref={titleInputRef}
              placeholder="Give your review a title"
            />
          </div>
          <div
            id="product-reviews-create-body-container"
            className="flex flex-col gap-2"
          >
            <Label id="product-reviews-create-body-label" className="font-bold">
              Body of Review
            </Label>
            <Textarea
              id="product-reviews-create-body-textArea"
              ref={bodyInputRef}
              placeholder="Enter your email"
              className="bg-none ring-none"
            />
          </div>
          <Button
            id="product-reviews-create-submit"
            onClick={saveReview}
            variant={"blue"}
          >
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.send className="h-4 w-4 mr-2" />
            )}
            Submit Review
          </Button>
        </div>
      )}
      {orderedReviews.map((review) => (
        <div
          id={`product-reviews-review-${review.id}`}
          key={review.id}
          className="flex flex-col bg-theme-blue/10 md:px-6 p-4 md:py-10 gap-2 rounded-md"
        >
          <div
            id={`product-reviews-review-${review.id}-rating`}
            className="flex items-center gap-1   w-fit "
          >
            <Stars rating={review.rating} />
          </div>
          <p
            id={`product-reviews-review-${review.id}-authorDate`}
            className="text-sm"
          >
            {review.name + " - " + timeSince(review.date)}
          </p>
          <h1
            id={`product-reviews-review-${review.id}-title`}
            className="text-xl font-bold"
          >
            {review.title}
          </h1>
          <p
            id={`product-reviews-review-${review.id}-body`}
            className="text-muted-foreground"
          >
            {review.body}
          </p>
        </div>
      ))}
    </div>
  );
};

const Stars = ({rating, className}: {rating: number; className?: string}) => {
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
      id={`product-saleBox-variants-option-${selectedVariant.id}`}
      onClick={() => setSelectedVariant(product)}
      className={`text-theme-blue flex flex-col items-center py-2 px-6 text-[12px] md:text-sm border  border-theme-blue rounded-md  transition-colors ease-in 
    ${
      product.id == selectedVariant.id
        ? "bg-theme-blue/10 "
        : " hover:bg-theme-blue/10  border-theme-blue/40"
    }`}
    >
      {product.title}
      <span
        id={`product-saleBox-variants-option-price-${selectedVariant.id}`}
        className="font-bold text-base  md:text-xl"
      >
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
    <div
      id="product-saleBox-quantity-container"
      className="font-bold   text-base  relative md:flex-col md:items-start md:gap-2  flex w-full   gap-4 items-center"
    >
      <h1 id="product-saleBox-quantity-label">Quantity</h1>
      <div
        id="product-saleBox-quantity-selector"
        className="flex-grow border-theme-blue px-2 flex border md:w-full  justify-between items-center rounded-md"
      >
        <Button
          id="product-saleBox-quantity-sub"
          onClick={() => changeQuantity(-1)}
          className="text-theme-blue/60 hover:bg-theme-blue/20 hover:text-theme-blue aspect-square"
          variant={"ghost"}
        >
          -
        </Button>
        <span
          id="product-saleBox-quantity-value"
          className="text-theme-blue font-bold"
        >
          {quantityLocal}
        </span>
        <Button
          id="product-saleBox-quantity-add"
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

  const {toast} = useToast();

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

const storyNames: string[] = [
  "Justin Kan",
  "Bernard Arnault",
  "Tyler Perry",
  "Ray Kroc",
  "Elon Musk",
  "Mrs. B",
  "Howard Schultz",
  "Michael Dell",
  "Austin Russell",
  "Mr. Beast",
  "Richard Branson",
  "Pavel Durov",
  "Reed Hastings",
  "Tope Awotona",
  "Ingvar Kamprad",
  "Travis Kalanick",
  "Whitney Wolfe Herd",
  "Jan Koum",
  "The Collison Brothers",
  "Masayoshi Son",
  "Peter Thiel",
  "Michael Rubin",
  "Mark Zuckerberg",
  "Sophia Amoruso",
  "Palmer Luckey",
  "Jamie Siminoff",
  "Phil Knight",
  "Shahid Khan",
  "Dave Portnoy",
  "Tony Xu",
  "Stewart Butterfield",
  "Henry Ford",
  "Felix Dennis",
  "Dana White",
  "Oprah",
  "Jeff Bezos",
  "Samwer Brothers",
  "Ben Francis",
  "Steve Ells",
  "Luis von Ahn",
  "Walt Disney",
  "Mark Cuban",
  "Sam Altman",
  "Marc Lore",
  "Ryan Peterson",
  "Peter Beck",
  "Melanie Perkins",
  "Apoorva Mehta",
  "Steve Jobs",
  "Sam Zemurray",
];
