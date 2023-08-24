import React from "react";
import Hero from "./Hero";
import Why from "./About";
import Display from "./Display";
import About from "./About";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";
export const metadata = constructMetadata({
  title: `${siteConfig.title} - The new era of books`,
  description: siteConfig.description,
});

const HomePage = () => {
  return (
    <div className="overflow-hidden max-w-screen ">
      <Hero />
      <About />
      <Display />
    </div>
  );
};

export default HomePage;
