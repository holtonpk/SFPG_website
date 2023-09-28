import React from "react";
import { Overview } from "./components/overview";
import { ScrollArea } from "@/app/admin/components/ui/scroll-area";
import { Separator } from "@/app/admin/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import { Icons } from "../components/icons";
import { CalendarDateRangePicker } from "@/app/admin/analytics/components/date-range-picker";

const page = () => {
  const tags = Array.from({ length: 10 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );

  const TopPages = [
    {
      title: "/",
      value: 5032,
    },
    {
      title: "/welcome",
      value: 4376,
    },
    {
      title: "/about",
      value: 3932,
    },
    {
      title: "/contact",
      value: 2312,
    },
    {
      title: "/blog",
      value: 1223,
    },
  ];

  const TopReferrers = [
    {
      title: "instagram.com",
      value: 5032,
    },
    {
      title: "titkok.com",
      value: 4376,
    },
    {
      title: "reddit.com",
      value: 3932,
    },
    {
      title: "google.com",
      value: 2312,
    },
    {
      title: "youtube.com",
      value: 1223,
    },
  ];
  const Countries = [
    {
      title: "United State",
      value: 5032,
    },
    {
      title: "Canada",
      value: 4376,
    },
    {
      title: "China",
      value: 3932,
    },
    {
      title: "Japan",
      value: 2312,
    },
    {
      title: "Nigeria",
      value: 1223,
    },
  ];
  const OperatingSystems = [
    {
      title: "IOS",
      value: 5032,
    },
    {
      title: "Android",
      value: 4376,
    },
    {
      title: "Windows",
      value: 3932,
    },
    {
      title: "Mac",
      value: 231,
    },
    {
      title: "Chrome OS",
      value: 1223,
    },
  ];
  const Browsers = [
    {
      title: "Mobile Safari",
      value: 5032,
    },
    {
      title: "Instagram App",
      value: 4376,
    },
    {
      title: "Chrome",
      value: 3932,
    },
    {
      title: "Chrome Mobile",
      value: 2312,
    },
    {
      title: "Samsung Browser",
      value: 1223,
    },
  ];
  return (
    <div className="flex flex-col gap-8 items-center pt-8 container ">
      <div className="col-span-4 w-[80%] flex flex-col  ">
        <div className="flex gap-4 items-end">
          <Card className="w-1/4 rounded-b-none border-b-0 ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page views</CardTitle>
              <Icons.showPassword className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.7k</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="w-1/4 rounded-b-none border-b-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Visitors</CardTitle>
              <Icons.profile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.3k</div>
              <p className="text-xs text-muted-foreground">
                +120.1% from last month
              </p>
            </CardContent>
          </Card>
          <div className="ml-auto">
            <CalendarDateRangePicker />
          </div>
        </div>
        <div className="border border-border rounded-t-none  p-4 rounded-md flex flex-col ">
          <Overview />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-8 w-full">
        <Card className="h-80 w-full rounded-md border border-border col-span-3">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-2xl font-semibold">Top Pages</CardTitle>
            <CardDescription className="text-sm">
              Which pages are the post view on your website
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <ScrollArea className="h-48 w-full rounded-md  col-span-2">
              {TopPages.map((tag) => (
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
              {TopReferrers.map((tag) => (
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
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="h-80 w-full rounded-md border border-border col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-2xl font-semibold">Countries</CardTitle>
            <CardDescription className="text-sm">
              Top pages by views
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-2">
            <ScrollArea className="h-48 w-full rounded-md  col-span-2">
              {Countries.map((tag) => (
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
              {OperatingSystems.map((tag) => (
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
              {Browsers.map((tag) => (
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
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
