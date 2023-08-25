import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";
import { Button } from "./ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useStorage } from "@/context/storage";
import { useToast } from "@/components/ui/use-toast";

import * as z from "zod";

import React from "react";

const ContactForm = () => {
  const createMessageSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    message: z.string(),
  });

  type FormData = z.infer<typeof createMessageSchema>;

  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  const nameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const { CreateNewMessage } = useStorage()!;

  const { toast } = useToast();

  async function onSubmit() {
    setIsLoading(true);
    const createMessageResult = await CreateNewMessage(
      nameRef.current?.value as string,
      emailRef.current?.value as string,
      messageRef.current?.value as string
    );
    setIsLoading(false);
    setShowModal(false);
    toast({
      title: "Thanks for reaching out!",
      description: "We will get back to you shortly.",
    });
  }

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className={
          "flex items-center text-base font-body transition-colors hover:text-foreground/80 border-theme1 text-theme1 bg-transparent hover:text-white hover:bg-theme1"
        }
      >
        <Icons.send className="mr-2 h-4 w-4" />
        Contact
      </Button>
      <Dialog open={showModal}>
        <DialogContent className="bg-theme1 text-white">
          <DialogHeader>
            <DialogTitle>Contact Us</DialogTitle>
            <DialogDescription>
              We would love to hear from you! Please fill out the form below and
              we will get in touch with you shortly.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="First name"
                ref={nameRef}
                className="placeholder:text-white/70"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                ref={emailRef}
                className="placeholder:text-white/70"
              />
            </div>
          </div>
          <Label htmlFor="Message">Message</Label>
          <Textarea
            placeholder="enter your message here"
            className="bg-transparent placeholder:text-white/70"
            id="Message"
            ref={messageRef}
          />
          <DialogFooter>
            <Button onClick={onSubmit} type="submit">
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.send className="mr-2 h-4 w-4" />
              )}
              Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactForm;
