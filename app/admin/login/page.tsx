import { Metadata } from "next";
import UserAuthForm from "@/app/admin/login/components/user-auth-form";
import { siteConfig } from "@/config/site";
import { Icons } from "@/app/(client)/components/icons";
import "../style.css";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account.",
};

export default function AuthenticationPage() {
  return (
    <>
      <div className="container bg-background relative hidden h-[800px] flex-col items-center  md:grid lg:max-w-none 2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center"></div>
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
