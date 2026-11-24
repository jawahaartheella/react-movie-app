import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Movie App",
  description: "Find and explore thousands of movies",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
