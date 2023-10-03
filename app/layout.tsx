import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import { StorageProvider } from "@/context/storage";
import { Toaster } from "@/app/(client)/components/ui/toaster";
// const inter = Inter({ subsets: ["latin"] });
import { CartProvider } from "@/context/cart";
import CartPreview from "@/app/(client)/components/cart-preview";

export const metadata: Metadata = {
  title: "Short Form books",
  description: "this is a short form book site",
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
