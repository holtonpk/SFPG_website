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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/(client)/components/ui/tabs";
import {timeSince} from "@/lib/utils";
import {is} from "date-fns/locale";
import {set} from "date-fns";
// import previewVideo from "@/public/video/Video1.mp4";

export default function Product({productData}: {productData: any}) {
  const product = productData.product;

  const [accordionValue, setAccordionValue] = React.useState<string[]>([
    "overview",
  ]);

  const productRating =
    product.reviews.reduce((acc: number, review: any) => {
      return acc + review.rating;
    }, 0) / product.reviews.length;

  const jumpToReviews = () => {
    setAccordionValue([...accordionValue, "reviews"]);
    Router.push("#product-reviews");
  };

  const Router = useRouter();

  return (
    <div
      id="product"
      className="w-screen  overflow-hidden md:pt-20  md:container bg-white md:bg-background "
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
            className="hidden md:block md:text-xl lg:text2xl  uppercase font-body text-muted-foreground "
          >
            {product.collection}
          </span>
          <h1
            id="product-title-header"
            className="text-theme-blue text-2xl md:text-3xl lg:text-5xl font-body font-bold "
          >
            {product.title}
          </h1>

          {product.quantityAvailable > 0 ? (
            <SaleBox
              product={product}
              productRating={productRating}
              jumpToReviews={jumpToReviews}
            />
          ) : (
            <div id="product-action-unavailable">
              Sorry this book is unavailable at the moment. Please sign up for
              the waitlist below and we will notify you when it is ready.
              <EmailForm />
            </div>
          )}
        </div>
      </div>
      <ProductReviews
        productRating={productRating}
        productId={product.id}
        reviews={product.reviews}
      />
    </div>
  );
}

