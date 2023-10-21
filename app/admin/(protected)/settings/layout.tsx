import {Metadata} from "next";
import Image from "next/image";

import {Separator} from "@/app/admin/components/ui/separator";
import {SidebarNav} from "@/app/admin/(protected)/settings/components/sidebar-nav";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Account",
    href: "/admin/settings",
  },
  {
    title: "Notifications",
    href: "/admin/settings/notifications",
  },
  {
    title: "Appearance",
    href: "/admin/settings/appearance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({children}: SettingsLayoutProps) {
  return (
    <>
      <div className="md:hidden flex-grow min-h-screen">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block min-h-screen">
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
