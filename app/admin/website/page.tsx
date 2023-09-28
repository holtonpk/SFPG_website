"use client";
import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import SentRequests from "@/app/admin/website/components/sent-requests";
import MetaData from "@/app/admin/website/components/meta-data";
import Iframe from "@/app/admin/website/components/iframe";
import Responsive from "@/app/admin/website/components/responsive";
import PageSelector from "@/app/admin/website/components/page-selector";
import { CreateRequest } from "@/app/admin/website/components/create-request";
import { Card } from "@/app/admin/components/ui/card";
import AdminNav from "@/app/admin/website/components/admin-nav";
import pagesConfig from "@/config/pagesConfig.json";
import {
  Location,
  Note,
  UpdateRequest,
  ScreenSize,
  DisplayPage,
} from "@/app/admin/types";
import { screenSizes, Note1 } from "@/app/admin/lib/config";

const Page = () => {
  const [displayPage, setDisplayPage] = React.useState<DisplayPage>({
    id: "home",
    url: "/",
  });
  const [createRequest, setCreateRequest] = React.useState<boolean>(false);

  const [showLive, setShowLive] = React.useState<boolean>(false);

  const [screenSize, setScreenSize] = React.useState<ScreenSize>(
    screenSizes[1]
  );

  const [selectedLocation, setSelectedLocation] = React.useState<Location[]>(
    []
  );

  // sync with db
  const [updateRequests, setUpdateRequests] = React.useState<UpdateRequest[]>([
    {
      title: "Update this text",
      status: "pending",
      priority: "routine",
      type: "edit",
      locationDescription: "top of the page",
      locations: [
        {
          viewPort: "laptop",
          element: "p",
          text: "Craving a little motivation? Open this book to dive into a world of riveting tales and lessons from history's most influential businessman.",
          location: {
            id: "about-description",
          },
        },
      ],
      description: "The title is outdated please fix it ",
      author: {
        name: "Patrick Holton",
        initials: "PH",
        avatar: "/avatars/02.png",
      },
      date: 1695853683,
    },
  ]);

  const [notes, setNotes] = React.useState<Note[]>([Note1]);

  return (
    <>
      <div className=" w-full grid grid-cols-5 gap-8 container pt-6 flex-grow">
        <Card className="flex flex-col gap-2 p-4 rounded-md h-fit col-span-3">
          <div className="flex gap-4 ">
            <PageSelector
              displayPage={displayPage}
              setDisplayPage={setDisplayPage}
            />
            <Responsive
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              showLive={showLive}
              setShowLive={setShowLive}
            />
          </div>

          <div id="iframeContainer" className={`flex flex-col w-full gap-4`}>
            <Iframe
              displayPage={displayPage}
              screenSize={screenSize}
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
              createRequest={createRequest}
              setCreateRequest={setCreateRequest}
              updateRequests={updateRequests}
              notes={notes}
              setNotes={setNotes}
              showLive={showLive}
              setShowLive={setShowLive}
            />
          </div>
        </Card>
        <div className="flex flex-col col-span-2 gap-8">
          {createRequest ? (
            <CreateRequest
              setSelectedLocation={setSelectedLocation}
              selectedLocation={selectedLocation}
              createRequest={createRequest}
              setCreateRequest={setCreateRequest}
              updateRequests={updateRequests}
              setUpdateRequests={setUpdateRequests}
              showLive={showLive}
              setShowLive={setShowLive}
            />
          ) : (
            <>
              <MetaData
                displayPage={displayPage}
                setDisplayPage={setDisplayPage}
              />
              <SentRequests
                updateRequests={updateRequests}
                setUpdateRequests={setUpdateRequests}
                setCreateRequest={setCreateRequest}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
