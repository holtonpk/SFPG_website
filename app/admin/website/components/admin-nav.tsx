"use client";
import React from "react";
import TeamSwitcher from "@/app/admin/components/team-switcher";
import { MainNav } from "@/app/admin/components/main-nav";
import { UserNav } from "@/app/admin/components/user-nav";

const AdminNav = () => {
  return (
    <div className="border-b border-border">
      <div className="flex h-16 items-center px-4">
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  );
};

export default AdminNav;
