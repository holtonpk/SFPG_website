import { marketingConfig } from "@/config/marketing";
import { LinkButton } from "@/components/ui/link";
import Nav from "@/components/nav/main-nav";
import { SiteFooter } from "@/components/site-footer";
import MobileNav from "@/components/nav/mobile-nav";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-theme1/10 ">
      <Nav />
      <MobileNav />
      <main className="flex-1 z-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
