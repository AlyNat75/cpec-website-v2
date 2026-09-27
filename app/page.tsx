import type { Metadata } from "next";
import HomePage from "./_pagecomponents/HomePageClient";
export const metadata: Metadata = { title: "Home" };

export default function Page() {
  return <HomePage />;
}
