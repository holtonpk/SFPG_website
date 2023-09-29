"use client";
import * as React from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/app/admin/components/ui/input";
import { Label } from "@/app/admin/components/ui/label";
import { Icons } from "@/app/admin/components/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/admin/components/ui/card";
import { generateRandomId } from "@/app/admin/lib/utils";

import { Button } from "@/app/admin/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/admin/components/ui/select";
import { toast } from "@/app/admin/components/ui/use-toast";
import {
  Location,
  Note,
  UpdateRequest,
  ScreenSize,
  UserData,
} from "@/app/admin/types";
import { useAuth } from "@/app/admin/context/user-auth";
import { useAdminStorage } from "@/app/admin/context/storage";

const FormSchema = z.object({
  title: z.string(),
  locationDescription: z.string().optional(),
  priority: z.enum(["routine", "important", "critical"]),
  type: z.enum(["add", "edit", "remove", "fix", "move", "other"]),
  description: z.string().optional(),
});

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
  const [isLoading, setIsLoading] = React.useState(false);
  const { author } = useAuth()!;
  const { CreateUpdateRequest } = useAdminStorage()!;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const newRequest: UpdateRequest = {
      id: generateRandomId(),
      title: data.title,
      status: "pending",
      type: data.type,
      priority: data.priority,
      description: data.description || "",
      locationDescription: data.locationDescription || "",
      locations: selectedLocation || [],
      date: new Date().getTime(),
      author: author,
    };
    setIsLoading(true);
    const res = await CreateUpdateRequest(newRequest);
    if (res === "error") {
      toast({
        title: "Error creating new request ",
        description: "Please contact support. ",
        variant: "destructive",
      });
    } else if (res === "success") {
      toast({
        title: "Successfully created new request ",
        description: "Your request has been submitted for review.",
      });
      setUpdateRequests([...updateRequests, newRequest]);
      setSelectedLocation([]);
      setCreateRequest(false);
      cancelRequest();
    }
    setIsLoading(false);
  }

  const removeLocation = (loc: Location) => {
    Array.isArray(selectedLocation) &&
      setSelectedLocation(selectedLocation?.filter((l) => l !== loc));
    if (selectedLocation?.length === 1) {
      setSelectedLocation([]);
      setCreateRequest(false);
    }
  };

  const cancelRequest = () => {
    setSelectedLocation([]);
    setCreateRequest(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Create a request</CardTitle>
            <CardDescription className="">
              What changes do you want made?
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter a title"
                    className="w-full"
                  />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="routine">Routine</SelectItem>
                        <SelectItem value="important">Important</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex">Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a priority level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="add">Add</SelectItem>
                        <SelectItem value="edit">Edit</SelectItem>
                        <SelectItem value="remove">Remove</SelectItem>
                        <SelectItem value="fix">Fix</SelectItem>
                        <SelectItem value="move">Move</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="locationDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <Input
                      {...field}
                      placeholder="Describe the location of the change (optional)"
                      className="w-full"
                    />
                  </FormItem>
                )}
              />
              <span className=" text-center">or</span>
              {selectedLocation.length === 0 ? (
                <>
                  {createRequest ? (
                    <p className="text-center text-muted-foreground">
                      Click on a location
                    </p>
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Input
                    {...field}
                    placeholder="Describe your request (optional)"
                    className="w-full"
                  />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="justify-between space-x-2">
            <Button onClick={cancelRequest} variant="ghost" className="">
              Cancel
            </Button>
            <Button type="submit" className="rounded-md ">
              {isLoading && (
                <Icons.spinner className="animate-spin h-4 w-4 mr-2" />
              )}
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
