"use client";
import React from "react";
import TeamSwitcher from "@/app/admin/components/team-switcher";
import { MainNav } from "@/app/admin/components/main-nav";
import { UserNav } from "@/app/admin/components/user-nav";
import MobileNav from "@/app/admin/components/mobile-nav";

const AdminNav = () => {
  return (
    <div className="border-b border-border ">
      <div className="h-16 items-center px-4 md:flex hidden ">
        <TeamSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <div className="h-16 items-center px-4 md:hidden flex w-full justify-between ">
        <div className=" flex items-center space-x-4">
          <UserNav />
        </div>
        <h1>Admin Portal</h1>
        <MobileNav />
      </div>
    </div>
  );
};

export default AdminNav;
