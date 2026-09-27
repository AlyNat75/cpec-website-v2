import type { Metadata } from "next";
import HomePage from "./_pagecomponents/HomePageClient";
// The layout's title template doesn't apply to its own page, so spell it out
export const metadata: Metadata = { title: { absolute: "Cornell Private Equity Club: Home" } };

export default function Page() {
  return <HomePage />;
}
