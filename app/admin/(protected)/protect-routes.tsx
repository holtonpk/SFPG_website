"use client";

import React, { ReactElement } from "react";
import { useAuth } from "@/app/admin/context/user-auth";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/app/admin/components/ui/link-button";
const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth()!;
  const router = useRouter();

  if (currentUser) {
    return children;
  } else {
    router.push("/admin/login");
  }
  return null;
};

export default ProtectedRoutes;
