"use client";
import { Button } from "@/app/admin/components/ui/button";
import React, { SetStateAction } from "react";
import Image from "next/image";
import { Icons } from "@/app/admin/components/icons";
const urlMetadata = require("url-metadata");
import { siteConfig } from "@/config/site";
import { Card } from "@/app/admin/components/ui/card";
import { Input } from "@/app/admin/components/ui/input";
import { Label } from "@/app/admin/components/ui/label";
import { toast } from "@/app/admin/components/ui/use-toast";
import { set } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/app/admin/components/ui/alert-dialog";
import { DisplayPage } from "@/app/admin/types";

// import { editJsonFile } from "@/app/admin/lib/utils";
import pagesConfig from "@/config/pagesConfig.json";
import { Textarea } from "@/app/(client)/components/ui/textarea";
import { Skeleton } from "@/app/admin/components/ui/skeleton";

const MetaData = ({
  displayPage,
  setDisplayPage,
}: {
  displayPage: DisplayPage;
  setDisplayPage: (page: DisplayPage) => void;
}) => {
  const [liveMetaData, setLiveMetaData] = React.useState<any>(null);
  const updatedMetaData =
    pagesConfig[displayPage.id as keyof typeof pagesConfig];
  const [editMetaData, setEditMetaData] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingData, setLoadingData] = React.useState(false);
  const [editTitleValue, setEditTitleValue] = React.useState<string>(
    updatedMetaData.title
  );
  const [editDescriptionValue, setEditDescriptionValue] =
    React.useState<string>(updatedMetaData.description);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitleValue(e.target.value);
  };
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditDescriptionValue(e.target.value);
  };

  React.useEffect(() => {
    if (!displayPage) return;
    (async function () {
      setLoadingData(true);
      try {
        const metadata = await urlMetadata(siteConfig.url + displayPage.url, {
          mode: "same-origin",
          includeResponseBody: true,
        });
        setLiveMetaData(metadata);
      } catch (err) {
        console.log("fetch error:", err);
      }
      setLoadingData(false);
    })();
  }, [displayPage]);

  async function updateMetaDataValue() {
    updatedMetaData.title = editTitleValue;
    updatedMetaData.description = editDescriptionValue;
    const fullUpdatedMetaData = {
      ...pagesConfig,
      [displayPage.id]: updatedMetaData,
    };
    setLoading(true);
    try {
      const response = await fetch("/api/admin/edit-config", {
        method: "POST",
        body: JSON.stringify(fullUpdatedMetaData), // Send the new JSON data in the request body
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Successfully updated meta data",
          description: "Refresh the page to see the changes",
        });
        setDisplayPage({
          id: displayPage.id,
          url: displayPage.url,
        });
      } else {
        toast({
          title: "Error updating",
          description: "Something went wrong please contact support",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error updating",
        description: "Something went wrong please contact support",
        variant: "destructive",
      });
    }
    setLoading(false);
    setEditMetaData(false);
  }
  console.log("liveMetaData", liveMetaData);

  return (
    <div className="w-full">
      {liveMetaData && !loadingData ? (
        <Card className="p-4 rounded-md  w-full overflow-hidden">
          <div className="flex gap-2 ">
            <div className="h-10 w-10 rounded-full relative bg-gray-500 ">
              {liveMetaData?.favicons[0]?.href ? (
                <Image
                  alt="fav"
                  src={
                    siteConfig.url + "/" + liveMetaData?.favicons[0].href || ""
                  }
                  fill
                  objectFit="contain"
                />
              ) : (
                <Icons.globe className="h-full w-full text-white" />
              )}
            </div>
            <div className="flex flex-col">
              <h1 className="text-[14px] dark:text-[#dadce0] text-[#202124]">
                {liveMetaData.url}
              </h1>
              <h1 className=" dark:text-[#bdc1c6]  text-[#4D5156] text-sm text-[12px]">
                {liveMetaData.url}
              </h1>
            </div>
            <AlertDialog open={editMetaData} onOpenChange={setEditMetaData}>
              <AlertDialogTrigger className="ml-auto">
                <Button onClick={() => setEditMetaData(true)} variant={"ghost"}>
                  <Icons.pencil className="h-4 w-4  " />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <Card className=" rounded-md border-none w-full bg-muted-foreground/20 py-1 px-4">
                  <p className="text-[20px] text-primary  dark:textq-[#8AB5F7] textq-[#1A0EAB] mt-2 ">
                    {editTitleValue}
                  </p>
                  <p className="text-[14px]  dark:text-white text-[#4D5156]">
                    {trimStringTo160Chars(editDescriptionValue)}
                  </p>
                </Card>
                <div className="gap-2 grid">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    className=""
                    defaultValue={liveMetaData.title}
                    onChange={handleTitleChange}
                  />
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className="h-[100px]"
                    defaultValue={liveMetaData.description}
                    onChange={handleDescriptionChange}
                  />
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={updateMetaDataValue}>
                    {loading && (
                      <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
                    )}
                    Save
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className="max-w-full overflow-hidden relative">
            <p className="text-[20px] text-primary  dark:textq-[#8AB5F7] textq-[#1A0EAB] mt-2 whitespace-nowrap text-ellipsis overflow-hidden">
              {liveMetaData?.title}
            </p>
          </div>
          <p className="text-[14px]  dark:text-white text-[#4D5156]">
            {trimStringTo160Chars(liveMetaData?.description)}
          </p>
        </Card>
      ) : (
        <Card className="p-4 rounded-md  w-full overflow-hidden">
          <div className="flex gap-2 ">
            <Skeleton className="h-10 w-10 rounded-full relative " />
            <div className="grid">
              <Skeleton className=" h-[14px] w-[150px]" />
              <Skeleton className=" h-[12px] w-[100px]" />
            </div>
            <Skeleton className="ml-auto h-8 w-8" />
          </div>
          <Skeleton className="mt-2 h-[24px] w-full" />
          <Skeleton className="mt-2 h-[36px] w-full" />
        </Card>
      )}
    </div>
  );
};

export default MetaData;

function trimStringTo160Chars(inputString: string) {
  if (inputString.length <= 160) {
    return inputString; // Return the original string if it's 160 characters or less
  } else {
    const trimmedString = inputString.slice(0, 160); // Trim the string to 160 characters
    return trimmedString + "..."; // Add "..." at the end
  }
}
