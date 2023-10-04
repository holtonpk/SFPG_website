"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Overview } from "./components/overview";
import { ScrollArea } from "@/app/admin/components/ui/scroll-area";
import { Separator } from "@/app/admin/components/ui/separator";
import { Button } from "@/app/admin/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import { Icons } from "../../components/icons";
import { CalendarDateRangePicker } from "@/app/admin/(protected)/site-data/components/date-range-picker";
import { AnalyticsResponseData } from "@/app/admin/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import { date } from "zod";
import { Type } from "lucide-react";
import { Skeleton } from "../../components/ui/skeleton";
interface RankedItem {
  title: string;
  value: number;
}

const AnalyticsPage = () => {
  const [analyticsData, setAnalyticsData] =
    React.useState<AnalyticsResponseData>();

  const timeFrames = [
    {
      startDate: getDateDaysAgo(2),
      units: "hours",
    },
    {
      startDate: getDateDaysAgo(7),
      units: "days",
    },
    {
      startDate: getDateDaysAgo(30),
      units: "days",
    },
  ];

  type TimeFrame = {
    startDate: string;
    units: string;
  };

  const [timeFrame, setTimeFrame] = React.useState<TimeFrame>(timeFrames[1]);
  const [loading, setLoading] = React.useState<boolean>();
  console.log("timeFrame", timeFrames);

  useEffect(() => {
    async function fetchAnalyticsData() {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/get-analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(timeFrame),
        });
        if (!res.ok) {
          throw new Error(`Fetch failed with status: ${res.status}`);
        }

        const data: AnalyticsResponseData = await res.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
      setLoading(false);
    }

    fetchAnalyticsData();
  }, [timeFrame]);

  console.log(timeFrame);

  return (
    <>
      {/* {!analyticsData ? (
        <PageSkeleton />
      ) : ( */}
      <div className="flex flex-col gap-8 items-center pt-8 container ">
        <div className="col-span-4 w-[80%] flex flex-col  ">
          <div className="flex gap-4 items-end">
            <Card className="w-1/4 rounded-b-none border-b-0 ">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Page views
                </CardTitle>
                <Icons.showPassword className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData
                    ? !loading
                      ? analyticsData.siteTrafficData.pageViews
                      : "--"
                    : "--"}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p> */}
              </CardContent>
            </Card>
            <Card className="w-1/4 rounded-b-none border-b-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visitors</CardTitle>
                <Icons.profile className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {analyticsData
                    ? !loading
                      ? analyticsData.siteTrafficData.users
                      : "--"
                    : "--"}
                </div>
                {/* <p className="text-xs text-muted-foreground">
                    +120.1% from last month
                  </p> */}
              </CardContent>
            </Card>
            <div className="ml-auto">
              <Select
                onValueChange={(value: string) =>
                  setTimeFrame(timeFrames[Number(value)])
                }
              >
                <SelectTrigger
                  // defaultValue={"7d"}
                  className="w-[250px] rounded-b-none border-b-0 flex items-center gap-2 pl-8 relative"
                >
                  <Icons.calendar className="h-4 w-4 text-muted-foreground absolute left-2 top-1/2 -translate-y-1/2" />
                  <SelectValue placeholder="Last 7 days" className="w-fit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">Last 24 hours</SelectItem>
                  <SelectItem value="1">Last 7 days</SelectItem>
                  <SelectItem value="2">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="border border-border rounded-t-none h-[382px] p-4 rounded-md flex flex-col relative">
            {analyticsData && (
              <Overview
                siteTrafficByDateData={analyticsData.siteTrafficByDateData}
              />
            )}
            {loading && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-8 w-full">
          <Card className="h-80  rounded-md border border-border col-span-3">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl font-semibold">
                Top Pages
              </CardTitle>
              <CardDescription className="text-sm">
                Which pages are the post view on your website
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2 relative w-full">
              <ScrollArea className="h-48 relative rounded-md  w-[600px] ">
                <div className="w-[600px]">
                  {loading || !analyticsData ? (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                    </div>
                  ) : (
                    <>
                      {analyticsData.topPagesData.map((tag) => (
                        <>
                          <div
                            key={tag.title}
                            className=" w-[90%] flex justify-between relative mx-auto "
                          >
                            <h1 className="w-[60%] overflow-hidden whitespace-nowrap text-ellipsis">
                              {tag.title.replace("www.shortformbooks.com", "")}
                            </h1>
                            <h1 className="w-fit">{tag.value}</h1>
                          </div>
                          <Separator className="my-2" />
                        </>
                      ))}
                    </>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-80 w-full rounded-md border border-border col-span-3">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl font-semibold">
                Top Referrers
              </CardTitle>
              <CardDescription className="text-sm">
                Which sites refer the most traffic to your website
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <ScrollArea className="h-48 w-full rounded-md  col-span-2">
                {loading || !analyticsData ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                ) : (
                  <>
                    {analyticsData.pageReferrerData.map((tag) => (
                      <>
                        <div
                          key={tag.title}
                          className=" flex justify-between w-[90%] mx-auto"
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              height={20}
                              width={20}
                              src={
                                tag.title == "https://l.instagram.com/"
                                  ? `https://www.instagram.com/favicon.ico`
                                  : `${tag.title}/favicon.ico`
                              }
                              alt="Globe Icon"
                              onError={(e: any) => {
                                e.target.style.display = "none"; // Hide the image
                                e.target.nextSibling.style.display = "inline"; // Display the globe icon
                              }}
                            />
                            <Icons.globe
                              className="h-4 w-4 text-muted-foreground"
                              style={{ display: "none" }} // Initially hide the globe icon
                            />
                            <h1>{tag.title.length ? tag.title : "Direct"}</h1>
                          </div>
                          <h1>{tag.value}</h1>
                        </div>
                        <Separator className="my-2" />
                      </>
                    ))}
                  </>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-80 w-full rounded-md border border-border col-span-2">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl font-semibold">
                Countries
              </CardTitle>
              <CardDescription className="text-sm">
                Top pages by views
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <ScrollArea className="h-48 w-full rounded-md  col-span-2">
                {loading || !analyticsData ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                ) : (
                  <>
                    {analyticsData.countryData.map((tag) => (
                      <>
                        <div
                          key={tag.code}
                          className=" flex justify-between w-[90%] mx-auto"
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              alt={tag.code}
                              height={20}
                              width={20}
                              src={`https://flagsapi.com/${tag.code}/flat/64.png`}
                            ></Image>
                            <h1>{tag.name}</h1>
                          </div>
                          <h1>{tag.value}</h1>
                        </div>
                        <Separator className="my-2" />
                      </>
                    ))}
                  </>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-80 w-full rounded-md border border-border col-span-2">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl font-semibold">
                Operating Systems
              </CardTitle>
              <CardDescription className="text-sm">
                Top pages by views
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <ScrollArea className="h-48 w-full rounded-md  col-span-2">
                {loading || !analyticsData ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                ) : (
                  <>
                    {analyticsData.operatingSystemData.map((tag) => (
                      <>
                        <div
                          key={tag.title}
                          className=" flex justify-between w-[90%] mx-auto"
                        >
                          <h1>{tag.title}</h1>
                          <h1>{tag.value}</h1>
                        </div>
                        <Separator className="my-2" />
                      </>
                    ))}
                  </>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
          <Card className="h-80 w-full rounded-md border border-border col-span-2">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-2xl font-semibold">Browsers</CardTitle>
              <CardDescription className="text-sm">
                Top pages by views
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-2">
              <ScrollArea className="h-48 w-full rounded-md  col-span-2">
                {loading || !analyticsData ? (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Icons.spinner className="h-12 w-12 text-primary  ml-auto animate-spin " />
                  </div>
                ) : (
                  <>
                    {analyticsData.browserData.map((tag) => (
                      <>
                        <div
                          key={tag.title}
                          className=" flex justify-between w-[90%] mx-auto"
                        >
                          <h1>{tag.title}</h1>
                          <h1>{tag.value}</h1>
                        </div>
                        <Separator className="my-2" />
                      </>
                    ))}
                  </>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default AnalyticsPage;

function getDateDaysAgo(daysAgo: number): string {
  const today = new Date();
  const pastDate = new Date(today);
  pastDate.setDate(today.getDate() - daysAgo);

  const year = pastDate.getFullYear();
  const month = String(pastDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
  const day = String(pastDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const PageSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 items-center pt-8 container ">
      <div className="col-span-4 w-[80%] flex flex-col   ">
        <div className="flex gap-4 items-end h-[120px]">
          <Skeleton className="w-1/4 h-full rounded-b-none  " />
          <Skeleton className="w-1/4 h-full rounded-b-none" />
          <div className="ml-auto">
            <Skeleton className="w-[180px] rounded-b-none border-b-0 h-[40px]" />
          </div>
        </div>
        <Skeleton className=" rounded-t-none  p-4  flex flex-col h-[350px] w-full " />
      </div>

      <div className="grid grid-cols-6 gap-8 w-full">
        <Skeleton className="h-80 w-full rounded-md border border-border col-span-3" />
        <Skeleton className="h-80 w-full rounded-md border border-border col-span-3" />
        <Skeleton className="h-80 w-full rounded-md border border-border col-span-2" />
        <Skeleton className="h-80 w-full rounded-md border border-border col-span-2" />
        <Skeleton className="h-80 w-full rounded-md border border-border col-span-2" />
      </div>
    </div>
  );
};
