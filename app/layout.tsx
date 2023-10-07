import type { Metadata } from "next";

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
