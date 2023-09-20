import { marketingConfig } from "@/config/marketing";
import { LinkButton } from "@/components/ui/link";
import Nav from "@/components/nav/main-nav";
import { SiteFooter } from "@/components/site-footer";
import MobileNav from "@/components/nav/mobile-nav";
import { siteConfig } from "@/config/site";
interface MarketingLayoutProps {
  children: React.ReactNode;
}
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: `${siteConfig.title} - The new era of books`,
  description: siteConfig.description,
});

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
