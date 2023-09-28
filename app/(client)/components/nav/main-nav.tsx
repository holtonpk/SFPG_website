"use client";
import { Input } from "@/app/(client)/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { Icons } from "@/app/(client)/components/icons";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/hooks/use-scroll";
import clsx from "clsx";
import { siteConfig } from "@/config/site";
import { LinkButton } from "@/app/(client)/components/ui/link";
import { marketingConfig } from "@/config/marketing";
import { cn } from "@/lib/utils";
import { Button } from "@/app/(client)/components/ui/button";
import { motion } from "framer-motion";
import ContactForm from "@/app/(client)/components/contact-form";
import { useCart } from "../../../../context/cart";
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
      <div
        className="header mx-auto w-full z-20 absolute hidden md:block border-b"
        id="header"
      >
        <div
          className="flex h-20 items-center justify-between w-full container"
          id="header-container"
        >
          <div
            className="flex w-fit items-center sticky md:gap-10"
            id="header-logo-container"
          >
            <Link href="/#" className="pb-1" id="header-logo-link">
              <span
                className="header__logo text-2xl p-2 text-primary font-bold flex items-center"
                id="header-logo"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                  className="header__logo-icon h-8 w-8 lg:h-9 lg:w-9 relative rounded-lg mr-1 bg-theme-blue flex justify-center items-center"
                  id="header-logo-icon"
                >
                  <Icons.logo
                    className="text-white h-10 w-10 absolute"
                    color="rgb(255 255 255)"
                  />
                </motion.div>
                <span
                  className="header__logo-text ml-1 text-theme-blue font-head lg:text-2xl"
                  id="header-logo-text"
                >
                  {siteConfig.name}
                </span>
              </span>
            </Link>
            <div
              className="header__nav flex flex-row items-center gap-6"
              id="header-nav"
            >
              {marketingConfig.mainNav?.length ? (
                <nav className="hidden gap-6 md:flex" id="header-nav-menu">
                  {marketingConfig.mainNav?.map((item, index) => (
                    <Link
                      key={index}
                      href={item.disabled ? "#" : item.href}
                      className={cn(
                        "flex items-center text-base font-body transition-colors hover:text-foreground/80 ",
                        item?.cta ? "text-theme-blue" : "text-black",

                        item.disabled && "cursor-not-allowed opacity-80"
                      )}
                      id={`header-nav-link-${index}`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>
          <div
            className="flex w-fit items-center relative gap-4 h-10"
            id="header-action-buttons"
          >
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
              className="rounded-full relative flex items-center justify-center p-2 aspect-square"
              id="header-cart-button"
            >
              {cartTotalQuantity > 0 && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 font-bold p-1 text-sm flex items-center justify-center text-theme-blue bg-[#EDF6FB] rounded-full"
                  id="header-cart-quantity"
                >
                  {cartTotalQuantity}
                </span>
              )}
              <Icons.shoppingBag className="h-5 w-5 " id="header-cart-icon" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
