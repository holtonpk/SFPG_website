"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/admin/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/admin/components/ui/avatar";
import { Icons } from "@/app/admin/components/icons";
import { Button } from "@/app/admin/components/ui/button";
import { UpdateRequest } from "@/app/admin/types";
import { CardFooter } from "@/app/(client)/components/ui/card";
import { timeSince } from "@/app/admin/lib/utils";
import { ScrollArea } from "@/app/admin/components/ui/scroll-area";

const SentRequests = ({
  updateRequests,
  setUpdateRequests,
  setCreateRequest,
}: {
  updateRequests: UpdateRequest[];
  setUpdateRequests: (requests: UpdateRequest[]) => void;
  setCreateRequest: (createRequest: boolean) => void;
}) => {
  console.log("updateRequests", updateRequests.length);
  return (
    <>
      {updateRequests.length <= 0 ? (
        <Card className="col-span-2 h-[420px] flex flex-col items-center justify-center">
          <CardContent className="flex flex-col items-center gap-4">
            <div className="p-6 border border-border rounded-md items-center flex justify-center w-fit">
              <Icons.send className="h-12 w-12 " />
            </div>
            <p className="text-lg text-center">
              No update requests at the moment. <br />
              Click below to create one.
            </p>
            <Button onClick={() => setCreateRequest(true)}>
              Create Request
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="col-span-2 h-[420px] flex flex-col ">
          <CardHeader>
            <CardTitle>Website Update Requests</CardTitle>
            <CardDescription>
              View and manage all website update requests here
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-hidden flex-grow ">
            <ScrollArea className="grid   h-full">
              {updateRequests.map((request, i) => (
                <div
                  key={request.title}
                  className="flex items-center justify-between w-full py-5"
                >
                  <div className="flex ga-2">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={request.author.avatar} alt="Avatar" />
                      <AvatarFallback>{request.author.initials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none ">
                        {request.author.name}
                      </p>
                      <div className="flex gap-2 items-center">
                        <div className="flex items-center gap-1">
                          <Icons.circle className="h-2 w-2 mt-[2px] text-primary" />
                          <p className="text-sm text-muted-foreground ">
                            {request.status}
                          </p>
                        </div>
                        <div className="h-[12px] w-[1px] bg-border"></div>
                        <p className="text-sm text-muted-foreground ">
                          {timeSince(request.date)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm max-w-[40%] overflow-hidden text-ellipsis   ">
                    {request.title}
                  </p>

                  <DropdownMenu>
                    <DropdownMenuTrigger className="hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                      <Icons.ellipsis className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => {
                          setUpdateRequests(
                            updateRequests.filter(
                              (r) => r.title != request.title
                            )
                          );
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter className="mt-auto ">
            <Button onClick={() => setCreateRequest(true)} className="ml-auto">
              Create Request
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default SentRequests;