const SaleBox = ({
  product,
  productRating,
  jumpToReviews,
}: {
  product: any;
  productRating: any;
  jumpToReviews: any;
}) => {
  const [redirectToCheckout, setRedirectToCheckout] = React.useState(false);
  const {addToCart, setShowCartPreview, checkoutObject, cartTotalPrice} =
    useCart();
  const [quantityLocal, setQuantityLocal] = React.useState<number>(1);
  const router = useRouter();

  const [selectedVariant, setSelectedVariant] = React.useState(
    product.variants[0]
  );

  const [isBuyButtonFixed, setIsBuyButtonFixed] = React.useState(true);

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

  const lowestVariantPrice = product.variants.reduce(
    (acc: number, variant: any) => {
      if (Number(variant.priceV2.amount) < acc) {
        return variant.priceV2.amount;
      }
      return acc;
    },
    product.variants[0].priceV2.amount
  );

  const highestVariantPrice = product.variants.reduce(
    (acc: number, variant: any) => {
      if (Number(variant.priceV2.amount) > acc) {
        return variant.priceV2.amount;
      }
      return acc;
    },
    product.variants[0].priceV2.amount
  );

  console.log(product.variants);

  return (
    <div id="product-saleBox" className="flex flex-col gap-4">
      <div id="product-saleBox-prices" className="  gap-4 flex items-center">
        <h1
          id="product-saleBox-price1"
          className=" font-bold text-theme-blue text-xl md:text-3xl text-center md:text-left"
        >
          ${lowestVariantPrice} - ${highestVariantPrice}
        </h1>
      </div>
      <div
        id="product-rating-preview"
        className="flex items-center gap-2   w-fit "
      >
        <Stars
          rating={productRating}
          className="h-4 w-4 text-theme-blue/60 fill-theme-blue/60"
        />

        <Button
          onClick={jumpToReviews}
          className="p-0  h-fit text-[12px] text-theme-blue/60 underline hover:text-theme-blue ml-3"
          variant={"link"}
        >
          {product.reviews.length} Reviews
        </Button>
      </div>
      <Tabs defaultValue="overview" className="w-full px-0">
        <TabsList className="flex w-full  bg-transparent border-b border-theme-blue/40 rounded-none items-start justify-between  px-0 ">
          <TabsTrigger
            value="overview"
            className="text-theme-blue/40 data-[state=active]:bg-transparent data-[state=active]:text-theme-blue p-0  data-[state=active]:shadow-none"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="specs"
            className="text-theme-blue/40 data-[state=active]:bg-transparent data-[state=active]:text-theme-blue p-0 data-[state=active]:shadow-none"
          >
            Book Specs
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="text-theme-blue/40 data-[state=active]:bg-transparent data-[state=active]:text-theme-blue  p-0 data-[state=active]:shadow-none"
          >
            Shipping & Delivery
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="pt-3">
          <p
            id="product-saleBox-description"
            className="text-muted-foreground "
          >
            Ever wondered how the most successful entrepreneurs of our time
            transformed their dreams into reality? How they faced adversity,
            overcame hurdles, and pioneered industries? Get ready for an
            inspiring journey through the triumphs and trials of the business
            world&apos;s biggest success stories. <br /> <br /> &quot;Snapshots
            of Success&quot; is not just a book; it&apos;s a thrilling
            masterclass in innovation and grit. Each page is a treasure trove of
            insights from 50 of the most impactful business journeys, distilled
            into riveting, short-form narratives.
          </p>
        </TabsContent>
        <TabsContent value="specs">
          <div className="grid grid-cols-2  sm:w-1/2 sm:mx-auto gap-4  p-4 rounded-md">
            <h1 className="">Publisher:</h1>
            <h2 className="">Short Form Books</h2>
            <h1 className="">Publication date:</h1> 10/9/2023
            <h1 className="">Pages:</h1> 165
            <h1 className="">Book dimensions:</h1> (6 x 9 in / 152 x 229 mm)
          </div>
        </TabsContent>
        <TabsContent value="shipping">
          <p id="product-saleBox-description" className="text-muted-foreground">
            <span className="font-bold">Order Processing:</span> We strive to
            process and dispatch your order within 1-2 business days from the
            date of purchase. In some cases, processing times may be extended
            during peak seasons, but we will keep you informed of any delays.
            <br />
            <br />
            <span className="font-bold">Shipping Methods:</span> We offer a
            range of shipping options to accommodate your needs. You can select
            from standard, expedited, and express shipping, each with its
            respective delivery timeframe and cost. The available shipping
            methods will be presented during the checkout process.
            <br />
            <br />
            <span className="font-bold">Tracking Your Order:</span> Once your
            order is shipped, you will receive a confirmation email containing a
            tracking number. You can use this number to monitor the progress of
            your delivery.
            <br />
            <br />
            <span className="font-bold">Shipping Rates:</span> Shipping rates
            are calculated based on the weight, dimensions, and destination of
            your order. The final shipping cost will be displayed at checkout.
            <br />
            <br />
            <span className="font-bold">International Shipping:</span> We offer
            international shipping to many countries. Please note that
            international orders may be subject to customs duties and import
            taxes, which are the responsibility of the recipient.
          </p>
        </TabsContent>
      </Tabs>

      <div id="product-saleBox-variants" className="flex flex-col gap-2">
        <p id="product-saleBox-variants-label">
          <span
            className="font-bold text-lg text-theme-blue"
            id="product-saleBox-variants-label-selected"
          >
            Select Print
          </span>
        </p>
        <div
          id="product-saleBox-variants-options"
          className="grid grid-cols-2 gap-4"
        >
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
        id="fixed-button-container"
        className={`w-full px-4 z-[50] flex  items-center  justify-between left-0 md:hidden  bg-white border-t border-theme-blue/60 ${
          isBuyButtonFixed ? "fixed bottom-0 py-4 " : "hidden "
        }`}
      >
        <span
          id="buy-now-button-fixed-price1"
          className="text-theme-blue font-bold text-lg md:text-3xl  text-center md:text-left"
        >
          Total: ${selectedVariant.priceV2.amount}
        </span>
        <Button
          id="buy-now-button-fixed"
          onClick={addItemToCart}
          variant={"blue"}
          className={`text-[12px] px-8 py-3 hover:bg-theme-blue/80  hover:text-white w-fit border-theme-blue rounded-full `}
        >
          {redirectToCheckout ? (
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Add to Cart"
          )}
        </Button>
      </div>
    </div>
  );
};

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
        className="w-screen hideScrollbar snap-mandatory snap-x overflow-scroll flex items-center z-20 relative bg-background  pb-6"
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
        className="flex gap-2 justify-between h-2 absolute w-[90%] z-30 bottom-4 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-1 text-theme-blue text-[12px]">
          <Icons.badgeCheck className="h-5 w-5 text-theme-blue" />
          Money back guarantee
        </div>
        <div className="flex gap-2 w-fit">
          {product.images.map((image: any, i: any) => (
            <div
              key={`scroll-position-indicator-${i}`}
              id={`scroll-position-indicator-${i}`}
              className={`rounded-full  h-[9px] w-[9px] ${
                selectedImage === i ? "bg-theme-blue/80" : "bg-theme-blue/20 "
              }`}
            />
          ))}
        </div>
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

  const [totalReviews, setTotalReviews] = React.useState<number>(4);

  return (
    <div
      id="product-reviews-container"
      className="w-full flex flex-col pb-8 bg-theme-blue/5"
    >
      <div
        id="product-reviews-header"
        className="w-[90%] mx-auto flex flex-row  justify-between  items-start py-6  border-b border-theme-blue/50"
      >
        <div className="flex flex-col items-start">
          <h1 className="text-theme-blue text-4xl font-bold">
            {productRating.toFixed(1)}
          </h1>

          <p
            id="product-reviews-header-rating-quantity"
            className="text-base text-theme-blue/70"
          >
            Rating based on <br /> {reviews.length} reviews
          </p>
        </div>
        <Button
          id="product-reviews-header-create-review"
          variant="blue"
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
      {orderedReviews.slice(0, totalReviews).map((review) => (
        <div
          id={`product-reviews-review-${review.id}`}
          key={review.id}
          className="flex flex-col w-[90%] mx-auto  md:px-6 py-4 md:py-10 gap-4  border-b border-theme-blue/50"
        >
          <div
            id={`product-reviews-review-${review.id}-rating`}
            className="flex flex-col items-start gap-1   w-fit "
          >
            <div className="flex gap-1">
              <Stars
                rating={review.rating}
                className="h-2 w-2 text-theme-blue/50 "
              />
            </div>
            <p
              id={`product-reviews-review-${review.id}-authorDate`}
              className="text-[12px] text-theme-blue/60"
            >
              {timeSince(review.date)}
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <h1
              id={`product-reviews-review-${review.id}-title`}
              className="text-lg text-theme-blue font-bold"
            >
              {review.title}
            </h1>
            <p
              id={`product-reviews-review-${review.id}-body`}
              className="text-muted-foreground text-sm"
            >
              {review.body}
            </p>
          </div>
        </div>
      ))}
      {totalReviews < orderedReviews.length && (
        <Button
          id="product-reviews-view-more"
          onClick={() => setTotalReviews(totalReviews + 4)}
          variant={"blue"}
          className="w-fit mt-4 mx-auto"
        >
          Show More
        </Button>
      )}
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
      className={`text-theme-blue flex flex-col items-start py-2 px-6 text-[12px] md:text-sm border  border-theme-blue rounded-md  transition-colors ease-in 
    ${
      product.id == selectedVariant.id
        ? " border-theme-blue "
        : " hover:bg-theme-blue/10  border-theme-blue/30"
    }`}
    >
      {product.title}
      <span className="text-[10px] text-theme-blue/60">In Stock</span>
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
