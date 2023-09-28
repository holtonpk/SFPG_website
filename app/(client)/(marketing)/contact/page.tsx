import React from "react";
import ContactFrom from "./ContactFrom";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: siteConfig.pages.contact.title,
  description: siteConfig.pages.contact.description,
});
const page = () => {
  return <ContactFrom />;
};

export default page;
