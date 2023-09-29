import React from "react";
import "./style.css";
import { ThemeProvider } from "@/app/admin/components/theme-provider";
import AdminNav from "./components/admin-nav";
import { Toaster } from "@/app/admin/components/ui/toaster";
import { AdminStorageProvider } from "@/app/admin/context/storage";
import { AuthProvider } from "@/app/admin/context/user-auth";
import UserSignedIn from "@/app/admin/components/user-signed-in";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <UserSignedIn>{children}</UserSignedIn>
    </AuthProvider>
  );
}
