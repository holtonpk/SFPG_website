"use client";
import React from "react";
import { Icons } from "@/app/(client)/components/icons";
import { Button } from "@/app/(client)/components/ui/button";
import { Textarea } from "@/app/(client)/components/ui/textarea";
import { Label } from "@/app/(client)/components/ui/label";
import { Input } from "@/app/(client)/components/ui/input";
import { useToast } from "@/app/(client)/components/ui/use-toast";
import { useStorage } from "@/context/storage";

const ContactFrom = () => {
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const subjectRef = React.useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const { CreateNewMessage } = useStorage()!;

  const { toast } = useToast();

  async function onSubmit() {
    setIsLoading(true);
    const createMessageResult = await CreateNewMessage(
      nameRef.current?.value as string,
      emailRef.current?.value as string,
      subjectRef.current?.value as string,
      messageRef.current?.value as string
    );
    setIsLoading(false);
    setShowModal(false);
    nameRef.current!.value = "";
    emailRef.current!.value = "";
    messageRef.current!.value = "";
    subjectRef.current!.value = "";
    toast({
      title: "Thanks for reaching out!",
      description: "We will get back to you shortly.",
    });
  }

  return (
    <div className="relative pt-6 lg:pt-40 container pb-20">
      <div className="container">
        <h1 id="contact-block-title" className="text-2xl md:text-5xl font-body">
          Have feedback? Lets get in touch! 🤝
        </h1>
        <div className="grid md:grid-cols-2 gap-10 md:gap-20 mt-10">
          <div className="grid gap-2">
            <Label id="name-label" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="First name"
              className="bg-theme-blue/10 border-none"
              ref={nameRef}
            />
          </div>
          <div className="grid gap-2">
            <Label id="email-label" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Enter your email"
              className="bg-theme-blue/10 border-none"
              ref={emailRef}
            />
          </div>
        </div>
        <div className="mt-10">
          <Label id="subject-label" htmlFor="subject">
            Subject
          </Label>
          <Input
            id="subject"
            placeholder="What's the message about?"
            className="bg-theme-blue/10 border-none"
            ref={subjectRef}
          />
        </div>
        <div className="mt-10">
          <Label id="message-label" htmlFor="Message">
            Message
          </Label>
          <Textarea
            placeholder="Enter your message here"
            className="bg-theme-blue/10"
            id="Message"
            ref={messageRef}
          />
        </div>
        <Button
          onClick={onSubmit}
          type="submit"
          id="send-button"
          className="w-full md:w-1/2 mt-10"
          size={"lg"}
        >
          {isLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.send className="mr-2 h-4 w-4" />
          )}
          Send
        </Button>
      </div>
    </div>
  );
};

export default ContactFrom;
