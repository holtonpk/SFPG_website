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
} from "firebase/firestore";
import { UpdateRequest } from "@/app/admin/types";

interface StorageContextType {
  CreateUpdateRequest: (updateRequest: UpdateRequest) => void;
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
  const CreateUpdateRequest = async (updateRequest: UpdateRequest) => {
    console.log("updateRequest", updateRequest);
    const response = await addDoc(
      collection(db, "admin/updateRequests/active"),
      updateRequest
    );
    console.log("respinse", response);
  };

  const value = { CreateUpdateRequest };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
