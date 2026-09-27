import type { Metadata } from "next";
import { Libre_Caslon_Text, EB_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

// Headings: free Caslon (CIBC uses Adobe Caslon Pro); body text: Garamond
const caslon = Libre_Caslon_Text({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const garamond = EB_Garamond({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
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
      <body className={`${caslon.variable} ${garamond.variable} antialiased`}>
        {children}
        <Analytics /> 
      </body>
    </html>
  );
}
