import React from "react";
import "./style.css";
import { ThemeProvider } from "@/app/admin/components/theme-provider";
import AdminNav from "./website/components/admin-nav";
import { Toaster } from "@/app/admin/components/ui/toaster";
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster />
      <div
        id="admin"
        className="bg-background min-h-screen flex  justify-center  pb-4 flex-col"
      >
        <AdminNav />
        {children}
      </div>
    </ThemeProvider>
  );
}
