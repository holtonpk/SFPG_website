"use client";
import React, { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import SentRequests from "@/app/admin/(protected)/website/components/sent-requests";
import MetaData from "@/app/admin/(protected)/website/components/meta-data";
import Iframe from "@/app/admin/(protected)/website/components/iframe";
import Responsive from "@/app/admin/(protected)/website/components/responsive";
import PageSelector from "@/app/admin/(protected)/website/components/page-selector";

import { CreateRequest } from "@/app/admin/(protected)/website/components/create-request";
import { Card } from "@/app/admin/components/ui/card";
import AdminNav from "@/app/admin/components/admin-nav";
import pagesConfig from "@/config/pagesConfig.json";
import { useAdminStorage } from "@/app/admin/context/storage";

import {
  Location,
  Note,
  UpdateRequest,
  ScreenSize,
  DisplayPage,
} from "@/app/admin/types";
import { screenSizes } from "@/app/admin/lib/config";
import { set } from "date-fns";

const Page = () => {
  const { FetchUpdateRequests, FetchNotes } = useAdminStorage()!;

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
  const [updateRequests, setUpdateRequests] = React.useState<UpdateRequest[]>(
    []
  );

  const [notes, setNotes] = React.useState<Note[]>([]);

  useEffect(() => {
    const getUpdateRequests = async () => {
      const updateRequestsRed = await FetchUpdateRequests();
      setUpdateRequests(updateRequestsRed);
    };

    const getNotes = async () => {
      const notesRed = await FetchNotes();
      setNotes(notesRed);
    };
    getNotes();
    getUpdateRequests();
  }, [FetchUpdateRequests, FetchNotes]);

  return (
    <>
      <div className=" w-full grid  md:grid-cols-5 gap-8 container pt-6 flex-grow ">
        <Card className="md:flex hidden flex-col gap-2 p-4 rounded-md h-fit col-span-3">
          <div className="gap-4 w-full flex  ">
            <div className="flex flex-grow max-w-[60%]">
              <PageSelector
                displayPage={displayPage}
                setDisplayPage={setDisplayPage}
              />
            </div>
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
        <div className="flex flex-col md:col-span-2 gap-8 col-span-1 max-w-full">
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
                setDisplayPage={setDisplayPage}
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
