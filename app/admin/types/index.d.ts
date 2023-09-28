export type ScreenSize = {
  title: string;
  height: number;
  width: number;
};

export type Location = {
  viewPort: string;
  element: string;
  text: string;
  location: {
    id: string;
  };
};

export type Author = {
  name: string;
  avatar: string;
  initials: string;
};

export type UpdateRequest = {
  title: string;
  status: "pending" | "in progress" | "completed" | "rejected";
  priority: "routine" | "important" | "critical" | any;
  type: "add" | "edit" | "remove" | "fix" | "move" | "other" | any;
  locationDescription?: string;
  locations: Location[];
  description: string;
  author: Author;
  date: number;
};

export type NoteLocation = {
  viewPort: string;
  top: number;
  left: number;
  page: string;
};

export type Note = {
  author: Author;
  text: string;
  color: string;
  date: string;
  location: NoteLocation;
};

export type DisplayPage = {
  id: string;
  url: string;
};
