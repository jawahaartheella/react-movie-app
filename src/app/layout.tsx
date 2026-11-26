import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// configure the font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});

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
      <body className="{dmSans.className}">{children}</body>
    </html>
  );
}
