"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { app } from "@/config/firebase";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { UpdateRequest, Note } from "@/app/admin/types";
import { tr } from "date-fns/locale";

type ResponseStatus = "success" | "error";

interface StorageContextType {
  CreateUpdateRequest: (
    updateRequest: UpdateRequest
  ) => Promise<ResponseStatus>;
  FetchUpdateRequests: () => Promise<UpdateRequest[]>;
  DeleteUpdateRequest: (id: string) => Promise<ResponseStatus>;
  CreateNote: (note: Note) => void;
  FetchNotes: () => Promise<Note[]>;
  DeleteNote: (id: string) => void;
  changeUpdateRequestStatus: (
    id: string,
    status: "pending" | "in progress" | "completed" | "rejected"
  ) => void;
}

const StorageContext = createContext<StorageContextType | null>(null);

export function useAdminStorage() {
  return useContext(StorageContext);
}

export const db = getFirestore(app);

export function AdminStorageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Update Requests actions

  const CreateUpdateRequest = async (
    updateRequest: UpdateRequest
  ): Promise<ResponseStatus> => {
    try {
      await setDoc(
        doc(db, `admin/updateRequests/active/${updateRequest.id}`),
        updateRequest
      );
      return "success";
    } catch (err) {
      return "error";
    }
  };

  const FetchUpdateRequests = async (): Promise<UpdateRequest[]> => {
    const updateRequests = await getDocs(
      collection(db, "admin/updateRequests/active")
    );
    const allUpdateRequests = updateRequests.docs.map((doc) => doc.data());

    return allUpdateRequests as UpdateRequest[];
  };

  const DeleteUpdateRequest = async (id: string): Promise<ResponseStatus> => {
    try {
      await deleteDoc(doc(db, "admin/updateRequests/active", id));
      return "success";
    } catch {
      return "error";
    }
  };

  const changeUpdateRequestStatus = async (
    id: string,
    status: "pending" | "in progress" | "completed" | "rejected"
  ) => {
    const updateRequestRef = doc(db, "admin/updateRequests/active", id);
    await updateDoc(updateRequestRef, {
      status: status,
    });
  };

  //  Note actions

  const CreateNote = async (note: Note) => {
    const response = await setDoc(
      doc(db, `admin/notes/active/${note.id}`),
      note
    );
    return response;
  };

  const FetchNotes = async (): Promise<Note[]> => {
    const notes = await getDocs(collection(db, "admin/notes/active"));

    const allNotes = notes.docs.map((doc) => doc.data());

    return allNotes as Note[];
  };

  const DeleteNote = async (id: string) => {
    const response = await deleteDoc(doc(db, "admin/notes/active", id));

    return response;
  };

  const value = {
    CreateUpdateRequest,
    FetchUpdateRequests,
    DeleteUpdateRequest,
    CreateNote,
    FetchNotes,
    DeleteNote,
    changeUpdateRequestStatus,
  };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
