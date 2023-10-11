import { marketingConfig } from "@/config/marketing";
import { LinkButton } from "@/app/(client)/components/ui/link";
import Nav from "@/app/(client)/components/nav/main-nav";
import { SiteFooter } from "@/app/(client)/components/site-footer";
import MobileNav from "@/app/(client)/components/nav/mobile-nav";
import { siteConfig } from "@/config/site";
interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return <>{children}</>;
}
