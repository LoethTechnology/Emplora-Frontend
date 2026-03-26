// Importing the necessary modules 
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Emplora",
  description: "An open-source platform for reviewing and rating employers in Nigeria."
};

// Exporting the root layout 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
