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

    <div className="mx-auto w-full z-20  absolute  container">
      <div className="flex h-20 items-center justify-between w-full  border-b">
        <div className="flex   w-fit items-center sticky  md:gap-10 ">
          <Link href="/#" className="pb-1 ">
            <span className="text-2xl p-2 text-primary font-bold  flex items-center ">
              <div className="h-7 w-7 relative mb-1 mr-2">
                {" "}
                <Icons.logo className="text-white" color="rgb(77 164 224)" />
              </div>
              <span className="ml-1 font-head text-theme1">
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
        <div className="flex w-fit items-center sticky  md:gap-10 ">
          <form className="border rounded-full flex items-center bg-transparent border-black px-2">
            <Icons.search className="h-6 w-6" />
            <Input
              type="text"
              placeholder="Search for a title"
              className="border-none pr-6 "
            ></Input>
          </form>
          <div className="flex gap-6">
            <Button className=" text-theme2 rounded-full aspect-square p-3 h-fit shadow-md">
              <Icons.cart className="h-6 w-6" />
            </Button>
            <Button className=" text-theme3 rounded-full aspect-square p-3 h-fit  shadow-md">
              <Icons.user className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}