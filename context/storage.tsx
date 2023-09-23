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

interface StorageContextType {
  CreateNewMessage: (
    name: string,
    email: string,
    subject: string,
    message: string
  ) => void;
}

const StorageContext = createContext<StorageContextType | null>(null);

export const emailRef = React.createRef();

export function useStorage() {
  return useContext(StorageContext);
}

export const db = getFirestore(app);

export function StorageProvider({ children }: { children: React.ReactNode }) {
  const CreateNewMessage = async (
    name: string,
    email: string,
    subject: string,
    message: string
  ) => {
    const d = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
    console.log("Document written with ID: ", d);
  };

  const value = { CreateNewMessage };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
