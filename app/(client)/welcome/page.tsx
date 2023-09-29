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
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return <Waitlist />;
};

export default Page;
