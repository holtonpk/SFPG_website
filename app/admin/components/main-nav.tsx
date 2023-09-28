import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin/website"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Website
      </Link>
      <Link
        href="/admin/store"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Store
      </Link>
      <Link
        href="/admin/analytics"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Analytics
      </Link>
      <Link
        href="/admin/settings"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  );
}
