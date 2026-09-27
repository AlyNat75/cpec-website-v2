import type { Metadata } from "next";
import { Libre_Caslon_Text, Cabin } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Headings: free Caslon (CIBC uses Adobe Caslon Pro); body: Cabin, same as CIBC
const caslon = Libre_Caslon_Text({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const cabin = Cabin({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Cornell Private Equity Club: Home",
    template: "Cornell Private Equity Club: %s",
  },
  description:
    "Cornell University's only undergraduate organization devoted exclusively to private equity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${caslon.variable} ${cabin.variable} antialiased`}>
        {children}
        <Analytics /> 
      </body>
    </html>
  );
}
