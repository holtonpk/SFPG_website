import Link from "next/link";

import { cn } from "@/lib/utils";
import { useParams, useSelectedLayoutSegment } from "next/navigation";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const segment = useSelectedLayoutSegment();

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "dashboard" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/admin/website"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "website" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Website
      </Link>
      {/* <Link
        href="/admin/analytics"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "analytics" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Analytics
      </Link> */}
      <Link
        href="/admin/site-data"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "site-data" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Site Data
      </Link>
      <Link
        href="/admin/settings"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "settings" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Settings
      </Link>
    </nav>
  );
}
