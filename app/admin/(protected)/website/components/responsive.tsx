import React, { useState } from "react";
import { Toggle } from "@/app/admin/components/ui/toggle";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/admin/components/ui/tabs";
import { Icons } from "@/app/(client)/components/icons";
import { Switch } from "@/app/admin/components/ui/switch";
import { Label } from "@/app/admin/components/ui/label";
import { screenSizes } from "@/app/admin/lib/config";
import { ScreenSize } from "@/app/admin/types";
const Responsive = ({
  screenSize,
  setScreenSize,
  showLive,
  setShowLive,
}: {
  screenSize: ScreenSize;
  setScreenSize: (size: ScreenSize) => void;
  showLive: boolean;
  setShowLive: (showLive: boolean) => void;
}) => {
  const changeScreenSize = (size: string) => {
    if (size == "mobile") {
      setScreenSize(screenSizes[0]);
    }
    if (size == "laptop") {
      setScreenSize(screenSizes[1]);
    }
    if (size == "desktop") {
      setScreenSize(screenSizes[2]);
    }
  };

  return (
    <>
      <Tabs
        defaultValue="laptop"
        className="space-y-10"
        onValueChange={changeScreenSize}
      >
        <TabsList>
          <TabsTrigger value="mobile">
            <Icons.smartPhone className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="laptop">
            <Icons.laptop className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="desktop">
            <Icons.monitor className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center space-x-2">
        <Switch
          id="edit-mod"
          checked={showLive}
          onCheckedChange={setShowLive}
        />
        <Label className="whitespace-nowrap" htmlFor="edit-mod">
          Live Site
        </Label>
      </div>
    </>
  );
};

export default Responsive;
