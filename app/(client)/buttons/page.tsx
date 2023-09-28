import React from "react";
import { Button } from "@/app/(client)/components/ui/button";
const page = () => {
  return (
    <div className="p-20 grid gap-10 w-fit bg-background">
      <Button>Test</Button>
      <Button variant="outline">Test</Button>
      <Button variant="blue">Test</Button>
      <Button variant="blueOutline">Test</Button>
      <Button variant="pink">Test</Button>
      <Button variant="pinkOutline">Test</Button>
      <Button variant="link">Test</Button>
      <Button variant={"ghost"}>Test</Button>
      <Button variant="destructive">Test</Button>
    </div>
  );
};

export default page;
