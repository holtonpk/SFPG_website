"use client";
import React, { ReactElement, ReactNode } from "react";
import { useAuth } from "@/app/admin/context/user-auth";
import { useRouter } from "next/navigation";

const UserSignedIn = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth()!;
  const router = useRouter();

  if (currentUser) {
    router.push("/admin/website");
  }

  return children;
};

export default UserSignedIn;
