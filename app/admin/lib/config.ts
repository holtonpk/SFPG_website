import { Location, Note, UpdateRequest, ScreenSize } from "@/app/admin/types";

export const screenSizes = [
  { title: "mobile", height: 640, width: 360 },
  {
    title: "laptop",
    height: 768,
    width: 1024,
  },
  {
    title: "desktop",
    height: 1080,
    width: 1920,
  },
];

export const Note1: Note = {
  author: {
    name: "Patrick Holton",
    initials: "PH",
    avatar: "/avatars/02.png",
  },
  text: "This is a note",
  color: "#3b82f6",
  date: "2 days ago",
  location: {
    viewPort: "laptop",
    top: 200,
    left: 800,
    page: "/",
  },
};

export const Request1: UpdateRequest = {
  title: "Update the title",
  status: "pending",
  priority: "routine",
  type: "edit",
  locationDescription: "top of the page",
  locations: [
    {
      viewPort: "laptop",
      element: "P",
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
};
