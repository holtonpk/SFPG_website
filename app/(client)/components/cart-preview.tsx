"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "../../../context/cart";
import Link from "next/link";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/app/(client)/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/(client)/components/ui/sheet";

export const formatPrice = (price: number) => {
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const CartPreview = () => {
  //   const router = useRouter();
  const {
    showCartPreview,
    setShowCartPreview,
    cart,
    updateQuantity,
    removeItem,
    cartTotalPrice,
    cartTotalQuantity,
    checkoutObject,
  } = useCart();

  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };

  const router = useRouter();
  const goToCheckout = async () => {
    const checkoutLink = await getCheckoutLink(checkoutObject);
    router.push(checkoutLink);
  };

  const screenWidth = typeof window !== "undefined" && window.screen.width;

  return (
    <Sheet open={showCartPreview} onOpenChange={setShowCartPreview}>
      <SheetContent
        side={(screenWidth as number) > 768 ? "right" : "bottom"}
        className="bg-white client md:rounded-none rounded-t-[20px]"
      >
        <SheetHeader>
          <SheetTitle className="text-theme-blue"> Your Bag</SheetTitle>
        </SheetHeader>
        {cart.length > 0 ? (
          <div className=" relative h-[95%] flex flex-col justify-between">
            <div className="flex-fit overflow-scroll">
              <div className="p-4 md:flex flex-col gap-3 hidden border-b-2 border-border ">
                <div className="flex flex-col gap-3 w-full p-4  items-center rounded-md">
                  <div className="flex justify-between w-full">
                    <h1 className="text-base text-black/60">
                      {cartTotalQuantity}
                      {cartTotalQuantity > 1 ? " products" : " product"}
                    </h1>
                    <h1 className="text-base text-black/60  text-black">
                      {formatPrice(cartTotalPrice) + " USD"}
                    </h1>
                  </div>
                  <div className="flex justify-between w-full">
                    <h1 className="text-base text-black/60">Shipping</h1>
                    <h1 className="text-base text-black/60  text-black">
                      calculate at checkout
                    </h1>
                  </div>
                  <div className="flex justify-between w-full">
                    <h1 className="text-lg text-theme-blue font-bold">
                      Sub Total
                    </h1>
                    <h1 className="text-lg text-theme-blue font-bold">
                      {formatPrice(cartTotalPrice) + " USD"}
                    </h1>
                  </div>
                </div>
              </div>

              <div className="h-fit ">
                {cart.map((product: any, i: number) => (
                  <div key={i} className="relative border-b-2 border-border ">
                    <div className="p-4 relative flex w-full items-center gap-4">
                      <div className="relative w-1/3 aspect-[1/2] rounded-md">
                        <Image
                          src={product.images[0].node.src}
                          alt={product.images[0].node.altText}
                          layout={"fill"}
                          objectFit={"contain"}
                        />
                      </div>
                      <div className="flex flex-col items-start h-fit w-2/3 ">
                        <Link
                          href={
                            "/Product/" +
                            product.title.slice(0, 25).replaceAll(" ", "_")
                          }
                        >
                          <h2 className="text-base font-f1">{product.title}</h2>
                          <h2 className="text-base text-black/60 font-f1">
                            {product.selectedVariant.title}
                          </h2>
                          <h2 className="text-lg text-theme-blue font-bold">
                            {formatPrice(
                              product.selectedVariant.priceV2.amount *
                                product.quantity
                            ) + " USD"}
                          </h2>
                        </Link>
                        <div className="flex justify-between items-center w-full mt-3">
                          <button
                            onClick={() => removeItem(product.title)}
                            className="rounded-full h-8 w-8 p-1 flex items-center justify-center bg-black/10 hover:bg-black/30"
                          >
                            <Icons.trash className="h-4 w-4 text-black" />
                          </button>
                          <div className="flex ">
                            <div className="font-bold hover:opacity-50 cursor-pointer  relative">
                              <label className="flex items-center gap-1 absolute  pointer-events-none ">
                                Qty: {product.quantity}
                                <Icons.chevronDown className="h-4 w-4 fill-black" />
                              </label>

                              <select
                                onChange={() =>
                                  updateQuantity(event, product.title)
                                }
                                className="bg-transparent text-transparent w-20 cursor-pointer"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 flex flex-col gap-3 md:hidden block border-b-2 border-border ">
                <div className="flex flex-col gap-3 w-full p-4  items-center rounded-md">
                  <div className="flex justify-between w-full">
                    <h1 className="text-base text-black/60">
                      {cartTotalQuantity}
                      {cartTotalQuantity > 1 ? " products" : " product"}
                    </h1>
                    <h1 className="text-base text-black/60  text-black">
                      {formatPrice(cartTotalPrice) + " USD"}
                    </h1>
                  </div>
                  <div className="flex justify-between w-full">
                    <h1 className="text-base text-black/60">Shipping</h1>
                    <h1 className="text-base text-black/60  text-black">
                      calculate at checkout
                    </h1>
                  </div>
                  <div className="flex justify-between w-full">
                    <h1 className="text-lg text-theme-blue font-bold">
                      Sub Total
                    </h1>
                    <h1 className="text-lg text-theme-blue font-bold">
                      {formatPrice(cartTotalPrice) + " USD"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-flow-cols sticky bottom-0 pt-4 h-fit md:relative ">
              <Button
                size={"lg"}
                onClick={goToCheckout}
                variant="blue"
                className="text-lg w-full"
              >
                Go To Checkout
              </Button>
            </div>
          </div>
        ) : (
          <div className="h-[95%] flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center">
              <Image
                priority
                src="/image/empty-bag.svg"
                height={150}
                width={150}
                alt="Shopping Bag"
              />
              <h1 className="text-2xl font-bold text-theme-blue">
                Your Bag is Empty
              </h1>
              <h1 className="text-base  text-black/70">
                There are no items in your bag
              </h1>
              <Button variant="blue" onClick={toggleCart}>
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPreview;

interface getCheckoutLinkProps {
  checkoutObject: any;
}

export const getCheckoutLink = async (checkoutObject: getCheckoutLinkProps) => {
  try {
    //dynamofit.vercel.app/
    const res = await fetch(`${siteConfig.url}/api/createCheckout`, {
      // const res = await fetch("https://dynamofit.vercel.app/api/createCheckout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-line-items": JSON.stringify(checkoutObject),
      },
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }
    const data = await res.json();
    if (
      data &&
      data.checkoutCreate &&
      data.checkoutCreate.checkout &&
      data.checkoutCreate.checkout.webUrl
    ) {
      const checkoutLink = data.checkoutCreate.checkout.webUrl;
      return checkoutLink;
    } else {
      throw new Error("Invalid data format received");
    }
  } catch (error) {
    console.error("Error in getCheckoutLink:", error);
    return null;
    // Handle the error as appropriate, e.g., show an error message to the user
  }
};
