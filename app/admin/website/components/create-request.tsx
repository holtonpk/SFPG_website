"use client";
import * as React from "react";
import { Icons } from "@/app/admin/components/icons";
import { Button } from "@/app/admin/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import { Input } from "@/app/admin/components/ui/input";
import { Label } from "@/app/admin/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import { Textarea } from "@/app/admin/components/ui/textarea";

import { set } from "react-hook-form";
import {
  Location,
  Note,
  UpdateRequest,
  ScreenSize,
  Author,
} from "@/app/admin/types";
import { useAdminStorage } from "@/app/admin/context/storage";

export function CreateRequest({
  selectedLocation,
  setSelectedLocation,
  createRequest,
  setCreateRequest,
  updateRequests,
  setUpdateRequests,
  showLive,
  setShowLive,
}: {
  selectedLocation: Location[];
  setSelectedLocation: (location: Location[]) => void;
  createRequest: boolean;
  setCreateRequest: (createRequest: boolean) => void;
  updateRequests: UpdateRequest[];
  setUpdateRequests: (requests: UpdateRequest[]) => void;
  showLive: boolean;
  setShowLive: (showLive: boolean) => void;
}) {
  const { CreateUpdateRequest } = useAdminStorage()!;

  const removeLocation = (loc: Location) => {
    Array.isArray(selectedLocation) &&
      setSelectedLocation(selectedLocation?.filter((l) => l !== loc));
    if (selectedLocation?.length === 1) {
      setSelectedLocation([]);
      setCreateRequest(false);
    }
  };

  const [priority, setPriority] = React.useState<string>();
  const [type, setType] = React.useState<string>();

  const descriptionInput = React.useRef<HTMLTextAreaElement>(null);
  const locationDescriptionInput = React.useRef<HTMLInputElement>(null);
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const createRequestRef = React.useRef<HTMLDivElement>(null);

  async function submitRequest() {
    const newRequest: UpdateRequest = {
      title: titleInputRef.current?.value || "",
      status: "pending",
      type: type,
      priority: priority,
      description: "",
      locationDescription: locationDescriptionInput.current?.value || "",
      locations: selectedLocation || [],
      date: new Date().getTime(),
      author: {
        name: "John Doe",
        avatar: "",
        initials: "JD",
      },
    };
    CreateUpdateRequest(newRequest);
    setUpdateRequests([...updateRequests, newRequest]);
    setSelectedLocation([]);
    setCreateRequest(false);
    cancelRequest();
  }

  const cancelRequest = () => {
    setSelectedLocation([]);
    setCreateRequest(false);
    setPriority("");
    setType("");
    if (locationDescriptionInput.current)
      locationDescriptionInput.current.value = "";
    if (descriptionInput.current) descriptionInput.current.value = "";
    if (locationDescriptionInput.current)
      locationDescriptionInput.current.value = "";
    if (titleInputRef.current) titleInputRef.current.value = "";
  };

  React.useEffect(() => {
    if (selectedLocation.length > 0 && !createRequest) {
      setTimeout(() => {
        titleInputRef.current?.focus();
        createRequestRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        setCreateRequest(true);
      }, 200);
    }
  }, [selectedLocation, createRequest, setCreateRequest]);

  return (
    <Card ref={createRequestRef}>
      <CardHeader>
        <CardTitle>Create a request</CardTitle>
        <CardDescription className="">
          What changes do you want made?
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="location">Title</Label>
          <Input
            ref={titleInputRef}
            id="title"
            placeholder="Give your request a title"
            className=""
            // autoFocus={true}
            // autoFocus={selectedLocation.length > 0 && EditState === "editing"}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select a level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="routine">Routine</SelectItem>
                <SelectItem value="important">Important</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="type">Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger
                id="type"
                className="line-clamp-1 w-[160px] truncate "
              >
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="add">Add</SelectItem>
                <SelectItem value="edit">Edit</SelectItem>
                <SelectItem value="remove">Remove</SelectItem>
                <SelectItem value="fix">Fix</SelectItem>
                <SelectItem value="move">Move</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input
            ref={locationDescriptionInput}
            id="location"
            placeholder="Describe where it's located on the site?"
          />
          <span className=" text-center">or</span>
          {selectedLocation.length === 0 ? (
            <>
              {createRequest ? (
                <>
                  <p className="text-center text-muted-foreground">
                    Click on a location
                  </p>
                  <Button
                    onClick={() => {
                      setSelectedLocation([]);
                      setCreateRequest(false);
                    }}
                    className="text-primary ml-auto"
                    variant={"ghost"}
                  >
                    cancel
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    setCreateRequest(true);
                    setShowLive(false);
                  }}
                  className=""
                >
                  Select Location
                </Button>
              )}
            </>
          ) : (
            <>
              {selectedLocation.map((loc, i) => (
                <div
                  key={i}
                  className="flex h-9 w-full text-ellipsis whitespace-nowrap overflow-hidden items-center  rounded-md border border-input bg-transparent px-3 py-2 hover:border-primary cursor-pointer text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Button
                    onClick={() => removeLocation(loc)}
                    size={"sm"}
                    variant={"ghost"}
                    className="p-0 px-1 mr-2"
                  >
                    <Icons.close className="w-6 h-6 text-muted-foreground" />
                  </Button>
                  <div
                    key={i}
                    className="flex-grow  text-ellipsis overflow-hidden "
                  >
                    {loc.location.id} | {loc.element} | {loc.text}
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setSelectedLocation([]);

                  setCreateRequest(false);
                }}
                className="text-primary ml-auto"
                variant={"ghost"}
              >
                reset
              </Button>
            </>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description" className="">
            Description
          </Label>
          <Textarea
            ref={descriptionInput}
            className=""
            id="description"
            placeholder="Please include all information relevant to your request."
          />
        </div>
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button onClick={cancelRequest} variant="ghost" className="">
          Cancel
        </Button>
        <Button className="rounded-md " onClick={submitRequest}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  );
}
