import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import Image from "next/image";
export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "bg-theme1 text-white z-40 border-t ")}>
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <span className="text-2xl p-2 text-primary font-bold  flex items-center ">
          <div className="h-7 w-7 relative mb-1 mr-2">
            {" "}
            <Icons.logo className="text-white" color="rgb(255 255 255) " />
          </div>
          <span className="ml-1 font-head text-white">{siteConfig.name}</span>
          <div className="flex gap-4 ml-10">
            <div className="border rounded-full p-2">
              <Icons.youtube className="h-6 w-6" />
            </div>
            <div className="border rounded-full p-2">
              <Icons.instaGram className="h-6 w-6" />
            </div>

            <div className="border rounded-full p-2">
              <Icons.facebook className="h-6 w-6" />
            </div>
          </div>
        </span>
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo /> */}
          <p className="text-center text-sm leading-loose md:text-left">
            Copyright © 2023 {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
