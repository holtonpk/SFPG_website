"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/admin/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "@/app/admin/components/ui/use-toast";
import { Input } from "@/app/admin/components/ui/input";
import * as z from "zod";
import { useAuth } from "@/app/admin/context/user-auth";
import PasswordInput from "@/app/admin/login/components/password-input";
import { Icons } from "@/app/admin/components/icons";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false);

  const Router = useRouter();

  const { signIn, logInWithGoogle } = useAuth()!;

  const userAuthSchema = z.object({
    password: z.string(),
  });

  type FormData = z.infer<typeof userAuthSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    const signInResult =
      data.password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    if (signInResult) {
      setAdminPass(true);
    } else {
      setError("password", {
        type: "manual",
        message: "Incorrect password.",
      });
      setAdminPass(false);
    }
    setIsLoading(false);
  }

  function handleLoginError(error: any): void {
    console.log("error", error.message);
    toast({
      title: "Something went wrong.",
      description: `Please try again later. Error: ${error.message || error}`,
      variant: "destructive",
    });
  }

  async function googleSingIn(): Promise<void> {
    try {
      setIsGoogleLoading(true);
      const createAccountResult = await logInWithGoogle();

      if (createAccountResult.error) {
        handleLoginError(createAccountResult.error);
      }
    } catch (error: any) {
      handleLoginError(error);
    } finally {
      setIsGoogleLoading(false);
    }
  }

  const [adminPass, setAdminPass] = React.useState<boolean>(false);

  return (
    <>
      {!adminPass ? (
        <div className="grid gap-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <h1 className="text-center">Admin Portal</h1>

              <PasswordInput
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                disabled={isLoading || isGoogleLoading}
                {...register("password")}
              />
              {errors?.password && (
                <p className="px-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
              <Button
                className="w-full"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Enter
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="grid gap-2">
            <h1 className="text-center">Welcome to the admin portal</h1>

            <Button
              onClick={googleSingIn}
              type="button"
              className="w-full"
              variant="outline"
            >
              {isGoogleLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className=" h-6 w-6 mr-2" />
              )}
              Signing in with Google
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
