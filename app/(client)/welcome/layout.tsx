import React from "react";
import "../client-style.css";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: siteConfig.pages.welcome.title,
  description: siteConfig.pages.welcome.description,
});

export default async function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
