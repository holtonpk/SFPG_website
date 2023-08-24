import { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Short Form Books",
  title: "Short Form Books",
  description: "The new era of books",
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  logo: "",
  links: {
    twitter: "",
    github: "",
  },
  contact: {
    supportEmail: "",
  },
};
