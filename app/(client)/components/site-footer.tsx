import * as React from "react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/app/(client)/components/icons";
import Image from "next/image";
import { LinkButton } from "./ui/link";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={cn(className, "footer bg-theme-blue text-white z-40 border-t")}
      id="footer"
    >
      <div
        className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0"
        id="footer-content"
      >
        <span
          className="footer__logo text-2xl p-2 text-primary font-bold  flex items-center "
          id="footer-logo"
        >
          <div
            className="footer__logo-icon h-10 w-10 md:h-14 md:w-14 relative -mr-2"
            id="footer-logo-icon"
          >
            <Icons.logo className="text-white" color="rgb(255 255 255) " />
          </div>
          <span
            className="footer__logo-text ml-1 font-head text-white md:text-base text-sm whitespace-nowrap"
            id="footer-logo-text"
          >
            {siteConfig.name}
          </span>
          <div
            className="footer__social-links flex gap-4 ml-10"
            id="footer-social-links"
          >
            <LinkButton
              variant={"secondaryOutline"}
              target="_blank"
              href={siteConfig.links.youtube}
              className="footer__social-link border rounded-full p-2 aspect-square"
            >
              <Icons.youtube
                className="md:h-6 md:w-6 h-4 w-4"
                id="footer-social-link-youtube"
              />
            </LinkButton>
            <LinkButton
              variant={"secondaryOutline"}
              target="_blank"
              href={siteConfig.links.instagram}
              className="footer__social-link border rounded-full p-2 aspect-square"
            >
              <Icons.instaGram
                className="md:h-6 md:w-6 h-4 w-4"
                id="footer-social-link-instagram"
              />
            </LinkButton>
            <LinkButton
              variant={"secondaryOutline"}
              target="_blank"
              href={siteConfig.links.tiktok}
              className="footer__social-link border rounded-full p-2 aspect-square"
            >
              <Icons.tiktok
                className="md:h-6 md:w-6 h-4 w-4"
                color="white"
                id="footer-social-link-tiktok"
              />
            </LinkButton>
          </div>
        </span>
        <div
          className="footer__copyright flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0"
          id="footer-copyright"
        >
          <p
            className="footer__copyright-text text-center text-[12px] md:text-sm leading-loose md:text-left"
            id="footer-copyright-text"
          >
            Copyright © 2023 {siteConfig.businessName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
