import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { StorageProvider } from "@/context/storage";
import { Toaster } from "@/app/(client)/components/ui/toaster";
// const inter = Inter({ subsets: ["latin"] });
import { CartProvider } from "@/context/cart";
import CartPreview from "@/app/(client)/components/cart-preview";

export const metadata: Metadata = {
  title: "Admin Portal",
  description: "This is for use by admin only ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <main>{children}</main>
      </body>
    </html>
  );
}
