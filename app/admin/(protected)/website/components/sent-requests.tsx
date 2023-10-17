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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSeparator,
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
import { useAdminStorage } from "@/app/admin/context/storage";
import { toast } from "@/app/admin/components/ui/use-toast";
import { Label } from "@/app/admin/components/ui/label";
import { DisplayPage } from "@/app/admin/types";

const SentRequests = ({
  updateRequests,
  setUpdateRequests,
  setCreateRequest,
  setDisplayPage,
}: {
  updateRequests: UpdateRequest[];
  setUpdateRequests: (requests: UpdateRequest[]) => void;
  setCreateRequest: (createRequest: boolean) => void;
  setDisplayPage: (page: DisplayPage) => void;
}) => {
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
                <RequestRow
                  request={request}
                  setUpdateRequests={setUpdateRequests}
                  setDisplayPage={setDisplayPage}
                  updateRequests={updateRequests}
                  key={i}
                />
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

const RequestRow = ({
  request,
  setDisplayPage,
  setUpdateRequests,
  updateRequests,
}: {
  request: UpdateRequest;
  setDisplayPage: (page: DisplayPage) => void;
  setUpdateRequests: (requests: UpdateRequest[]) => void;
  updateRequests: UpdateRequest[];
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const viewRequest = () => {
    if (isExpanded) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
      setDisplayPage(request.locations[0].page);
    }
  };

  const { DeleteUpdateRequest, changeUpdateRequestStatus } = useAdminStorage()!;

  async function deleteUpdateRequest(request: UpdateRequest) {
    const res = await DeleteUpdateRequest(request.id);

    if (res == "success") {
      setUpdateRequests(updateRequests.filter((r) => r.title != request.title));
      toast({
        title: "Request deleted",
        description: "The request has been deleted. ",
      });
    } else {
      toast({
        title: "Error deleting request ",
        description: "Please contact support. ",
        variant: "destructive",
      });
    }
  }

  const updateStatus = (
    status: "pending" | "in progress" | "completed" | "rejected"
  ) => {
    changeUpdateRequestStatus(request.id, status);
    setUpdateRequests(
      updateRequests.map((r) => {
        if (r.id == request.id) {
          return { ...r, status: status };
        } else {
          return r;
        }
      })
    );
  };

  return (
    <div
      key={request.id}
      className={`"flex flex-col px-3 rounded-md border  cursor-pointer relative
      ${isExpanded ? "border-border" : "border-transparent hover:border-border"}
      `}
    >
      <div className="flex items-center md:flex-row  justify-between w-full py-5  ">
        <div
          onClick={viewRequest}
          className="absolute w-full h-full left-0 z-10 "
        />
        <div className="flex ga-2 pointer-events-none relative z-20">
          <Avatar className="h-6 w-6 md:h-9 md:w-9">
            <AvatarImage src={request.author.avatar} alt="Avatar" />
            <AvatarFallback>
              {request.author.firstName[0] + request.author.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none ">
              {request.author.firstName + " " + request.author.lastName}
            </p>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1">
                {request.status == "pending" && (
                  <Icons.circleDashed className="h-3 w-3 mt-[2px] text-primary rotate-90" />
                )}
                {request.status == "in progress" && (
                  <Icons.circle className="h-3 w-3 mt-[2px] text-primary" />
                )}
                {request.status == "completed" && (
                  <Icons.checkCircle className="h-3 w-3 mt-[2px] text-primary " />
                )}
                {request.status == "rejected" && (
                  <Icons.xCircle className="h-3 w-3 mt-[2px] text-primary " />
                )}
                <p className="text-[12px] md:text-sm text-muted-foreground ">
                  {request.status}
                </p>
              </div>
              <div className="h-[12px] w-[1px] bg-border"></div>
              <p className="text-[12px] md:text-sm text-muted-foreground ">
                {timeSince(Number(request.date))}
              </p>
            </div>
          </div>
        </div>
        <p className="text-sm max-w-[40%] overflow-hidden text-ellipsis  pointer-events-none  relative z-20 ">
          {request.title}
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger className="hidden md:relative z-20 hover:bg-accent hover:text-accent-foreground md:inline-flex items-center justify-center rounded-md p-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
            <Icons.ellipsis className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Update Status</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="border-border ">
                  <DropdownMenuItem onClick={() => updateStatus("pending")}>
                    <span>Pending</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => updateStatus("in progress")}>
                    <span>In Progress</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => updateStatus("completed")}>
                    <span>Completed</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => updateStatus("rejected")}>
                    <span>Rejected</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => deleteUpdateRequest(request)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isExpanded && (
        <div className="pb-4 flex flex-col">
          <Label className="text-sm font-medium">Description:</Label>
          <p className="text-muted-foreground">{request.description}</p>
          <Label className="text-sm font-medium">Location:</Label>
          {request.locations.map((location, i) => (
            <div key={i} className="flex flex-col">
              <p className="text-sm text-muted-foreground">
                page:{location.page.url}
              </p>
              <p className="text-sm text-muted-foreground">
                element:{"<" + location.element + ">"} id=
                {location.location.id}
              </p>
              <p className="text-sm text-muted-foreground max-w-full ">
                element text:{location.text}
              </p>
              <p className="text-sm text-muted-foreground">
                View Port :{location.viewPort}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SentRequests;
