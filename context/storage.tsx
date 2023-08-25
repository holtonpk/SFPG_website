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
  CreateNewMessage: (name: string, email: string, message: string) => void;
  SignUpForEmailList: (email: string, product: number) => void;
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
    message: string
  ) => {
    const d = await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
    });
    console.log("Document written with ID: ", d);
  };

  const SignUpForEmailList = async (email: string, product: number) => {
    const d = await setDoc(doc(db, `emails/${product}/emails`, email), {
      email: email,
    });
    // const d = await addDoc(collection(db, "emails"), {
    //   email: email,
    // });
  };

  const value = { CreateNewMessage, SignUpForEmailList };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
