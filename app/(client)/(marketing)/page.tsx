import React from "react";
import Hero from "./Hero";
import Why from "./About";
import Display from "./Display";
import About from "./About";
import { siteConfig } from "@/config/site";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: siteConfig.pages.home.title,
  description: siteConfig.pages.home.description,
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
