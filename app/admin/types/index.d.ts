import { User as FirebaseUser } from "firebase/auth";

export interface UserData extends FirebaseUser {
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface Author {
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}

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

export type UpdateRequest = {
  id: string;
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
  id: string;
  author: Author;
  text: string;
  color: string;
  date: number;
  location: NoteLocation;
};

export type DisplayPage = {
  id: string;
  url: string;
};
