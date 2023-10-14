"use client";
import Image from "next/image";
import React from "react";
import { Button } from "@/app/(client)/components/ui/button";
import { LinkButton } from "@/app/(client)/components/ui/link";
import { useStorage } from "@/context/storage";
import { useToast } from "@/app/(client)/components/ui/use-toast";
import { Input } from "@/app/(client)/components/ui/input";
import { Icons } from "@/app/(client)/components/icons";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart";
import { useRouter } from "next/navigation";
import { getCheckoutLink } from "@/app/(client)/components/cart-preview";
import Iphone from "@/public/image/iphone.png";
// import previewVideo from "@/public/video/Video1.mp4";

export default function Product({ productData }: { productData: any }) {
  const product = productData.product;

  console.log(product);

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
        <div className="flex flex-col  p-6 md:p-10 gap-2 md:gap-4 relative">
          <span className="text-base md:text-xl lg:text-3xl font-head uppercase  ">
            <h1 className="text-theme-blue text-xl md:text-3xl lg:text-5xl font-head font-bold mb-3 ">
              {product.title}
            </h1>
            {product.collection}
          </span>
          <h1 className="capitalize text-[12px] md:text-xl">
            by Short Form Publishing Group
          </h1>
          <div className="flex items-center gap-2   w-fit ">
            <Icons.star className="h-5 w-5 text-theme-blue fill-theme-blue" />
            <Icons.star className="h-5 w-5 text-theme-blue fill-theme-blue" />
            <Icons.star className="h-5 w-5 text-theme-blue fill-theme-blue" />
            <Icons.star className="h-5 w-5 text-theme-blue fill-theme-blue" />
            <Icons.star className="h-5 w-5 text-theme-blue fill-theme-blue" />
            <Button className="p-0  h-fit" variant={"link"}>
              Reviews (21)
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

      <div id="product-overview" className="w-[80%] mx-auto">
        <h1 className="text-4xl text-theme-blue font-bold mb-4">Overview</h1>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>
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

  return (
    <>
      <div className="  gap-4 flex items-center">
        {selectedVariant.compareAtPriceV2 ? (
          <>
            <span className="text-theme-blue font-bold text-2xl md:text-3xl  text-center md:text-left">
              ${selectedVariant.priceV2.amount}
            </span>
            <span className="line-through text-xl md:text-2xl mt-1 text-theme-blue/40 decoration-theme-blue/80 text-center md:text-left">
              ${selectedVariant.compareAtPriceV2.amount}
            </span>{" "}
          </>
        ) : (
          <h1 className=" font-bold text-theme-blue hidden md:block text-xl md:text-3xl text-center md:text-left">
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
      <div className="md:hidden block">
        <QuantitySelector2
          product={selectedVariant}
          quantityLocal={quantityLocal}
          setQuantityLocal={setQuantityLocal}
        />
      </div>
      <div
        id="buy-button-container"
        className={`z-[50] relative md:grid-cols-2 gap-4 w-full grid `}
      >
        <div
          id="fixed-button-container"
          className={`w-full px-6 left-0 md:hidden ${
            isBuyButtonFixed ? "fixed bottom-4 " : "hidden "
          }`}
        >
          <Button
            id="buy-now-button-fixed"
            onClick={buyNow}
            variant={"blue"}
            className={`text-base md:text-xl hover:bg-theme-blue/80  hover:text-white w-full border-theme-blue`}
            size={"lg"}
          >
            {redirectToCheckout ? (
              <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              "Buy Now"
            )}
          </Button>
        </div>
        <Button
          id="buy-now-button-relative"
          onClick={buyNow}
          ref={buyNowButtonRef}
          variant={"blue"}
          className={`text-base md:text-xl hover:bg-theme-blue/80  hover:text-white border-theme-blue ${
            isBuyButtonFixed ? "invisible md:relative " : "relative"
          }}`}
          size={"lg"}
        >
          {redirectToCheckout ? (
            <Icons.spinner className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Buy Now"
          )}
        </Button>
        <Button
          id="add-to-cart-button"
          onClick={addItemToCart}
          size={"lg"}
          className="text-base whitespace-nowrap md:text-xl hover:bg-theme-blue/10 hover:text-theme-blue "
          variant={"blueOutline"}
        >
          <Icons.add className="h-4 w-4 mr-2" />
          Add to Bag
        </Button>
      </div>
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
      className={`text-theme-blue flex flex-col items-center py-2 px-6 text-[12px] md:text-sm border  border-theme-blue rounded-lg  transition-colors ease-in 
    ${
      product.id == selectedVariant.id
        ? "bg-theme-blue/20 "
        : " hover:bg-theme-blue/20 "
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
  return (
    <div className="font-bold group hover:bg-theme-blue/10 cursor-pointer text-base  relative border w-fit rounded-full border-theme-blue text-theme-blue px-2 py-1">
      <label className="flex items-center gap-1 absolute  pointer-events-none ">
        Qty: {quantityLocal}
        <Icons.chevronDown className="h-4 w-4 fill-theme-blue text-theme-blue" />
      </label>

      <select
        onChange={(event) => setQuantityLocal(parseInt(event.target.value))}
        className="bg-transparent text-transparent w-16  cursor-pointer"
        name="qtySelect"
      >
        {[...Array(product.quantityAvailable)].map((_: any, index: number) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
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
        <label className="flex font- font-body top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-1 absolute text-lg md:text-2xl  pointer-events-none group-hover:text-theme-blue ">
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
