import { marketingConfig } from "@/config/marketing";
import { LinkButton } from "@/app/(client)/components/ui/link";
import Nav from "@/app/(client)/components/nav/main-nav";
import { SiteFooter } from "@/app/(client)/components/site-footer";
import MobileNav from "@/app/(client)/components/nav/mobile-nav";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background ">
      <Nav />
      <MobileNav />
      <main className="flex-1 z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
