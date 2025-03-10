import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme Co CMS",
  description: "A simple content management system for Acme Co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
