import { marketingConfig } from "@/config/marketing";
import { LinkButton } from "@/components/ui/link";
import Nav from "@/components/nav/main-nav";
import { SiteFooter } from "@/components/site-footer";
import MobileNav from "@/components/nav/mobile-nav";
import { siteConfig } from "@/config/site";
interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return <>{children}</>;
}
