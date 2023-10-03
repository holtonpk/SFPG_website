"use client";
import { Icons } from "@/app/admin/components/icons";
import React, { use } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import { siteConfig } from "@/config/site";
import pagesConfig from "@/config/pagesConfig.json";
import { DisplayPage } from "@/app/admin/types";

const PageSelector = ({
  displayPage,
  setDisplayPage,
}: {
  displayPage: DisplayPage;
  setDisplayPage: (page: DisplayPage) => void;
}) => {
  const [changePage, setChangePage] = React.useState<string>(displayPage.id);

  React.useEffect(() => {
    if (!changePage) return;
    setDisplayPage({
      id: pagesConfig[changePage as keyof typeof pagesConfig].id,
      url: pagesConfig[changePage as keyof typeof pagesConfig].url,
    });
  }, [changePage, setDisplayPage]);

  return (
    <Select onValueChange={setChangePage}>
      <SelectTrigger className="flex-grow ">
        <SelectValue
          placeholder={
            siteConfig.url + (displayPage.url === "/" ? "" : displayPage.url)
          }
        />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(pagesConfig).map((page, i) => {
          const pageData = pagesConfig[page as keyof typeof pagesConfig];
          return (
            <SelectItem
              className="flex items-center justify-between overflow-hidden text-ellipsis whitespace-nowrap"
              key={i}
              value={page}
              onClick={() => {
                setDisplayPage({
                  id: pageData.id,
                  url: pageData.url,
                });
              }}
            >
              {siteConfig.url + (pageData.url === "/" ? "" : pageData.url)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default PageSelector;
