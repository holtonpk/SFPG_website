import Waitlist from "./waitlist";
import { constructMetadata } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export const metadata = constructMetadata({
  title: siteConfig.pages.welcome.title,
  description: siteConfig.pages.welcome.description,
});

const page = () => {
  return <Waitlist />;
};

export default page;
