"use client";
import React from "react";
import Waitlist from "./waitlist";
import ReactGA from "react-ga";
import { initGA } from "@/google-analytics.js";

const Page = () => {
  React.useEffect(() => {
    initGA();
  }, []);

  React.useEffect(() => {
    if (window) {
      ReactGA.pageview(window.location.pathname + window.location.search);
    }
  }, [window]);

  return <Waitlist />;
};

export default Page;
