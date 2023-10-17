"use client";
import React, { useContext, useState, useEffect, createContext } from "react";
import { app } from "@/config/firebase";

import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  getDocs,
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
  SaveReview: (
    name: string,
    productId: string,
    email: string,
    rating: number,
    date: number,
    title: string,
    body: string
  ) => void;
  FetchReviews: () => Promise<
    {
      name: string;
      email: string;
      productId: string;
      rating: number;
      date: number;
      title: string;
      body: string;
    }[]
  >;
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

  const SaveReview = async (
    name: string,
    productId: string,
    email: string,
    rating: number,
    date: number,
    title: string,
    body: string
  ) => {
    const d = await addDoc(collection(db, "reviews"), {
      name: name,
      email: email,
      productId: productId,
      rating: rating,
      date: date,
      title: title,
      body: body,
      live: false,
    });
    console.log("Document written with ID: ", d);
  };

  const FetchReviews = async () => {
    const reviews: {
      name: string;
      email: string;
      productId: string;
      rating: number;
      date: number;
      title: string;
      body: string;
    }[] = [];
    const querySnapshot = await getDocs(collection(db, "reviews"));
    querySnapshot.forEach((doc) => {
      reviews.push(doc.data() as any);
    });
    return reviews;
  };

  const value = { CreateNewMessage, SaveReview, FetchReviews };

  return (
    <StorageContext.Provider value={value}>{children}</StorageContext.Provider>
  );
}
