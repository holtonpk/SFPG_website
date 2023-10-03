import React from "react";
import "@/app/admin/style.css";
import { ThemeProvider } from "@/app/admin/components/theme-provider";
import AdminNav from "@/app/admin/components/admin-nav";
import { Toaster } from "@/app/admin/components/ui/toaster";
import { AdminStorageProvider } from "@/app/admin/context/storage";
import ProtectedRoutes from "@/app/admin/(protected)/protect-routes";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoutes>
      <AdminStorageProvider>
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
      </AdminStorageProvider>
    </ProtectedRoutes>
  );
}
