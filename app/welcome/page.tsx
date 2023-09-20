import Waitlist from "./waitlist";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Sign up for the waitlist",
  description: `Sign up for the waitlist and be the first to know when we launch "The 50 Greatest Business Success Stories"`,
});
const page = () => {
  return <Waitlist />;
};

export default page;
