import { SiteConfig } from "@/types";
import pagesConfig from "@/config/pagesConfig.json";

export const siteConfig: SiteConfig = {
  name: "Short Form Books",
  title: "Short Form Books",
  description: "Bite-Sized Stories for the Modern Bookworm",
  businessName: "Short Form Books",
  url: process.env.NEXT_PUBLIC_SITE_URL as string,
  logo: "",
  links: {
    instagram: "https://www.instagram.com/shortformbooks",
    youtube: "https://www.youtube.com/@officialsnapshotsofsuccess",
    tiktok: "https://www.tiktok.com/@Shortformbooks",
  },
  contact: {
    supportEmail: "",
  },
  emailLists: {
    book1: "RMBhiE",
  },
  pages: pagesConfig,
};
