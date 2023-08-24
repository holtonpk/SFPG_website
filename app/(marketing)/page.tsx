import React from "react";
import Hero from "./Hero";
import Why from "./About";
import Display from "./Display";
import About from "./About";
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
