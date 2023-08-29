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
const navItems = ["pricing", "changelog"];

const transparentHeaderSegments = new Set(["metatags", "pricing"]);

export default function Nav() {
  const { domain = "dub.sh" } = useParams() as { domain: string };

  const scrolled = useScroll(20);
  const segment = useSelectedLayoutSegment();

  return (
    // <div
    //   className={clsx(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
    //     "border-b-border border-b bg-background1/20 backdrop-blur-lg": scrolled,
    //     "border-b-border border-b  b-b":
    //       segment && !transparentHeaderSegments.has(segment),
    //   })}
    // >
    <>
      <div className="mx-auto w-full z-20  absolute  container hidden md:block">
        <div className="flex h-20 items-center justify-between w-full  border-b">
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
                  className="h-8 w-8 lg:h-9 lg:w-9 relative rounded-lg mr-1 bg-theme1 flex justify-center items-center"
                >
                  <Icons.logo
                    className="text-white h-10 w-10 absolute"
                    color="rgb(255 255 255)"
                  />
                </motion.div>
                <span className="ml-1  text-theme1 font-head lg:text-2xl">
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
                        item?.cta ? "text-theme1" : "text-black",

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
          <div className="flex w-fit items-center relative gap-4 lg:gap-10  h-10">
            {/* <form className="border rounded-full flex items-center bg-transparent border-black px-2 h-full">
            <Icons.search className="h-4 w-4 lg:h-6 lg:w-6" />
            <Input
              type="text"
              placeholder="Search for a title"
              className="border-none pr-6 text-[12px] lg:text-base py-1 h-full"
            ></Input>
          </form> */}
            {/* <div className="flex gap-4 lg:gap-6">
              <Button className=" text-theme2 rounded-full aspect-square p-3 h-fit shadow-md">
                <Icons.cart className="h-4 w-4 lg:h-6 lg:w-6" />
              </Button>
              <Button className=" text-theme3 rounded-full aspect-square p-3 h-fit  shadow-md">
                <Icons.user className="h-4 w-4 lg:h-6 lg:w-6" />
              </Button>
            </div> */}
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
}
