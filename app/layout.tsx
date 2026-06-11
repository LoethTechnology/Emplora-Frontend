// Importing the necessary modules
import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { HydrationGuard } from "@/components/providers/hydration-guard";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Emplora",
  description:
    "An open-source platform for reviewing and rating employers in Nigeria.",
};

// Exporting the root layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={cn("font-sans", geist.variable)}>
      <body>
        <HydrationGuard>{children}</HydrationGuard>
      </body>
    </html>
  );
}
