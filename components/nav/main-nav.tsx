"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/hooks/use-scroll";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/components/ui/link";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";
import { useCart } from "../../context/cart";
const navItems = ["pricing", "changelog"];

const transparentHeaderSegments = new Set(["metatags", "pricing"]);

export default function Nav() {
  const scrolled = useScroll(20);
  const segment = useSelectedLayoutSegment();

  const { showCartPreview, setShowCartPreview, cartTotalQuantity } = useCart();
  const toggleCart = () => {
    setShowCartPreview(!showCartPreview);
  };

  return (
    // <div
    //   className={clsx(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
    //     "border-b-border border-b bg-background1/20 backdrop-blur-lg": scrolled,
    //     "border-b-border border-b  b-b":
    //       segment && !transparentHeaderSegments.has(segment),
    //   })}
    // >
    <>
      <div className="mx-auto w-full z-20  absolute   hidden  md:block border-b">
        <div className="flex h-20 items-center justify-between w-full container    ">
          <div className="flex   w-fit items-center sticky  md:gap-10 ">
            <Link href="/#" className="pb-1 ">
              <span className="text-2xl p-2 text-primary font-bold  flex items-center ">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="h-8 w-8 lg:h-9 lg:w-9 relative rounded-lg mr-1 bg-theme-blue flex justify-center items-center"
                >
                  <Icons.logo
                    className="text-white h-10 w-10 absolute"
                    color="rgb(255 255 255)"
                  />
                </motion.div>
                <span className="ml-1  text-theme-blue font-head lg:text-2xl">
                  {siteConfig.name}
                </span>
              </span>
            </Link>
            <div className="flex flex-row items-center gap-6">
              {marketingConfig.mainNav?.length ? (
                <nav className="hidden gap-6 md:flex">
                  {marketingConfig.mainNav?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.disabled ? "#" : item.href}
                      className={cn(
                        "flex items-center text-base font-body transition-colors hover:text-foreground/80 ",
                        item?.cta ? "text-theme-blue" : "text-black",

                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>
          <div className="flex w-fit items-center relative gap-4   h-10">
            <LinkButton
              variant={"blueOutline"}
              href={"/contact"}
              className={"flex items-center text-base font-body "}
            >
              <Icons.send className="mr-2 h-4 w-4" />
              Contact
            </LinkButton>
            <Button
              variant={"blueOutline"}
              onClick={toggleCart}
              className="rounded-full relative flex items-center justify-center p-2  aspect-square"
            >
              {cartTotalQuantity > 0 && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 font-bold p-1 text-sm flex items-center justify-center text-theme-blue bg-[#EDF6FB] rounded-full">
                  {cartTotalQuantity}
                </span>
              )}
              <Icons.shoppingBag className="h-5 w-5 " />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
