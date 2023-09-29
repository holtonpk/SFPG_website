"use client";
import { Icons } from "@/app/admin/components/icons";
import React, { use, useCallback, useEffect } from "react";
import { Button } from "@/app/admin/components/ui/button";
import { createRoot } from "react-dom/client";

import { Textarea } from "@/app/admin/components/ui/textarea";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/admin/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/admin/components/ui/dropdown-menu";
import { siteConfig } from "@/config/site";
import { timeSince } from "@/app/admin/lib/utils";
import { generateRandomId } from "@/app/admin/lib/utils";

import {
  Location,
  Note,
  UpdateRequest,
  ScreenSize,
  Author,
  DisplayPage,
} from "@/app/admin/types";
import { useAuth } from "@/app/admin/context/user-auth";
import { auth } from "@/config/firebase";
import { useAdminStorage } from "@/app/admin/context/storage";

const Iframe = ({
  displayPage,
  screenSize,
  selectedLocation,
  setSelectedLocation,
  createRequest,
  setCreateRequest,
  updateRequests,
  notes,
  setNotes,
  showLive,
  setShowLive,
}: {
  displayPage: DisplayPage;
  screenSize: ScreenSize;
  selectedLocation: Location[];
  setSelectedLocation: (location: Location[]) => void;
  createRequest: boolean;
  setCreateRequest: (createRequest: boolean) => void;
  updateRequests: UpdateRequest[];
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  showLive: boolean;
  setShowLive: (showLive: boolean) => void;
}) => {
  // refs  ==================================>
  // const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const [iframeElement, setIframeElement] = React.useState<HTMLIFrameElement>();
  const [liveSiteElement, setLiveSiteElement] =
    React.useState<HTMLIFrameElement>();

  const iframeRef = useCallback((node: HTMLIFrameElement | null) => {
    if (node)
      if (node !== null) {
        node.addEventListener("load", () => {
          setIframeElement(node);
        });
      }
  }, []);

  const liveSiteRef = useCallback((node: HTMLIFrameElement | null) => {
    if (node)
      if (node !== null) {
        node.addEventListener("load", () => {
          setLiveSiteElement(node);
        });
      }
  }, []);

  const [cursorPosition, setCursorPosition] = React.useState({ x: 0, y: 0 });

  const iframeMouseMoveListener = React.useRef<
    ((event: MouseEvent) => void) | null
  >(null);

  const selectedLocationRef = React.useRef<Location[]>();
  let previouslyHoveredElement = React.useRef<HTMLElement | null>(null);
  const createRequestRef = React.useRef<boolean>(false);
  const hoverNoteRef = React.useRef<HTMLDivElement | null>(null);

  // states  ==================================>
  const [scale, setScale] = React.useState<number | undefined>(undefined);
  // const [iframeLoaded, setIframeLoaded] = React.useState<string | null>(
  //   displayPage
  // );
  const [showMenu, setShowMenu] = React.useState(false);

  const [clickCoordinates, setClickCoordinates] = React.useState<{
    x: number;
    y: number;
    scrollHeight: number;
  } | null>(null);

  const { DeleteNote, CreateNote } = useAdminStorage()!;
  const { author } = useAuth()!;

  // sync selectedLocationRef.current with selectedLocation ==================================>
  useEffect(() => {
    selectedLocationRef.current = selectedLocation;
  }, [selectedLocation]);

  // sync createRequestRef.current with EditState ==================================>
  useEffect(() => {
    createRequestRef.current = createRequest;
  }, [createRequest]);

  useEffect(() => {
    setIframeElement(undefined);
  }, [displayPage]);

  // add event listener for mouse move on iframe ==================================>
  useEffect(() => {
    if (!iframeElement) return;
    if (!iframeElement.contentWindow) return;
    // Remove the previous event listener
    if (iframeMouseMoveListener.current) {
      iframeElement.contentWindow.removeEventListener(
        "mousemove",
        iframeMouseMoveListener.current
      );
    }

    // Function to add edit menu to the selectedLocation ==================================>
    const EditClick = (event: MouseEvent) => {
      if (createRequestRef.current) return;
      // Get the iframe container element
      const iframeContainer = document.getElementById("iframeContainer");
      if (iframeContainer) {
        const xRelativeToContainer = event.clientX;
        const yRelativeToContainer = event.clientY;

        // Ensure iframeRef.current is not null
        if (iframeElement) {
          const iframeContentWindow = iframeElement.contentWindow;

          // Ensure iframeContentWindow is not null
          if (iframeContentWindow) {
            const targetElement = iframeContentWindow.document.elementFromPoint(
              event.clientX,
              event.clientY
            ) as HTMLElement;
            if (!hasClassInParents(targetElement, "adminNote")) {
              setClickCoordinates({
                x: xRelativeToContainer,
                y: yRelativeToContainer,
                scrollHeight: iframeContentWindow.scrollY,
              });
              setShowMenu(true);
            }
          }
        }
      }
    };

    // Function to add an item to the selectedLocation ==================================>
    const LocateClick = (event: MouseEvent) => {
      // Get the iframe container element
      if (!createRequestRef.current) return;
      const iframeContainer = document.getElementById("iframeContainer");
      if (iframeContainer) {
        // Ensure iframeRef.current is not null
        if (iframeElement) {
          const iframeContentWindow = iframeElement.contentWindow;

          // Ensure iframeContentWindow is not null
          if (iframeContentWindow) {
            const targetElement = iframeContentWindow.document.elementFromPoint(
              event.clientX,
              event.clientY
            ) as HTMLElement;

            console.log("targetElement", targetElement);
            if (!hasClassInParents(targetElement, "adminNote")) {
              const location = {
                element: targetElement.tagName,
                text:
                  targetElement.innerText || targetElement.textContent || "",
                viewPort: screenSize.title,
                location: {
                  id: targetElement.id,
                },
              };
              if (location.element === "IMG") {
                targetElement.parentElement?.classList.add("selected-element");
              } else {
                targetElement.classList.add("selected-element");
              }

              // Check if the location already exists in the selectedLocationRef.current array
              const existingLocations = selectedLocationRef.current || [];
              const isLocationExists = existingLocations.some(
                (existingLocation) => {
                  return (
                    existingLocation.element === location.element &&
                    existingLocation.text === location.text &&
                    existingLocation.viewPort === location.viewPort &&
                    existingLocation.location.id === location.location.id
                  );
                }
              );

              if (!isLocationExists) {
                const newLocation = Array.isArray(selectedLocationRef.current)
                  ? [...selectedLocationRef.current, location]
                  : [location];
                setSelectedLocation(newLocation);
                selectedLocationRef.current = newLocation;
              }
            }
            iframeContentWindow.removeEventListener("click", LocateClick);
          }
        }
      }
    };
    // Function to handle mouse over ==================================>

    const handleIframeMouseMove = (event: MouseEvent) => {
      if (showLive) {
        return;
      }
      const iframeContentWindow = iframeElement?.contentWindow;
      if (iframeContentWindow) {
        const targetElement = iframeContentWindow.document.elementFromPoint(
          event.clientX,
          event.clientY
        ) as HTMLElement;

        if (!hasClassInParents(targetElement, "adminNote")) {
          if (targetElement) {
            if (previouslyHoveredElement.current) {
              if (
                previouslyHoveredElement.current.tagName === "IMG" ||
                previouslyHoveredElement.current.tagName === "INPUT"
              ) {
                const parent = previouslyHoveredElement.current.parentElement;
                if (parent) {
                  parent.classList.remove("hover-section");
                  parent.classList.remove("hover-locate");
                }
              } else {
                previouslyHoveredElement.current.classList.remove(
                  "hover-section"
                );
                previouslyHoveredElement.current.classList.remove(
                  "hover-locate"
                );
              }
              iframeContentWindow.removeEventListener("click", EditClick);
              iframeContentWindow.removeEventListener("click", LocateClick);
            }
            if (!createRequestRef.current) {
              if (
                targetElement.tagName === "IMG" ||
                targetElement.tagName === "INPUT"
              ) {
                const parent = targetElement.parentElement;
                if (parent?.classList.contains("selected-element")) return;
                parent?.classList.add("hover-section");
                parent?.setAttribute(
                  "name",
                  targetElement.tagName + " | " + targetElement.id
                );
              } else {
                // if (targetElement.classList.contains("absolute")) return;
                targetElement.classList.add("hover-section");
                targetElement.setAttribute(
                  "name",
                  "<" + targetElement.tagName + "> | " + targetElement.id
                );
              }
              iframeContentWindow.addEventListener("click", EditClick);

              // console.log("EditClickAdded");
            } else if (createRequestRef.current) {
              if (
                targetElement.tagName === "IMG" ||
                targetElement.tagName === "input"
              ) {
                const parent = targetElement.parentElement;
                if (parent?.classList.contains("hover-locate")) return;
                parent?.classList.add("hover-locate");
              } else {
                // if (targetElement.classList.contains("absolute")) return;
                targetElement.classList.add("hover-locate");
              }

              iframeContentWindow.addEventListener("click", LocateClick);

              // console.log("LocateClickAdded");
            }
            previouslyHoveredElement.current = targetElement;
          }
        }
      }
    };

    // Add a new event listener
    const newListener = (event: MouseEvent) => {
      handleIframeMouseMove(event);
    };

    iframeElement.contentWindow.addEventListener("mousemove", newListener);

    // Store the new event listener reference
    iframeMouseMoveListener.current = newListener;

    return () => {
      if (!iframeElement) return;
      if (!iframeElement.contentWindow) return;
      // Clean up the event listener when the component unmounts or when displayPage changes

      if (iframeMouseMoveListener.current) {
        iframeElement.contentWindow.removeEventListener(
          "mousemove",
          iframeMouseMoveListener.current
        );
      }
    };
  }, [iframeElement, scale, showLive, screenSize.title, setSelectedLocation]);

  const MapRequest = useCallback(() => {
    const contentWindow = iframeElement?.contentWindow?.document;
    if (!contentWindow) return;
    updateRequests.forEach((request) => {
      const locations = request.locations;
      locations.forEach((loc) => {
        const targetElement = contentWindow.getElementById(loc.location.id);
        if (!targetElement) return;
        if (loc.element === "IMG") {
          const parent = targetElement.parentElement;
          if (parent?.classList.contains("update-request")) return;
          parent?.classList.add("update-request");
          parent?.setAttribute("update-title", request.title);
        } else {
          targetElement.classList.add("update-request");
          targetElement.setAttribute("update-title", request.title);
        }
      });
    });
  }, [iframeElement, updateRequests]);

  const MapNotes = useCallback(() => {
    const contentWindow = iframeElement?.contentWindow?.document;
    if (!contentWindow) return;
    const iframeContentWindow = iframeElement?.contentWindow;
    if (!iframeContentWindow) return;
    notes.forEach((note) => {
      console.log("note", note.location.viewPort, screenSize.title);
      if (
        note.location.viewPort !== screenSize.title ||
        note.location.page !== displayPage.url
      )
        return;
      const container = iframeContentWindow.document.createElement("div");
      // const body = iframeContentWindow.document.body;
      const client = iframeContentWindow.document.getElementById("client");
      if (!client) return;
      if (client.firstChild) {
        client.insertBefore(container, client.firstChild);
      } else {
        client.appendChild(container);
      }
      container.classList.add("adminNote");
      container.style.top = `${note.location.top}px`;
      container.style.left = `${note.location.left}px`;
      container.style.cursor = "none";
      container.style.position = "absolute";
      container.style.zIndex = "9999";
      const root = createRoot(container);
      root.render(
        <Note
          key={Math.random()}
          complete={false}
          Author={note.author}
          color={note.color}
          date={note.date}
          text={note.text}
          id={note.id}
          DeleteNote={DeleteNote}
          CreateNote={CreateNote}
        />
      );
    });
  }, [iframeElement, screenSize, displayPage, notes, DeleteNote, CreateNote]);

  // run when iframeElement loads
  useEffect(() => {
    MapRequest();
    MapNotes();
    if (!iframeElement) return;
    if (!iframeElement.contentWindow) return;

    var iframeDoc = iframeElement.contentWindow.document;
    iframeDoc.body.style.cursor = "none";
    iframeDoc.querySelectorAll("*").forEach((element) => {
      if (element instanceof HTMLElement) {
        element.style.cursor = "none";
      }
    });
  }, [iframeElement, MapRequest, MapNotes]);

  useEffect(() => {
    const iframeContentWindow = iframeElement?.contentWindow;
    if (!iframeContentWindow) return;
    iframeContentWindow?.document
      .querySelectorAll(".adminNote")
      .forEach((el) => {
        console.log("el", el);
        el.remove();
      });
    MapNotes();
  }, [displayPage, screenSize, MapNotes, iframeElement]);

  useEffect(() => {
    const iframeContentWindow = iframeElement?.contentWindow;
    if (!iframeContentWindow) return;
    iframeContentWindow?.document
      .querySelectorAll(".update-request")
      .forEach((el) => {
        el.classList.remove("update-request");
      });
    MapRequest();
  }, [updateRequests, MapRequest, iframeElement]);

  useEffect(() => {
    if (showLive) return;
    if (!iframeElement) return;
    const iframeContentWindow = iframeElement.contentWindow;
    if (!iframeContentWindow) return;
    iframeContentWindow.document
      .querySelectorAll(".selected-element")
      .forEach((el) => {
        el.classList.remove("selected-element");
      });
    selectedLocation.forEach((loc) => {
      const targetElement = iframeContentWindow.document.getElementById(
        loc.location.id
      );
      if (!targetElement) return;
      if (loc.element === "IMG") {
        const parent = targetElement.parentElement;
        if (parent?.classList.contains("selected-element")) return;
        parent?.classList.add("selected-element");
      } else {
        if (targetElement.classList.contains("selected-element")) return;
        targetElement.classList.add("selected-element");
      }
    });
  }, [selectedLocation, iframeElement, showLive]);

  // add a note to the selected location  ==================================>
  const addNote = () => {
    if (!iframeElement) return;
    const iframeContentWindow = iframeElement.contentWindow;
    if (iframeContentWindow && clickCoordinates) {
      // Create a container element for your prebuilt component
      const container = iframeContentWindow.document.createElement("div");
      // const body = iframeContentWindow.document.body;
      const client = iframeContentWindow.document.getElementById("client");
      if (!client) return;
      if (client.firstChild) {
        client.insertBefore(container, client.firstChild);
      } else {
        client.appendChild(container);
      }
      container.classList.add("adminNote");
      container.style.top = `${
        clickCoordinates?.y + clickCoordinates?.scrollHeight || 0
      }px`;
      container.style.left = `${clickCoordinates.x}px`;
      container.style.cursor = "none";
      container.style.position = "absolute";
      const root = createRoot(container);

      console.log("clickCoordinates", clickCoordinates);

      root.render(
        <Note
          complete={true}
          key={Math.random()}
          top={clickCoordinates?.y + clickCoordinates?.scrollHeight}
          left={clickCoordinates.x}
          screenSize={screenSize}
          displayPage={displayPage}
          DeleteNote={DeleteNote}
          CreateNote={CreateNote}
          Author={author}
        />
      );
    }
  };

  // set scale for iframe ==================================>
  useEffect(() => {
    const container = document.getElementById("iframeContainer");
    if (!container) return;
    const Scale =
      container.getBoundingClientRect().width /
      (screenSize.title === "mobile"
        ? screenSize.width * 2.4
        : screenSize.title === "laptop"
        ? screenSize.width * 1
        : screenSize.width);

    setScale(Scale);
  }, [screenSize]);

  // add and remove event listeners for hover Note ==================================>
  useEffect(() => {
    if (!iframeElement) return;
    if (!iframeElement.contentWindow) return;

    const removeHoveredOutline = () => {
      previouslyHoveredElement.current?.classList.remove("hover-section");
    };

    iframeElement.contentWindow.addEventListener(
      "mouseout",
      removeHoveredOutline
    );
    return () => {
      if (!iframeElement) return;
      if (!iframeElement.contentWindow) return;

      iframeElement.contentWindow.removeEventListener(
        "mouseout",
        removeHoveredOutline
      );
    };
  }, [iframeElement]);

  useEffect(() => {
    if (!iframeElement) return;
    if (!iframeElement.contentWindow) return;
    const moveCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    iframeElement.contentWindow.addEventListener("mousemove", moveCursor);
    return () => {
      if (!iframeElement) return;
      if (!iframeElement.contentWindow) return;

      iframeElement.contentWindow.removeEventListener("mousemove", moveCursor);
    };
  }, [iframeElement]);

  useEffect(() => {
    const hideCursor = () => {
      document.getElementById("cursor")?.classList.add("hidden");
    };
    const showCursor = () => {
      document.getElementById("cursor")?.classList.remove("hidden");
    };

    if (!iframeElement) return;
    if (!iframeElement.contentWindow) return;
    iframeElement.contentWindow.addEventListener("mouseout", hideCursor);
    iframeElement.contentWindow.addEventListener("mouseover", showCursor);

    return () => {
      if (!iframeElement) return;
      if (!iframeElement.contentWindow) return;

      iframeElement.contentWindow.removeEventListener("mouseout", hideCursor);
      iframeElement.contentWindow.removeEventListener("mouseover", showCursor);
    };
  }, [iframeElement]);

  const requestEditClick = () => {
    if (!iframeElement) return;
    const iframeContentWindow = iframeElement.contentWindow;
    if (!iframeContentWindow) return;
    const targetElement = iframeContentWindow.document.elementFromPoint(
      clickCoordinates?.x || 0,
      clickCoordinates?.y || 0
    ) as HTMLElement;
    setSelectedLocation([
      {
        viewPort: screenSize.title,
        element: targetElement.tagName,
        text: targetElement.textContent || "",
        location: {
          id: targetElement.id,
        },
      },
    ]);
    setCreateRequest(true);
  };

  return (
    <>
      {!scale ? (
        <div className="w-full h-[563.695px]  flex justify-center items-center rounded-xl  ">
          <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
        </div>
      ) : (
        <div
          // ref={iframeWrapper}
          id="iframeWrapper"
          className="h-fit relative max-w-full overflow-hidden rounded-xl mx-auto  "
          style={{
            height: screenSize.height * scale,
            width: screenSize.width * scale,
          }}
        >
          {showLive && !liveSiteElement && (
            <div className="w-full h-full absolute z-[40]  flex justify-center items-center rounded-xl  bg-background">
              <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          {!showLive && !iframeElement && (
            <div className="w-full h-full absolute z-[40]  flex justify-center items-center rounded-xl bg-background">
              <Icons.spinner className="h-10 w-10 animate-spin text-primary" />
            </div>
          )}
          <div
            id="iframeContainer"
            className="absolute  items-center justify-center flex rounded-xl h-fit w-fit overflow-hidden "
            style={{
              top: -((screenSize.height - screenSize.height * scale) / 2),
              left: -((screenSize.width - screenSize.width * scale) / 2),
              scale: scale,
            }}
          >
            <DropdownMenu open={showMenu} onOpenChange={setShowMenu}>
              <DropdownMenuTrigger
                className="z-[20] absolute "
                style={{
                  top: `${clickCoordinates?.y || 0}px`,
                  left: `${clickCoordinates?.x || 0}px`,
                }}
              ></DropdownMenuTrigger>
              <DropdownMenuContent side={"top"}>
                <DropdownMenuItem onClick={requestEditClick}>
                  Request Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={addNote}>Add Note</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {showLive && (
              <>
                <iframe
                  id="live-site"
                  src={siteConfig.url + displayPage.url}
                  ref={liveSiteRef}
                  className=" relative rounded-md   z-10 "
                  height={screenSize.height}
                  width={screenSize.width}
                ></iframe>
              </>
            )}
            {!showLive && (
              <>
                <iframe
                  src={siteConfig.url + displayPage.url}
                  ref={iframeRef}
                  className=" relative rounded-md   z-10   "
                  height={screenSize.height}
                  width={screenSize.width}
                ></iframe>
                <div
                  id="cursor"
                  className="absolute z-[40] -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden"
                  style={{ left: cursorPosition.x, top: cursorPosition.y }}
                >
                  {createRequestRef.current ? (
                    <Icons.plusCircle className="h-8 w-8 text-white fill-black" />
                  ) : (
                    <Icons.cursor className="h-8 w-8 text-white fill-black" />
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Iframe;

const Note = ({
  complete,
  text,
  Author,
  date,
  color,
  id,
  displayPage,
  screenSize,
  top,
  left,
  DeleteNote,
  CreateNote,
}: {
  complete: boolean;
  text?: string;
  Author: Author;
  date?: number;
  color?: string;
  id?: string;
  displayPage?: DisplayPage;
  screenSize?: ScreenSize;
  top?: number;
  left?: number;
  CreateNote: (note: Note) => void;
  DeleteNote: (id: string) => void;
}) => {
  const [showNote, setShowNote] = React.useState(complete);
  const NoteRef = React.useRef<HTMLDivElement | null>(null);
  const [Note, setNote] = React.useState<string | null>(text || null);
  const [noteId, setNoteId] = React.useState<string>(id || generateRandomId());
  const [editNote, setEditNote] = React.useState(complete);
  const NoteInput = React.useRef<HTMLTextAreaElement | null>(null);
  const [showOptions, setShowOptions] = React.useState(false);

  async function deleteNote() {
    setTimeout(() => {
      setShowOptions(false);
    }, 200);
    setTimeout(() => {
      setShowNote(false);
    }, 400);
    setTimeout(() => {
      const parentElem = NoteRef.current?.parentElement;
      if (parentElem) {
        parentElem.innerHTML = "";
        parentElem.remove();
      }
    }, 600);
    DeleteNote(noteId);
  }

  const saveNote = () => {
    //  save to db
    if (!NoteInput.current) return;
    setNote(NoteInput.current?.value);
    CreateNote({
      id: noteId,
      text: NoteInput.current?.value,
      author: Author,
      date: new Date().getTime(),
      color: selectedColor,
      location: {
        page: displayPage?.url || "none",
        viewPort: screenSize?.title || "none",
        top: top || 0,
        left: left || 0,
      },
    });
    setShowNote(false);
    setEditNote(false);
  };

  const colorOptions = [
    "#f43f5e",
    "#d946ef",
    "#8b5cf6",
    "#3b82f6",
    "#22c55e",
    "#f59e0b",
  ];

  const [selectedColor, setSelectedColor] = React.useState(
    color || colorOptions[0]
  );

  return (
    <div ref={NoteRef} className="cursor-none">
      <DropdownMenu open={showNote} onOpenChange={setShowNote}>
        <DropdownMenuTrigger className="cursor-none ">
          <div
            className="text-white h-fit w-fit p-4 gap-4 flex justify-center items-center rounded-full  group shadow-xl hover:z-[999999] cursor-none"
            style={{ background: selectedColor, cursor: "none" }}
          >
            <Icons.messageCircle className="h-8 w-8 " />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side={"top"}
          className={`h-fit  w-[350px] py-2 relative group  ${
            editNote ? "px-2" : "px-6"
          }`}
        >
          {editNote ? (
            <div className="relative">
              <div className="relative">
                <div className="flex gap-1 absolute bottom-0 p-2 w-fit">
                  {colorOptions.map((color, i) => (
                    <span
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      className={`h-5 w-5 rounded-full cursor-pointer hover:opacity-80 ${
                        selectedColor === color && "border-2 border-foreground "
                      }`}
                      style={{ background: color }}
                    ></span>
                  ))}
                </div>
                <Textarea
                  placeholder="write your note here..."
                  ref={NoteInput}
                  className="w-full pb-6 h-[125px]"
                  autoFocus
                />
              </div>
              <div className="w-full justify-between flex pt-2 pb-0">
                <Button onClick={deleteNote} variant={"ghost"}>
                  Cancel
                </Button>
                <Button size="sm" onClick={saveNote}>
                  Add Note
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex gap-2 items-center ">
                <Avatar className="h-8 w-8">
                  <AvatarImage alt="Avatar" src={Author?.avatar} />
                  <AvatarFallback>
                    {Author?.firstName[0] + Author?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-sm">
                  {Author.firstName + " " + Author.lastName}
                </h1>
                <h1 className="text-muted-foreground text-[12px]">
                  {Author
                    ? timeSince(date as number)
                    : timeSince(new Date().getTime())}
                </h1>
                <DropdownMenu open={showOptions} onOpenChange={setShowOptions}>
                  <DropdownMenuTrigger className="ml-auto">
                    <Icons.more className="h-4 w-4 " />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={deleteNote}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="w-full h-fit p-2 pl-10">{Note}</div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const hasClassInParents = (
  element: HTMLElement | null,
  className: string
): boolean => {
  if (!element) return false;
  if (element.classList.contains(className)) {
    return true; // The current element has the class
  }
  return hasClassInParents(element.parentElement, className); // Recursively check parent elements
};

const findParentWithClass = (
  element: HTMLElement | null,
  className: string
): HTMLElement | null => {
  if (!element) return null;
  if (element.classList.contains(className)) {
    return element; // Found the parent element with the class
  }
  return findParentWithClass(element.parentElement, className); // Recursively check parent elements
};
