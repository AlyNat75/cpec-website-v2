import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Garamond for everything: headings and body text
const garamond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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
      <body className={`${garamond.variable} antialiased`}>
        {children}
        <Analytics /> 
      </body>
    </html>
  );
}
