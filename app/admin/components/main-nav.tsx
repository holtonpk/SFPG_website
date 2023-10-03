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
        href="/admin/website"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "website" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Website
      </Link>
      <Link
        href="/admin/store"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "store" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Store
      </Link>
      <Link
        href="/admin/analytics"
        className={`text-sm font-medium transition-colors hover:text-primary ${
          segment === "analytics" ? "text-default" : "text-muted-foreground"
        }`}
      >
        Analytics
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
