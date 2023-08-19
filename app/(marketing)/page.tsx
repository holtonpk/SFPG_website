import React from "react";
import Hero from "./Hero";
import Why from "./Why";
import Display from "./Display";
import About from "./About";
const HomePage = () => {
  return (
    <div className="overflow-hidden max-w-screen ">
      <Hero />
      <Why />
      <Display />
      <About />
    </div>
  );
};

export default HomePage;
